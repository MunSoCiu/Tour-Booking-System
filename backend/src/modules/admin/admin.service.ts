import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../users/user.entity";
import { Tour } from "../tours/tour.entity";
import { Order } from "../orders/order.entity";

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Tour) private tourRepo: Repository<Tour>,
    @InjectRepository(Order) private orderRepo: Repository<Order>
  ) {}

  /* ============================
       1. Tổng quan thống kê
  ============================ */
  async getStats() {
    const totalUsers = await this.userRepo.count();
    const totalTours = await this.tourRepo.count();
    const totalOrders = await this.orderRepo.count();

    // Tổng doanh thu (sum total)
    const revenue = await this.orderRepo
      .createQueryBuilder("o")
      .select("SUM(o.total)", "sum")
      .where("o.status = :s", { s: "success" })
      .getRawOne();

    const totalRevenue = Number(revenue.sum || 0);

    return {
      totalUsers,
      totalTours,
      totalOrders,
      totalRevenue,
    };
  }

  /* ============================
       2. Top Tours (tour bán chạy)
  ============================ */
  async getTopTours() {
    const orders = await this.orderRepo.find();

    const map = new Map<string, { title: string; sold: number }>();

    for (const order of orders) {
      for (const item of order.items) {
        const tour = await this.tourRepo.findOne({
          where: { id: item.tourId },
          select: { id: true, title: true },
        });

        if (!tour) continue;

        if (!map.has(tour.id)) {
          map.set(tour.id, { title: tour.title, sold: item.qty });
        } else {
          map.get(tour.id).sold += item.qty;
        }
      }
    }

    // Convert to array + sort
    return Array.from(map.values())
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 5); // lấy top 5
  }

  /* ============================
       3. Revenue Chart (12 tháng)
  ============================ */
  async getRevenueChart() {
    const months = [];
    const revenues = [];

    for (let i = 1; i <= 12; i++) {
      const data = await this.orderRepo
        .createQueryBuilder("o")
        .select("SUM(o.total)", "sum")
        .where("MONTH(o.createdAt) = :m", { m: i })
        .andWhere("o.status = :s", { s: "success" })
        .getRawOne();

      months.push(`Th ${i}`);
      revenues.push(Number(data.sum || 0));
    }

    return { months, revenues };
  }
}
