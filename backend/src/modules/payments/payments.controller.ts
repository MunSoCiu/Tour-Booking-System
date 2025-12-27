import {
  Controller,
  Post,
  Body,
  Get,
  Param,
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
    private paymentsService: PaymentsService,
    private momoService: MomoService,
    private vnpayService: VnpayService
  ) {}

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

  @Get("methods")
  getPaymentMethods() {
    return [
      {
        key: "momo",
        name: "MoMo",
        desc: "Ví điện tử MoMo",
        logo: "/images/payments/momo.png",
        enabled: true,
      },
      {
        key: "vnpay",
        name: "VNPay",
        desc: "Thanh toán qua VNPay",
        logo: "/images/payments/vnpay.png",
        enabled: true,
      },
      {
        key: "card",
        name: "Thẻ ngân hàng",
        desc: "Visa / MasterCard / ATM",
        logo: "/images/payments/card.png",
        enabled: true,
      },
    ];
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

    const url = this.vnpayService.createPaymentUrl(dto);
    return { url };
  }

  @Get("vnpay/return")
  async vnpReturn(@Query() query: any) {
    if (query.vnp_ResponseCode === "00") {
      await this.paymentsService.markPaid(query.vnp_TxnRef, "vnpay");
    }
    return { success: true };
  }

  /* ================= HISTORY ================= */

  @Get("user/:userId")
  history(@Param("userId") userId: string) {
    return this.paymentsService.findByUser(userId);
  }
}
