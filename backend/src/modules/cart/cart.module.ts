import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartItem } from "./cart.entity";
import { CartService } from "./cart.service";
import { CartController } from "./cart.controller";

@Module({
  imports: [TypeOrmModule.forFeature([CartItem])],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
