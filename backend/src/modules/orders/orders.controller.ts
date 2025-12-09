import { Controller, Post, Body, Get, Param, Put } from "@nestjs/common";
import { OrdersService } from "./orders.service";

@Controller("orders")
export class OrdersController {
  constructor(private svc: OrdersService) {}

  @Post()
  create(@Body() body: { userId: string; items: any[] }) {
    return this.svc.create(body.userId, body.items);
  }

  @Get("user/:userId")
  userOrders(@Param("userId") userId: string) {
    return this.svc.findByUser(userId);
  }

  @Get(":id")
  getOne(@Param("id") id: string) {
    return this.svc.findOne(id);
  }

  @Put(":id/status")
  updateStatus(@Param("id") id: string, @Body() body: { status: string }) {
    return this.svc.updateStatus(id, body.status);
  }

  @Put(":id/cancel")
  cancel(@Param("id") id: string) {
    return this.svc.cancel(id);
  }
}
