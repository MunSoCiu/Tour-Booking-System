import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartItem } from "./cart.entity";
import { CartService } from "./cart.service";
import { CartController } from "./cart.controller";
import { Tour } from "../tours/tour.entity";
import { Order } from "../orders/order.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CartItem, Tour, Order])],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
