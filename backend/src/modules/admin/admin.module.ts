import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminController } from "./admin.controller";
import { AdminUsersController } from "./users/admin-users.controller";
import { AdminOrdersController } from "./orders/admin-orders.controller";
import { AdminToursController } from "./tours/admin-tours.controller";
import { AdminPaymentsController } from "./payments/admin-payments.controller";
import { AdminService } from "./admin.service";

import { User } from "../users/user.entity";
import { Tour } from "../tours/tour.entity";
import { Payments } from "../payments/payment.entity";
import { Order } from "../orders/order.entity";

import { UsersModule } from "../users/users.module";
import { OrdersModule } from "../orders/orders.module";
import { ToursModule } from "../tours/tours.module";
import { PaymentsModule } from "../payments/payments.module";
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Tour, Order, Payments]),
    UsersModule,
    OrdersModule,
    ToursModule,
    PaymentsModule,
  ],
  controllers: [
    AdminController,
    AdminUsersController,
    AdminOrdersController,
    AdminToursController,
    AdminPaymentsController,
  ],
  providers: [AdminService],
})
export class AdminModule {}
