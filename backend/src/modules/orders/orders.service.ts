import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "./order.entity";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(Order) private repo: Repository<Order>) {}

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

  findByUser(userId: string) {
    return this.repo.findBy({ userId });
  }

  findOne(id: string) {
    return this.repo.findOneBy({ id });
  }

  async updateStatus(id: string, status: "pending" | "success" | "cancelled") {
    await this.repo.update(id, { status });
    return this.findOne(id);
  }

  cancel(id: string) {
    return this.updateStatus(id, "cancelled");
  }

  async adminFindAll() {
    return this.repo.find({
      order: { createdAt: "DESC" },
      relations: ["user"],
    });
  }
}
