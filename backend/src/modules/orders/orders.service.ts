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

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(CartItem) private cartRepo: Repository<CartItem>,
    @InjectRepository(Tour) private tourRepo: Repository<Tour>
  ) {}

  /* ==========================
        USER CREATE ORDER
  ========================== */

  async createFromCart(userId: string) {
    const cartItems = await this.cartRepo.find({
      where: { userId, selected: true },
    });

    if (cartItems.length === 0) {
      throw new BadRequestException("Vui lòng chọn tour để thanh toán");
    }

    const items = [];
    let total = 0;

    for (const c of cartItems) {
      const tour = await this.tourRepo.findOne({ where: { id: c.tourId } });
      if (!tour) continue;

      const finalPrice = tour.discountPrice || tour.price;

      items.push({
        tourId: tour.id,
        tourTitle: tour.title,
        tourImage: tour.image,
        qty: c.qty,
        price: tour.price,
        discount: tour.discount,
        finalPrice,
      });

      total += finalPrice * c.qty;
    }

    if (items.length === 0 || total <= 0) {
      throw new BadRequestException(
        "Không thể tạo đơn hàng do tour không hợp lệ"
      );
    }

    const order = this.orderRepo.create({
      code: `ORD-${Date.now().toString().slice(-6)}`,
      userId,
      items,
      total,
      status: "pending",
    });

    const saved = await this.orderRepo.save(order);

    await this.cartRepo.delete(cartItems.map((i) => i.id));

    return saved;
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
      qb.andWhere("LOWER(o.code) LIKE :search", {
        search: `%${q.search.toLowerCase()}%`,
      });
    }

    qb.orderBy("o.createdAt", "DESC");

    return qb.getMany();
  }

  async findOne(id: string, userId: string) {
    const order = await this.orderRepo.findOne({
      where: { id, userId },
      relations: ["user"],
    });

    if (!order) throw new NotFoundException("Order not found");
    return order;
  }

  /* ==========================
        UPDATE STATUS
  ========================== */
  async updateStatus(id: string, status: "pending" | "success" | "cancelled") {
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
      throw new BadRequestException("Order must be cancelled to retry payment");
    }

    order.status = "pending";
    return this.orderRepo.save(order);
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
    return this.orderRepo.find({
      relations: ["user"],
      order: { createdAt: "DESC" },
    });
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
    } as Partial<Order>);

    return this.orderRepo.save(order);
  }
}
