import * as dotenv from "dotenv";
dotenv.config();

import { DataSourceOptions } from "typeorm";
import { User } from "./modules/users/user.entity";
import { Tour } from "./modules/tours/tour.entity";
import { CartItem } from "./modules/cart/cart.entity";
import { Order } from "./modules/orders/order.entity";
import { Testimonial } from "./modules/testimonials/testimonial.entity";
import { Payments } from "./modules/payments/payment.entity";

const config: DataSourceOptions = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  entities: [User, Tour, CartItem, Order, Testimonial, Payments],
  synchronize: true,
  logging: false,
};

export default config;
