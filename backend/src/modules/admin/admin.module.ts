import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/user.entity";
import { Tour } from "../tours/tour.entity";
import { Order } from "../orders/order.entity";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";

@Module({
  imports: [TypeOrmModule.forFeature([User, Tour, Order])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
