import { Controller, Get, Param, Put, Body } from "@nestjs/common";
import { OrdersService } from "@/modules/orders/orders.service";
import { UsersService } from "@/modules/users/users.service";
import { AdminService } from "../admin.service";

@Controller("admin/orders")
export class AdminOrdersController {
  constructor(
    private ordersService: OrdersService,
    private adminService: AdminService
  ) {}

  @Get()
  getAll() {
    return this.ordersService.adminFindAll();
  }

  @Get("stats")
  getStats() {
    return this.adminService.getOrderStats();
  }

  @Put(":id/status")
  updateStatus(
    @Param("id") id: string,
    @Body() body: { status: "pending" | "success" | "cancelled" }
  ) {
    return this.ordersService.updateStatus(id, body.status);
  }
}
