import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./order.entity";
import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";
import { Tour } from "../tours/tour.entity";
import { CartItem } from "../cart/cart.entity";
import { Payments } from "@/modules/payments/payment.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Order, Tour, CartItem])],
  providers: [OrdersService],
  controllers: [OrdersController],
  exports: [OrdersService],
})
export class OrdersModule {}
