import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CartItem } from "./cart.entity";
import { Tour } from "../tours/tour.entity";

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem) private cartRepo: Repository<CartItem>,
    @InjectRepository(Tour) private tourRepo: Repository<Tour>
  ) {}

  async add(payload: { userId: string; tourId: string; qty: number }) {
    const tour = await this.tourRepo.findOne({
      where: { id: payload.tourId },
    });
    if (!tour) throw new NotFoundException("Tour không tồn tại");

    const existing = await this.cartRepo.findOne({
      where: { userId: payload.userId, tourId: payload.tourId },
    });

    if (existing) {
      existing.qty += payload.qty;
      return this.cartRepo.save(existing);
    }

    return this.cartRepo.save(
      this.cartRepo.create({
        userId: payload.userId,
        tourId: payload.tourId,
        qty: payload.qty,
      })
    );
  }

  async findByUser(userId: string) {
    const items = await this.cartRepo.find({
      where: { userId },
      order: { createdAt: "DESC" },
    });

    const result = [];

    for (const item of items) {
      const tour = await this.tourRepo.findOne({
        where: { id: item.tourId },
      });

      if (!tour) continue;

      result.push({
        id: item.id,
        qty: item.qty,
        tour: {
          id: tour.id,
          title: tour.title,
          image: tour.image,
          price: tour.discountPrice || tour.price,
          discount: tour.discount,
        },
      });
    }

    return result;
  }

  async updateQty(id: string, qty: number, userId: string) {
    const item = await this.cartRepo.findOne({ where: { id, userId } });
    if (!item) throw new NotFoundException("Cart item not found");

    if (qty < 1) {
      throw new NotFoundException("Số lượng phải >= 1");
    }
    item.qty = qty;

    return this.cartRepo.save(item);
  }

  async remove(id: string, userId: string) {
    const item = await this.cartRepo.findOne({ where: { id, userId } });
    if (!item) throw new NotFoundException("Cart item not found");

    return this.cartRepo.remove(item);
  }

  async clearByUser(userId: string) {
    await this.cartRepo.delete({ userId });
  }
}
