import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "./order.entity";

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(Order) private repo: Repository<Order>) {}

  /* ==========================
        USER CREATE ORDER
  ========================== */
  async create(userId: string, items: any[]) {
    const total = items.reduce((s, it) => s + it.price * it.qty, 0);
    const code = `ORD-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

    const order = this.repo.create({
      code,
      userId,
      items,
      total,
      status: "pending",
    });

    return this.repo.save(order);
  }

  /* ==========================
        USER ORDERS
  ========================== */
  findByUser(userId: string) {
    return this.repo.find({
      where: { userId },
      order: { createdAt: "DESC" },
    });
  }

  findOne(id: string, userId: string) {
    return this.repo.findOne({
      where: { id, userId },
    });
  }

  /* ==========================
        UPDATE STATUS
  ========================== */
  async updateStatus(id: string, status: "pending" | "success" | "cancelled") {
    const order = await this.repo.findOne({ where: { id } });
    if (!order) throw new NotFoundException("Order not found");

    order.status = status;
    return this.repo.save(order);
  }

  cancel(id: string) {
    return this.updateStatus(id, "cancelled");
  }

  /* ==========================
        ADMIN: GET ALL
  ========================== */
  async adminFindAll() {
    return this.repo.find({
      relations: ["user"],
      order: { createdAt: "DESC" },
    });
  }
}
