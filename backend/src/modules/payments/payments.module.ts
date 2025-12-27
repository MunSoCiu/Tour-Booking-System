import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Payment } from "./payment.entity";
import { PaymentsService } from "./payments.service";
import { PaymentsController } from "./payments.controller";
import { MomoService } from "./momo/momo.service";
import { VnpayService } from "./vnpay/vnpay.service";
import { Order } from "../orders/order.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Order])],
  controllers: [PaymentsController],
  providers: [PaymentsService, MomoService, VnpayService],
})
export class PaymentsModule {}
