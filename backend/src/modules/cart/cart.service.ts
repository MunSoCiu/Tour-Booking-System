import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CartItem } from "./cart.entity";

@Injectable()
export class CartService {
  constructor(@InjectRepository(CartItem) private repo: Repository<CartItem>) {}

  add(item: Partial<CartItem>) {
    const c = this.repo.create(item);
    return this.repo.save(c);
  }

  findByUser(userId: string) {
    return this.repo.findBy({ userId });
  }

  updateQty(id: string, qty: number) {
    return this.repo.update(id, { qty });
  }

  remove(id: string) {
    return this.repo.delete(id);
  }

  clear(userId: string) {
    return this.repo.delete({ userId });
  }
}
