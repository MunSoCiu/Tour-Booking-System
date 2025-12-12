import { Controller, Get, Param, Put, Body } from "@nestjs/common";
import { OrdersService } from "../orders/orders.service";
import { UsersService } from "../users/users.service";

@Controller("admin/orders")
export class AdminOrdersController {
  constructor(private orders: OrdersService, private users: UsersService) {}

  @Get()
  async getAll() {
    return this.orders.adminFindAll();
  }

  @Get(":id")
  async detail(@Param("id") id: string) {
    return this.orders.findOne(id);
  }

  @Put(":id/status")
  updateStatus(@Param("id") id: string, @Body() body: any) {
    return this.orders.updateStatus(id, body.status);
  }
}
