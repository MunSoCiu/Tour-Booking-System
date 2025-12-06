import { DataSourceOptions } from "typeorm";
import { User } from "./modules/users/user.entity";
import { Tour } from "./modules/tours/tour.entity";
import { CartItem } from "./modules/cart/cart.entity";
import { Order } from "./modules/orders/order.entity";
import { Testimonial } from "./modules/testimonials/testimonial.entity";
import { Payment } from "./modules/payments/payment.entity";

const config: DataSourceOptions = {
  type: "mysql",
  host: process.env.DB_HOST || "127.0.0.1",
  port: +(process.env.DB_PORT || 3306),
  username: process.env.DB_USER || "gotour",
  password: process.env.DB_PASS || "gotourpass",
  database: process.env.DB_NAME || "gotourdb",
  entities: [User, Tour, CartItem, Order, Testimonial, Payment],
  synchronize: true,
  logging: false,
};

export default config;
