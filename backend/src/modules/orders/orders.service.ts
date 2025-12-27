import { Injectable, NotFoundException } from "@nestjs/common";
import { BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "./order.entity";
import { Tour } from "../tours/tour.entity";
import { CartItem } from "../cart/cart.entity";

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Tour) private tourRepo: Repository<Tour>,
    @InjectRepository(CartItem) private cartRepo: Repository<CartItem>
  ) {}

  /* ==========================
        CREATE ORDER
  ========================== */
  async create(userId: string, items: { tourId: string; qty: number }[]) {
    if (!items.length) throw new NotFoundException("Không có sản phẩm");

    const orderItems = [];
    let total = 0;

    for (const it of items) {
      if (it.qty < 1) {
        throw new NotFoundException("Số lượng không hợp lệ");
      }
      const tour = await this.tourRepo.findOne({
        where: { id: it.tourId },
      });
      if (!tour) throw new NotFoundException("Tour không tồn tại");

      const price = tour.price;
      const discount = tour.discount || 0;
      const finalPrice = tour.discountPrice || price;

      total += finalPrice * it.qty;

      orderItems.push({
        tourId: tour.id,
        tourTitle: tour.title,
        tourImage: tour.image,
        qty: it.qty,
        price,
        discount,
        finalPrice,
      });
    }

    const order = await this.orderRepo.save(
      this.orderRepo.create({
        code: `ORD-${Date.now()}`,
        userId,
        items: orderItems,
        total,
        status: "pending",
      })
    );

    // Xóa cart sau khi checkout
    await this.cartRepo.delete({ userId });

    return order;
  }

  /* ==========================
        USER ORDERS
  ========================== */
  async findByUser(
    userId: string,
    q?: { status?: string; search?: string; page?: number; limit?: number }
  ) {
    const page = Number(q?.page) || 1;
    const limit = Number(q?.limit) || 5;

    const qb = this.orderRepo.createQueryBuilder("order");
    qb.where("order.userId = :userId", { userId });

    if (q?.status) {
      qb.andWhere("order.status = :status", { status: q.status });
    }

    if (q?.search) {
      qb.andWhere(
        `(LOWER(order.code) LIKE :search 
          OR LOWER(JSON_EXTRACT(order.items, '$[0].tourTitle')) LIKE :search)`,
        { search: `%${q.search.toLowerCase()}%` }
      );
    }

    const [items, total] = await qb
      .orderBy("order.createdAt", "DESC")
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return { items, total, page, limit };
  }

  async updateStatus(id: string, status: "pending" | "success" | "cancelled") {
    const order = await this.orderRepo.findOne({ where: { id } });
    if (!order) throw new NotFoundException("Order not found");

    order.status = status;
    return this.orderRepo.save(order);
  }

  cancel(id: string) {
    return this.updateStatus(id, "cancelled");
  }

  async findOne(orderId: string, userId: string) {
    const order = await this.orderRepo.findOne({
      where: { id: orderId, userId },
    });

    if (!order) {
      throw new NotFoundException("Order not found");
    }

    return order;
  }

  async delete(id: string, userId: string) {
    const order = await this.orderRepo.findOne({ where: { id, userId } });
    if (!order) throw new NotFoundException();

    if (order.status !== "cancelled") {
      throw new BadRequestException("Chỉ được xóa đơn đã hủy");
    }

    await this.orderRepo.remove(order);

    return { message: "Order deleted successfully" };
  }

  /* ==========================
      ADMIN: GET ALL ORDERS
========================== */
  async adminFindAll(q?: {
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const page = Number(q?.page) || 1;
    const limit = Number(q?.limit) || 10;

    const qb = this.orderRepo
      .createQueryBuilder("order")
      .leftJoinAndSelect("order.user", "user");

    if (q?.status) {
      qb.andWhere("order.status = :status", { status: q.status });
    }

    if (q?.search) {
      qb.andWhere(
        `(order.code LIKE :search 
        OR user.fullName LIKE :search 
        OR JSON_EXTRACT(order.items, '$[0].tourTitle') LIKE :search)`,
        { search: `%${q.search}%` }
      );
    }

    const [items, total] = await qb
      .orderBy("order.createdAt", "DESC")
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      items,
      total,
      page,
      limit,
    };
  }
}
