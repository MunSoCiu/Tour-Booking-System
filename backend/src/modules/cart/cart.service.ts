import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CartItem } from "./cart.entity";

@Injectable()
export class CartService {
  constructor(@InjectRepository(CartItem) private repo: Repository<CartItem>) {}

  add(payload: Partial<CartItem>) {
    return this.repo.save(this.repo.create(payload));
  }

  findByUser(userId: string) {
    return this.repo.find({
      where: { userId },
      order: { createdAt: "DESC" },
    });
  }

  async updateQty(id: string, qty: number, userId: string) {
    const item = await this.repo.findOne({ where: { id, userId } });
    if (!item) throw new Error("Item not found");
    item.qty = qty;
    return this.repo.save(item);
  }

  async remove(id: string, userId: string) {
    const item = await this.repo.findOne({ where: { id, userId } });
    if (!item) throw new Error("Item not found");
    return this.repo.remove(item);
  }
}
