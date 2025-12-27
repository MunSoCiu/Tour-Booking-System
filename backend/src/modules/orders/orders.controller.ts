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
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderStatusDto } from "./dto/update-order-status.dto";

@Controller("orders")
export class OrdersController {
  constructor(private svc: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req: RequestWithUser, @Body() dto: CreateOrderDto) {
    return this.svc.create(req.user.sub, dto.items);
  }

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

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  getOne(@Req() req: RequestWithUser, @Param("id") id: string) {
    return this.svc.findOne(id, req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id/status")
  updateStatus(@Param("id") id: string, @Body() dto: UpdateOrderStatusDto) {
    return this.svc.updateStatus(id, dto.status);
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id/cancel")
  cancel(@Param("id") id: string) {
    return this.svc.cancel(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  delete(@Req() req: RequestWithUser, @Param("id") id: string) {
    return this.svc.delete(id, req.user.sub);
  }
}
