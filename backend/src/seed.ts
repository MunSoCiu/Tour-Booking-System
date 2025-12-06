import "reflect-metadata";
import { DataSource } from "typeorm";
import ormconfig from "./ormconfig";

import { User } from "./modules/users/user.entity";
import { Tour } from "./modules/tours/tour.entity";
import { Testimonial } from "./modules/testimonials/testimonial.entity";
import { Payment } from "./modules/payments/payment.entity";
import { CartItem } from "./modules/cart/cart.entity";
import { Order } from "./modules/orders/order.entity";

import * as bcrypt from "bcrypt";

async function run() {
  const ds = new DataSource(ormconfig as any);
  await ds.initialize();

  const userRepo = ds.getRepository(User);
  const tourRepo = ds.getRepository(Tour);
  const testRepo = ds.getRepository(Testimonial);
  const payRepo = ds.getRepository(Payment);
  const cartRepo = ds.getRepository(CartItem);
  const orderRepo = ds.getRepository(Order);

  // CLEAR TABLES (use clear() instead of delete({}) to fix error)
  await payRepo.clear();
  await cartRepo.clear();
  await orderRepo.clear();
  await testRepo.clear();
  await tourRepo.clear();
  await userRepo.clear();

  // =============================
  // 1. SEED USERS
  // =============================
  const pwd = await bcrypt.hash("password123", 10);

  const admin = userRepo.create({
    email: "admin@gotour.test",
    password: pwd,
    fullName: "Admin",
    role: "admin",
  });

  const user = userRepo.create({
    email: "user@gotour.test",
    password: pwd,
    fullName: "Nguyen Van A",
    role: "user",
  });

  await userRepo.save([admin, user]);

  // =============================
  // 2. SEED TOURS
  // =============================
  const t1 = tourRepo.create({
    title: "Tour Khám Phá Châu Á 5N4Đ",
    slug: "asia-5n4d",
    description: "Trải nghiệm Châu Á với văn hóa và ẩm thực đặc sắc.",
    location: "Asia",
    price: 4000000,
    duration: "5N4Đ",
    image: "/images/asia-tour.jpg",
  });

  const t2 = tourRepo.create({
    title: "Tour Châu Âu 7N",
    slug: "europe-7n",
    description: "Khám phá Châu Âu xinh đẹp trong 7 ngày.",
    location: "Europe",
    price: 12990000,
    duration: "7N",
    image: "/images/europe-tour.jpg",
  });

  await tourRepo.save([t1, t2]);

  // =============================
  // 3. SEED TESTIMONIALS
  // =============================
  const test1 = testRepo.create({
    name: "An Nguyen",
    role: "Khách hàng",
    rating: 5,
    text: "Chuyến đi rất tuyệt!",
    tourName: t1.title,
  });

  const test2 = testRepo.create({
    name: "Binh Tran",
    role: "Khách hàng",
    rating: 4,
    text: "Dịch vụ tốt, đáng trải nghiệm!",
    tourName: t2.title,
  });

  await testRepo.save([test1, test2]);

  // =============================
  // 4. SEED CART ITEMS
  // =============================
  const cart1 = cartRepo.create({
    userId: user.id,
    tourId: t1.id,
    qty: 2,
  });

  const cart2 = cartRepo.create({
    userId: user.id,
    tourId: t2.id,
    qty: 1,
  });

  await cartRepo.save([cart1, cart2]);

  // =============================
  // 5. SEED ORDERS
  // =============================

  const order1 = orderRepo.create({
    code: "ORD-ABC123",
    userId: user.id,
    items: [
      { tourId: t1.id, qty: 2, price: t1.price },
      { tourId: t2.id, qty: 1, price: t2.price },
    ],
    total: t1.price * 2 + t2.price * 1,
    status: "success",
  });

  const order2 = orderRepo.create({
    code: "ORD-XYZ789",
    userId: user.id,
    items: [{ tourId: t2.id, qty: 1, price: t2.price }],
    total: t2.price * 1,
    status: "pending",
  });

  await orderRepo.save([order1, order2]);

  // =============================
  // 6. SEED PAYMENTS
  // =============================
  const payment1 = payRepo.create({
    orderId: order1.id,
    userId: user.id,
    amount: order1.total,
    method: "card",
    status: "success",
  });

  await payRepo.save(payment1);

  console.log(
    "🔥 Seed completed successfully with users, tours, testimonials, cart, orders, payments!"
  );
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
