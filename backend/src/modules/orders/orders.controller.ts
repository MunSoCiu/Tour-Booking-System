import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  UseGuards,
  Req,
} from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { RequestWithUser } from "@/common/types/request-with-user";

@Controller("orders")
export class OrdersController {
  constructor(private svc: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req: RequestWithUser, @Body("items") items: any[]) {
    return this.svc.create(req.user.sub, items);
  }

  @Get("my")
  @UseGuards(JwtAuthGuard)
  findMyOrders(@Req() req: RequestWithUser) {
    console.log("🔥 USER:", req.user);
    return this.svc.findByUser(req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  getOne(@Req() req: RequestWithUser, @Param("id") id: string) {
    return this.svc.findOne(id, req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id/status")
  updateStatus(@Param("id") id: string, @Body("status") status: string) {
    return this.svc.updateStatus(
      id,
      status as "pending" | "success" | "cancelled"
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id/cancel")
  cancel(@Param("id") id: string) {
    return this.svc.cancel(id);
  }
}
