import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  UseGuards,
  Req,
  Query,
  Delete,
} from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { RequestWithUser } from "@/common/types/request-with-user";
import { UpdateOrderStatusDto } from "./dto/update-order-status.dto";

@Controller("orders")
export class OrdersController {
  constructor(private readonly svc: OrdersService) {}

  /* ================= PUBLIC ================= */

  @Get("bookings/success")
  getBookingSuccess(@Query("code") code: string) {
    return this.svc.getBookingSuccess(code);
  }

  @Post("bookings/check")
  checkBooking(@Body() dto: { email: string; code: string }) {
    return this.svc.checkBooking(dto);
  }

  /* ================= CREATE ================= */

  @UseGuards(JwtAuthGuard)
  @Post("from-cart")
  createFromCart(
    @Req() req: RequestWithUser,
    @Body("cartItemIds") cartItemIds: string[]
  ) {
    return this.svc.createFromCart(req.user.sub, cartItemIds);
  }

  @UseGuards(JwtAuthGuard)
  @Post("direct")
  createDirectOrder(
    @Req() req: RequestWithUser,
    @Body() body: { tourId: string; qty: number; date?: string }
  ) {
    return this.svc.createDirect(req.user.sub, body);
  }

  /* ================= USER ORDERS ================= */

  @UseGuards(JwtAuthGuard)
  @Get("my")
  findMyOrders(
    @Req() req: RequestWithUser,
    @Query("status") status?: string,
    @Query("search") search?: string,
    @Query("page") page?: number,
    @Query("limit") limit?: number
  ) {
    return this.svc.findByUser(req.user.sub, {
      status,
      search,
      page,
      limit,
    });
  }

  /* ================= STATUS ================= */

  @UseGuards(JwtAuthGuard)
  @Put(":id/status")
  updateStatus(@Param("id") id: string, @Body() dto: UpdateOrderStatusDto) {
    return this.svc.updateStatus(id, dto.status);
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id/cancel")
  cancel(@Req() req: RequestWithUser, @Param("id") id: string) {
    return this.svc.cancel(id, req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  delete(@Req() req: RequestWithUser, @Param("id") id: string) {
    return this.svc.delete(id, req.user.sub);
  }

  /* ================= PAYMENT ================= */

  @UseGuards(JwtAuthGuard)
  @Post(":id/retry-payment")
  retryPayment(@Param("id") orderId: string, @Req() req: RequestWithUser) {
    return this.svc.retryPayment(orderId, req.user.sub);
  }

  @Get("code/:code")
  @UseGuards(JwtAuthGuard)
  getByCode(@Req() req: RequestWithUser, @Param("code") code: string) {
    return this.svc.findByCode(code, req.user.sub);
  }
}
