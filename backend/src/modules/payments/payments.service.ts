import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Payment } from "./payment.entity";
<<<<<<< HEAD
import { Order } from "@/modules/orders/order.entity";

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepo: Repository<Payment>,

    @InjectRepository(Order)
    private orderRepo: Repository<Order>
  ) {}

  create(payload: Partial<Payment>) {
    const p = this.paymentRepo.create(payload);
    return this.paymentRepo.save(p);
  }

  findByUser(userId: string) {
    return this.paymentRepo.find({
      where: { userId },
      order: { createdAt: "DESC" },
    });
  }

  async markPaid(orderId: string, method: "momo" | "vnpay") {
    // update payment
    await this.paymentRepo.save(
      this.paymentRepo.create({
        orderId,
        method,
        status: "success",
      })
    );

    // update order
    await this.orderRepo.update({ id: orderId }, { status: "success" });
  }

  async findMyPayments(
    userId: string,
    q: {
      status?: string;
      search?: string;
      page?: number;
      limit?: number;
    }
  ) {
    const page = Number(q.page) || 1;
    const limit = Number(q.limit) || 10;

    const qb = this.paymentRepo
      .createQueryBuilder("payment")
      .leftJoinAndSelect("payment.user", "user")
      .leftJoinAndSelect("payment.order", "order")
      .where("payment.userId = :userId", { userId });

    // ===== FILTER STATUS =====
    if (q.status && q.status !== "all") {
      qb.andWhere("payment.status = :status", { status: q.status });
    }

    // ===== SEARCH (KHÔNG PHÂN BIỆT HOA THƯỜNG) =====
    if (q.search) {
      qb.andWhere(
        `
      LOWER(payment.orderId) LIKE :search
      OR LOWER(payment.method) LIKE :search
      OR LOWER(JSON_UNQUOTE(JSON_EXTRACT(order.items, '$[0].tourTitle'))) LIKE :search
      `,
        { search: `%${q.search.toLowerCase()}%` }
      );
    }

    const [items, total] = await qb
      .orderBy("payment.createdAt", "DESC")
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

  async adminFindAll(q: {
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const page = Number(q.page) || 1;
    const limit = Number(q.limit) || 10;

    const qb = this.paymentRepo
      .createQueryBuilder("payment")
      .leftJoinAndSelect("payment.user", "user")
      .leftJoinAndSelect("payment.order", "order");

    if (q.status && q.status !== "all") {
      qb.andWhere("payment.status = :status", { status: q.status });
    }

    if (q.search) {
      qb.andWhere(
        `
      payment.orderId LIKE :search
      OR user.fullName LIKE :search
      OR payment.method LIKE :search
      `,
        { search: `%${q.search}%` }
      );
    }

    const [items, total] = await qb
      .orderBy("payment.createdAt", "DESC")
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return { items, total, page, limit };
  }

  async findAdminPayments(q: {
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const page = Number(q.page) || 1;
    const limit = Number(q.limit) || 10;

    const qb = this.paymentRepo
      .createQueryBuilder("payment")
      .leftJoinAndSelect("payment.user", "user")
      .leftJoinAndSelect("payment.order", "order");

    if (q.status && q.status !== "all") {
      qb.andWhere("payment.status = :status", { status: q.status });
    }

    if (q.search) {
      qb.andWhere(
        `
      LOWER(payment.id) LIKE :search
      OR LOWER(user.fullName) LIKE :search
      OR LOWER(JSON_UNQUOTE(JSON_EXTRACT(order.items, '$[0].tourTitle'))) LIKE :search
      `,
        { search: `%${q.search.toLowerCase()}%` }
      );
    }

    const [items, total] = await qb
      .orderBy("payment.createdAt", "DESC")
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return { items, total, page, limit };
=======

@Injectable()
export class PaymentsService {
  constructor(@InjectRepository(Payment) private repo: Repository<Payment>) {}

  create(payload: Partial<Payment>) {
    const p = this.repo.create(payload);
    return this.repo.save(p);
  }

  findByUser(userId: string) {
    return this.repo.findBy({ userId });
  }

  updateStatus(id: string, status: string) {
    return this.repo.update(id, { status });
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
  }
}
