import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "./order.entity";
import { CartItem } from "../cart/cart.entity";
import { Tour } from "../tours/tour.entity";
import { Payments } from "../payments/payment.entity";
import { NotificationsService } from "../notifications/notifications.service";
import { In } from "typeorm";

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(CartItem) private cartRepo: Repository<CartItem>,
    @InjectRepository(Tour) private tourRepo: Repository<Tour>,
    @InjectRepository(Payments) private paymentRepo: Repository<Payments>,
    private notificationsService: NotificationsService
  ) {}

  /* ==========================
        USER CREATE ORDER
  ========================== */

  async createFromCart(userId: string, cartItemIds: string[]) {
    if (!cartItemIds?.length) {
      throw new BadRequestException("Vui lòng chọn tour để thanh toán");
    }

    const cartItems = await this.cartRepo.find({
      where: { id: In(cartItemIds), userId },
    });

    if (!cartItems.length) {
      throw new BadRequestException("Giỏ hàng trống");
    }

    const items = [];
    let total = 0;

    for (const c of cartItems) {
      const tour = await this.tourRepo.findOne({ where: { id: c.tourId } });
      if (!tour) continue;

      const finalPrice = tour.discountPrice ?? tour.price;

      items.push({
        tourId: tour.id,
        tourTitle: tour.title,
        tourImage: tour.image,
        qty: c.qty,
        price: tour.price,
        discount: tour.discount ?? 0,
        finalPrice,
        date: c.date ?? null,
      });

      total += finalPrice * c.qty;
    }

    /** ✅ FIX QUAN TRỌNG */
    if (items.length === 0) {
      throw new BadRequestException("Không thể tạo đơn hàng");
    }

    const order = await this.orderRepo.save(
      this.orderRepo.create({
        code: `ORD-${Date.now().toString().slice(-6)}`,
        userId,
        items,
        total,
        status: "pending",
      })
    );

    await this.cartRepo.delete(cartItemIds);

    return order;
  }

  /* ==========================
        USER ORDERS
  ========================== */
  async findByUser(
    userId: string,
    q?: {
      status?: string;
      search?: string;
      page?: number;
      limit?: number;
    }
  ) {
    const qb = this.orderRepo.createQueryBuilder("o");
    qb.where("o.userId = :userId", { userId });

    if (q?.status && q.status !== "all") {
      qb.andWhere("o.status = :status", { status: q.status });
    }

    if (q?.search) {
      const keyword = `%${q.search.toLowerCase()}%`;

      qb.andWhere(
        `
    LOWER(o.code) LIKE :kw
    OR JSON_SEARCH(
      LOWER(JSON_EXTRACT(o.items, '$[*].tourTitle')),
      'one',
      :kw
    ) IS NOT NULL
    `,
        { kw: keyword }
      );
    }

    qb.orderBy("o.createdAt", "DESC");

    return qb.getMany();
  }

  async findOne(id: string, userId: string) {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ["user"],
    });

    if (!order || order.userId !== userId)
      throw new NotFoundException("Order not found");
    return order;
  }

  /* ==========================
        UPDATE STATUS
  ========================== */
  async updateStatus(
    id: string,
    status: "pending" | "confirmed" | "cancelled"
  ) {
    const order = await this.orderRepo.findOne({ where: { id } });
    if (!order) throw new NotFoundException("Order not found");

    order.status = status;
    return this.orderRepo.save(order);
  }

  /* ==========================
        DELETE (ONLY CANCELLED)
  ========================== */
  async delete(id: string, userId: string) {
    const order = await this.orderRepo.findOne({ where: { id, userId } });
    if (!order) throw new NotFoundException("Order not found");

    if (order.status !== "cancelled") {
      throw new BadRequestException("Only cancelled order can be deleted");
    }

    await this.orderRepo.remove(order);
    return { message: "Order deleted" };
  }

  /* ==========================
        RETRY PAYMENT
  ========================== */
  async retryPayment(orderId: string, userId: string) {
    const order = await this.orderRepo.findOne({
      where: { id: orderId, userId },
    });

    if (!order) throw new NotFoundException("Order not found");

    if (order.status !== "cancelled") {
      throw new BadRequestException("Only cancelled order can retry payment");
    }

    order.status = "pending";
    await this.orderRepo.save(order);

    await this.paymentRepo.update({ orderId }, { status: "pending" });

    return order;
  }

  async cancel(id: string, userId: string) {
    const order = await this.orderRepo.findOne({ where: { id, userId } });
    if (!order) {
      throw new NotFoundException("Order not found");
    }

    if (order.status !== "pending") {
      throw new BadRequestException("Only pending order can be cancelled");
    }

    order.status = "cancelled";
    return this.orderRepo.save(order);
  }

  /* ==========================
        ADMIN: GET ALL
  ========================== */
  async adminFindAll() {
    const orders = await this.orderRepo
      .createQueryBuilder("order")
      .leftJoinAndSelect("order.user", "user")
      .leftJoinAndMapOne(
        "order.payment",
        Payments,
        "payment",
        "payment.orderId = order.id"
      )
      .orderBy("order.createdAt", "DESC")
      .getMany();

    return orders.map((o) => ({
      id: o.id,
      code: o.code,
      customer: o.user.fullName,
      email: o.user.email,
      total: o.total,
      status: o.status,
      createdAt: o.createdAt,
      items: o.items ?? [],
      paymentId: (o as any).payment?.id ?? null,
      paymentMethod: (o as any).payment?.method ?? null,
      paymentStatus: (o as any).payment?.status ?? "pending",
      paymentDate: (o as any).payment?.createdAt ?? null,
    }));
  }

  async createDirect(
    userId: string,
    payload: { tourId: string; qty: number; date?: string }
  ) {
    const tour = await this.tourRepo.findOne({
      where: { id: payload.tourId },
    });
    if (!tour) throw new NotFoundException("Tour không tồn tại");

    const finalPrice = tour.discountPrice || tour.price;
    const total = finalPrice * payload.qty;

    const order = this.orderRepo.create({
      code: `ORD-${Date.now().toString().slice(-6)}`,
      userId,
      items: [
        {
          tourId: tour.id,
          tourTitle: tour.title,
          tourImage: tour.image,
          qty: payload.qty,
          price: tour.price,
          discount: tour.discount,
          finalPrice,
          date: payload.date,
        },
      ],
      total,
      status: "pending",
    });

    const saved = await this.orderRepo.save(order);

    await this.notificationsService.create({
      userId,
      title: "Đặt tour thành công",
      message: `Đơn hàng ${saved.code} đã được tạo`,
      type: "booking",
      link: `/orders/${saved.id}`,
    });

    return saved;
  }

  /* ================= PUBLIC ================= */

  async getBookingSuccess(code: string) {
    const order = await this.orderRepo.findOne({
      where: { code },
      relations: ["user"],
    });

    if (!order) {
      throw new NotFoundException("Booking not found");
    }

    const payment = await this.paymentRepo.findOne({
      where: { orderId: order.id },
      order: { createdAt: "DESC" },
    });

    return {
      order,
      payment,
      status: {
        orderStatus: order.status,
        paymentStatus: payment?.status ?? "pending",
      },
    };
  }

  async checkBooking(payload: { email: string; code: string }) {
    const order = await this.orderRepo.findOne({
      where: { code: payload.code },
      relations: ["user"],
    });

    if (!order || order.user.email !== payload.email) {
      throw new NotFoundException("Booking not found");
    }

    const payment = await this.paymentRepo.findOne({
      where: { orderId: order.id },
      order: { createdAt: "DESC" },
    });

    return {
      order,
      payment,
      status: {
        orderStatus: order.status,
        paymentStatus: payment?.status ?? "pending",
      },
    };
  }

  async findByCode(code: string, userId: string) {
    const order = await this.orderRepo.findOne({
      where: { code, userId },
      relations: ["user"],
    });
    if (!order || order.userId !== userId) {
      throw new NotFoundException("Order not found");
    }
    return order;
  }
}
