import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import ormconfig from "./ormconfig";
import { UsersModule } from "./modules/users/users.module";
import { AuthModule } from "./modules/auth/auth.module";
import { ToursModule } from "./modules/tours/tours.module";
import { CartModule } from "./modules/cart/cart.module";
import { OrdersModule } from "./modules/orders/orders.module";
import { PaymentsModule } from "./modules/payments/payments.module";
import { TestimonialsModule } from "./modules/testimonials/testimonials.module";
import { ContactModule } from "./modules/contact/contact.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    UsersModule,
    AuthModule,
    ToursModule,
    CartModule,
    OrdersModule,
    PaymentsModule,
    TestimonialsModule,
    ContactModule,
  ],
})
export class AppModule {}
