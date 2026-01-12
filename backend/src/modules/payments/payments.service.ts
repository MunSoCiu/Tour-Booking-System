import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Payments } from "./payment.entity";
import { Order } from "@/modules/orders/order.entity";
import { NotificationsService } from "../notifications/notifications.service";
import { PaymentAccount } from "./payment-account.entity";

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payments)
    private paymentRepo: Repository<Payments>,

    @InjectRepository(Order)
    private orderRepo: Repository<Order>,

    private notificationsService: NotificationsService,

    @InjectRepository(PaymentAccount)
    private readonly accountRepo: Repository<PaymentAccount>
  ) {}

  create(payload: Partial<Payments>) {
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
    const payment = await this.paymentRepo.findOne({
      where: { orderId, method },
    });

    if (!payment) return;

    payment.status = "success";
    await this.paymentRepo.save(payment);

    const order = await this.orderRepo.findOne({
      where: { id: orderId },
    });

    if (order) {
      order.status = "confirmed";
      await this.orderRepo.save(order);

      await this.notificationsService.create({
        userId: payment.userId,
        title: "Thanh toán thành công",
        message: `Đơn ${order.code} đã được thanh toán`,
        type: "payment",
        link: `/bookings/success?code=${order.code}`,
      });
    }
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
  }

  async payByMockAccount(orderId: string, userId: string, provider: string) {
    const order = await this.orderRepo.findOne({
      where: { id: orderId, userId },
    });
    if (!order) throw new NotFoundException("Order not found");

    if (order.status === "confirmed") {
      throw new BadRequestException("Đơn hàng đã được thanh toán");
    }
    const account = await this.accountRepo.findOne({
      where: { userId, provider, isActive: true },
    });

    if (!account) {
      throw new NotFoundException("Bạn không có tài khoản thanh toán này");
    }

    if (+account.balance < +order.total) {
      throw new BadRequestException("Số dư không đủ");
    }

    account.balance = +account.balance - +order.total;
    await this.accountRepo.save(account);

    const payment = await this.paymentRepo.save(
      this.paymentRepo.create({
        orderId: order.id,
        userId,
        amount: order.total,
        method: provider,
        status: "success",
        code: `PAY-${Date.now().toString().slice(-6)}`,
        paidAt: new Date(),
      })
    );

    await this.paymentRepo.save(payment);

    order.status = "confirmed";
    await this.orderRepo.save(order);

    return { paymentId: payment.id, orderCode: order.code };
  }

  async getMyAccounts(userId: string) {
    return this.accountRepo.find({
      where: { userId, isActive: true },
      select: ["id", "provider", "accountNumber", "balance"],
    });
  }

  async payOrder(userId: string, orderId: string, method: string) {
    const order = await this.orderRepo.findOne({
      where: { code: orderId, userId },
    });

    if (!order) throw new BadRequestException("Order not found");

    if (order.status === "confirmed")
      throw new BadRequestException("Order already paid");

    const account = await this.accountRepo.findOne({
      where: { userId, provider: method },
    });

    if (!account) throw new BadRequestException("Payment account not found");

    if (+account.balance < +order.total)
      throw new BadRequestException("Insufficient balance");

    /** TRỪ TIỀN (MOCK) */
    account.balance = +account.balance - +order.total;
    await this.accountRepo.save(account);

    /** PAYMENT */
    const payment = await this.paymentRepo.save(
      this.paymentRepo.create({
        orderId: order.id,
        userId,
        amount: order.total,
        method,
        status: "success",
        code: `PAY-${Date.now().toString().slice(-6)}`,
        paidAt: new Date(),
      })
    );

    /** ORDER */
    order.status = "confirmed";
    await this.orderRepo.save(order);

    return {
      paymentId: payment.id,
      code: order.code,
    };
  }

  /* ================= ADMIN ================= */

  async adminRevenue() {
    const result = await this.paymentRepo
      .createQueryBuilder("p")
      .select("SUM(p.amount)", "total")
      .where("p.status = :s", { s: "success" })
      .getRawOne();

    return {
      totalRevenue: +result.total || 0,
    };
  }
}
