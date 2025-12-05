import "reflect-metadata";
import { DataSource } from "typeorm";
import ormconfig from "./ormconfig";
import { User } from "./modules/users/user.entity";
import { Tour } from "./modules/tours/tour.entity";
import { Testimonial } from "./modules/testimonials/testimonial.entity";
import { Payment } from "./modules/payments/payment.entity";
import { Order } from "./modules/orders/order.entity";
import * as bcrypt from "bcrypt";

async function run() {
  const ds = new DataSource(ormconfig as any);
  await ds.initialize();

  const userRepo = ds.getRepository(User);
  const tourRepo = ds.getRepository(Tour);
  const testRepo = ds.getRepository(Testimonial);
  const payRepo = ds.getRepository(Payment);

  await payRepo.delete({});
  await testRepo.delete({});
  await tourRepo.delete({});
  await userRepo.delete({});

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

  const t1 = tourRepo.create({
    title: "Tour Khám Phá Châu Á 5N4Đ",
    slug: "asia-5n4d",
    description: "...",
    location: "Asia",
    price: 4000000,
    duration: "5N4Đ",
    image: "/images/asia-tour.jpg",
  });
  const t2 = tourRepo.create({
    title: "Tour Châu Âu 7N",
    slug: "europe-7n",
    description: "...",
    location: "Europe",
    price: 12990000,
    duration: "7N",
    image: "/images/europe-tour.jpg",
  });
  await tourRepo.save([t1, t2]);

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
    text: "Dịch vụ ổn!",
    tourName: t2.title,
  });
  await testRepo.save([test1, test2]);

  const p1 = payRepo.create({
    orderId: "ORD-1",
    userId: user.id,
    amount: 4000000,
    method: "card",
    status: "success",
  });
  await payRepo.save(p1);

  console.log("Seed done");
  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
