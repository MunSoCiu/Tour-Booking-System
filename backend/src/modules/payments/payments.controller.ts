import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  UseGuards,
  Req,
} from "@nestjs/common";
import { PaymentsService } from "./payments.service";
import { MomoService } from "./momo/momo.service";
import { VnpayService } from "./vnpay/vnpay.service";
import { CreateMomoPaymentDto } from "./dto/create-momo.dto";
import { CreateVnpayPaymentDto } from "./dto/create-vnpay.dto";
import { RequestWithUser } from "@/common/types/request-with-user";
import { JwtAuthGuard } from "../auth/jwt.guard";

@Controller("payments")
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly momoService: MomoService,
    private readonly vnpayService: VnpayService
  ) {}

  /* ================= PAYMENT METHODS ================= */

  @Get("methods")
  getPaymentMethods() {
    return [
      {
        key: "momo",
        name: "MoMo",
        desc: "Ví điện tử MoMo",
        logo: "/uploads/icons/Momo.jpg",
        enabled: true,
      },
      {
        key: "vnpay",
        name: "VNPay",
        desc: "Thanh toán qua VNPay",
        logo: "/uploads/icons/Vnpay.png",
        enabled: true,
      },
      {
        key: "bank:vcb",
        name: "Vietcombank",
        desc: "Ngân hàng Vietcombank",
        logo: "/uploads/icons/vcb.jpg",
        enabled: true,
      },
      {
        key: "bank:bidv",
        name: "BIDV",
        desc: "Ngân hàng BIDV",
        logo: "/uploads/icons/bidv.jpg",
        enabled: true,
      },
      {
        key: "bank:tcb",
        name: "Techcombank",
        desc: "Ngân hàng Techcombank",
        logo: "/uploads/icons/tcb.jpg",
        enabled: true,
      },
    ];
  }

  /* ================= USER ================= */

  @UseGuards(JwtAuthGuard)
  @Get("my")
  getMyPayments(
    @Req() req: RequestWithUser,
    @Query("status") status?: string,
    @Query("search") search?: string,
    @Query("page") page = 1,
    @Query("limit") limit = 10
  ) {
    return this.paymentsService.findMyPayments(req.user.sub, {
      status,
      search,
      page,
      limit,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get("accounts")
  getMyAccounts(@Req() req: RequestWithUser) {
    return this.paymentsService.getMyAccounts(req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Post("pay")
  payOrder(
    @Req() req: RequestWithUser,
    @Body() body: { orderId: string; method: string }
  ) {
    return this.paymentsService.payOrder(
      req.user.sub,
      body.orderId,
      body.method
    );
  }

  /* ================= MOMO ================= */

  @UseGuards(JwtAuthGuard)
  @Post("momo")
  async createMomo(
    @Req() req: RequestWithUser,
    @Body() dto: CreateMomoPaymentDto
  ) {
    await this.paymentsService.create({
      orderId: dto.orderId,
      userId: req.user.sub,
      amount: dto.amount,
      method: "momo",
      status: "pending",
    });

    return this.momoService.createPayment(dto);
  }

  @Post("momo/callback")
  async momoCallback(@Body() body: any) {
    if (body.resultCode === 0) {
      await this.paymentsService.markPaid(body.orderId, "momo");
    }
    return { received: true };
  }

  /* ================= VNPAY ================= */

  @UseGuards(JwtAuthGuard)
  @Post("vnpay")
  async createVnpay(
    @Req() req: RequestWithUser,
    @Body() dto: CreateVnpayPaymentDto
  ) {
    await this.paymentsService.create({
      orderId: dto.orderId,
      userId: req.user.sub,
      amount: dto.amount,
      method: "vnpay",
      status: "pending",
    });

    return {
      url: this.vnpayService.createPaymentUrl(dto),
    };
  }

  @Get("vnpay/return")
  async vnpReturn(@Query() query: any) {
    if (query.vnp_ResponseCode === "00") {
      await this.paymentsService.markPaid(query.vnp_TxnRef, "vnpay");
    }
    return { success: true };
  }

  /* ================= ADMIN ================= */

  @UseGuards(JwtAuthGuard)
  @Get("admin")
  getAllPayments(
    @Query("status") status?: string,
    @Query("search") search?: string,
    @Query("page") page = 1,
    @Query("limit") limit = 10
  ) {
    return this.paymentsService.adminFindAll({
      status,
      search,
      page,
      limit,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get("admin/revenue")
  adminRevenue() {
    return this.paymentsService.adminRevenue();
  }

  @UseGuards(JwtAuthGuard)
  @Post("mock-pay")
  payMock(
    @Req() req: RequestWithUser,
    @Body() body: { orderId: string; provider: string }
  ) {
    return this.paymentsService.payByMockAccount(
      req.user.sub,
      body.orderId,
      body.provider
    );
  }
}
