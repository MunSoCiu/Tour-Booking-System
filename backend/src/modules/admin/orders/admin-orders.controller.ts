import { Controller, Get, Param, Put, Body } from "@nestjs/common";
import { OrdersService } from "@/modules/orders/orders.service";
import { UsersService } from "@/modules/users/users.service";

@Controller("admin/orders")
export class AdminOrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  getAll() {
    return this.ordersService.adminFindAll();
  }

  @Put(":id/status")
  updateStatus(
    @Param("id") id: string,
    @Body() body: { status: "pending" | "success" | "cancelled" }
  ) {
    return this.ordersService.updateStatus(id, body.status);
  }

  @Put(":id/cancel")
  cancel(@Param("id") id: string) {
    return this.ordersService.cancel(id);
  }
}
