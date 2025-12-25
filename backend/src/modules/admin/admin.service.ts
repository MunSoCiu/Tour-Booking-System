import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, In } from "typeorm";
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

  /* ========================================
        1. DASHBOARD — TỔNG QUAN
  ======================================== */
  async getStats() {
    const totalUsers = await this.userRepo.count();
    const totalTours = await this.tourRepo.count();
    const totalOrders = await this.orderRepo.count();

    const revenue = await this.orderRepo
      .createQueryBuilder("o")
      .select("SUM(o.total)", "sum")
      .where("o.status = :s", { s: "success" })
      .getRawOne();

    return {
      totalUsers,
      totalTours,
      totalOrders,
      totalRevenue: Number(revenue?.sum || 0),
    };
  }

  async getUserStats() {
    const total = await this.userRepo.count();
    const admins = await this.userRepo.count({ where: { role: "admin" } });
    const users = await this.userRepo.count({ where: { role: "user" } });

    const latest = await this.userRepo.find({
      order: { createdAt: "DESC" },
      take: 5,
      select: ["id", "fullName", "email", "role", "avatar", "createdAt"],
    });

    return {
      total,
      admins,
      users,
      latest,
    };
  }

  async getOrderStats() {
    const total = await this.orderRepo.count();
    const success = await this.orderRepo.count({
      where: { status: "success" },
    });
    const pending = await this.orderRepo.count({
      where: { status: "pending" },
    });

    const revenue = await this.orderRepo
      .createQueryBuilder("o")
      .select("SUM(o.total)", "sum")
      .where("o.status = :s", { s: "success" })
      .getRawOne();

    const latest = await this.orderRepo.find({
      order: { createdAt: "DESC" },
      take: 5,
      relations: ["user"],
    });

    return {
      total,
      success,
      pending,
      totalRevenue: Number(revenue?.sum || 0),
      latest,
    };
  }

  /* ========================================
        2. TOP SELLING TOURS — FIX 100%
  ======================================== */
  async getTopTours() {
    // Lấy order success
    const orders = await this.orderRepo.find({
      where: { status: "success" },
    });

    if (orders.length === 0) return [];

    // Map: { tourId → tổng qty }
    const soldMap = new Map<string, number>();

    for (const order of orders) {
      if (!Array.isArray(order.items)) continue;

      for (const item of order.items) {
        if (!item?.tourId) continue;

        const prev = soldMap.get(item.tourId) || 0;
        soldMap.set(item.tourId, prev + Number(item.qty || 0));
      }
    }

    const tourIds = Array.from(soldMap.keys());
    if (tourIds.length === 0) return [];

    // ⭐ FIX LỖI TYPEORM HERE ⭐
    // `In(tourIds)` yêu cầu mảng string → OK vì id của bạn là uuid string
    const tours = await this.tourRepo.find({
      where: { id: In(tourIds) },
      select: { id: true, title: true },
    });

    const merged = tours.map((t) => ({
      id: t.id,
      title: t.title,
      sold: soldMap.get(t.id) || 0,
    }));

    return merged.sort((a, b) => b.sold - a.sold).slice(0, 5);
  }

  /* ========================================
        3. REVENUE CHART — 12 THÁNG
  ======================================== */
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
      revenues.push(Number(data?.sum || 0));
    }

    return { months, revenues };
  }
}
