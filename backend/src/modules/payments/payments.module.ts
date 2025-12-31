import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
<<<<<<< HEAD
import { Payments } from "./payment.entity";
import { PaymentsService } from "./payments.service";
import { PaymentsController } from "./payments.controller";
import { MomoService } from "./momo/momo.service";
import { VnpayService } from "./vnpay/vnpay.service";
import { Order } from "../orders/order.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Payments, Order])],
  controllers: [PaymentsController],
  providers: [PaymentsService, MomoService, VnpayService],
=======
import { Payment } from "./payment.entity";
import { PaymentsService } from "./payments.service";
import { PaymentsController } from "./payments.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
  providers: [PaymentsService],
  controllers: [PaymentsController],
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
})
export class PaymentsModule {}
