import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartItem } from "./cart.entity";
import { CartService } from "./cart.service";
import { CartController } from "./cart.controller";
<<<<<<< HEAD
import { Tour } from "../tours/tour.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CartItem, Tour])],
  providers: [CartService],
  controllers: [CartController],
  exports: [CartService],
=======

@Module({
  imports: [TypeOrmModule.forFeature([CartItem])],
  providers: [CartService],
  controllers: [CartController],
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
})
export class CartModule {}
