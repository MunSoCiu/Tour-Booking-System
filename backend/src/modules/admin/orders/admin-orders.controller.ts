import { Controller, Get, Param, Put, Body } from "@nestjs/common";
import { OrdersService } from "@/modules/orders/orders.service";
import { UpdateOrderStatusDto } from "@/modules/orders/dto/update-order-status.dto";
import { AdminService } from "../admin.service";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "@/modules/auth/jwt.guard";

@Controller("admin/orders")
@UseGuards(JwtAuthGuard)
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
  updateStatus(@Param("id") id: string, @Body() dto: UpdateOrderStatusDto) {
    return this.ordersService.updateStatus(id, dto.status);
  }
}
