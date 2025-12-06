import * as dotenv from "dotenv";
dotenv.config();

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

// ==============================
// HELPERS
// ==============================
const randomItem = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const avatarUrls = Array.from(
  { length: 10 },
  (_, i) => `/avatars/${i + 1}.jpg`
);

const locations = [
  "Hà Nội",
  "Hạ Long",
  "Đà Nẵng",
  "Hội An",
  "Nha Trang",
  "Phú Quốc",
  "Đà Lạt",
  "Sài Gòn",
  "Singapore",
  "Bangkok",
  "Seoul",
  "Tokyo",
  "Bali",
];

const titleTemplates = [
  "Khám phá {location}",
  "Trải nghiệm văn hoá tại {location}",
  "Tour nghỉ dưỡng tại {location}",
  "Hành trình khám phá {location}",
  "Du lịch ẩm thực {location}",
  "Khám phá biển đảo {location}",
];

// ==============================
// CLEAN SLUG
// ==============================
const cleanSlug = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9\s-]/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");

// ==============================
async function run() {
  const ds = new DataSource(ormconfig as any);
  await ds.initialize();
  console.log("🌍 Connected to MySQL!");

  // CLEAR DATA
  await ds.createQueryBuilder().delete().from(Payment).execute();
  await ds.createQueryBuilder().delete().from(Order).execute();
  await ds.createQueryBuilder().delete().from(CartItem).execute();
  await ds.createQueryBuilder().delete().from(Testimonial).execute();
  await ds.createQueryBuilder().delete().from(Tour).execute();
  await ds.createQueryBuilder().delete().from(User).execute();
  console.log("🧹 Old data cleared!");

  // ============================
  // USERS
  // ============================
  const userRepo = ds.getRepository(User);
  const users = [];

  users.push(
    userRepo.create({
      email: "admin@gotour.test",
      password: await bcrypt.hash("admin123", 10),
      fullName: "Super Admin",
      role: "admin",
    })
  );

  for (let i = 1; i <= 20; i++) {
    users.push(
      userRepo.create({
        email: `user${i}@gotour.test`,
        password: await bcrypt.hash("password123", 10),
        fullName: `Người dùng ${i}`,
        role: "user",
      })
    );
  }

  const savedUsers = await userRepo.save(users);
  console.log(`👤 Users created: ${savedUsers.length}`);

  // ============================
  // TOURS — 50 TOURS
  // ============================
  const tourRepo = ds.getRepository(Tour);
  const tours: Tour[] = [];

  for (let i = 0; i < 50; i++) {
    const location = randomItem(locations);
    const template = randomItem(titleTemplates);

    // duration logic: days = 3-7, nights = days - 1
    const days = randomInt(2, 7);
    const nights = days - 1;
    const duration = `${days}N${nights}Đ`;

    const baseName = template.replace("{location}", location);

    const title = `${baseName} ${duration}`;
    const slug = cleanSlug(`${baseName}-${duration}-${i + 1}`);

    tours.push(
      tourRepo.create({
        title,
        slug,
        location,
        description: `${title} – Một hành trình tuyệt vời với trải nghiệm đáng nhớ, phù hợp cho mọi du khách.`,
        price: randomInt(3_000_000, 18_000_000),
        duration,
        image: `/images/tours/${randomInt(1, 50)}.jpg`,
      })
    );
  }

  const savedTours = await tourRepo.save(tours);
  console.log(`🗺️ Tours created: ${savedTours.length}`);

  // ============================
  // TESTIMONIALS — 150 REVIEWS
  // ============================
  const testRepo = ds.getRepository(Testimonial);
  const testimonials = [];

  for (let i = 0; i < 150; i++) {
    const user = randomItem(savedUsers);
    const tour = randomItem(savedTours);

    testimonials.push(
      testRepo.create({
        name: user.fullName,
        role: "Khách hàng",
        rating: randomInt(4, 5),
        text: "Một chuyến đi tuyệt vời, mọi thứ đều rất suôn sẻ!",
        avatar: randomItem(avatarUrls),
        tourName: tour.title,
      })
    );
  }

  await testRepo.save(testimonials);
  console.log("⭐ Testimonials created:", testimonials.length);

  // ============================
  // CART ITEMS
  // ============================
  const cartRepo = ds.getRepository(CartItem);
  const cartItems = [];

  savedUsers.forEach((u) => {
    cartItems.push(
      cartRepo.create({
        userId: u.id,
        tourId: randomItem(savedTours).id,
        qty: randomInt(1, 3),
      })
    );
  });

  await cartRepo.save(cartItems);

  // ============================
  // ORDERS + PAYMENTS
  // ============================
  const orderRepo = ds.getRepository(Order);
  const payRepo = ds.getRepository(Payment);

  const orders = [];
  for (let i = 0; i < 40; i++) {
    const user = randomItem(savedUsers);
    const tour = randomItem(savedTours);
    const qty = randomInt(1, 4);

    orders.push(
      orderRepo.create({
        code: `ORD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        userId: user.id,
        items: [{ tourId: tour.id, qty, price: tour.price }],
        total: qty * tour.price,
        status: randomItem(["success", "pending", "failed"]),
      })
    );
  }

  const savedOrders = await orderRepo.save(orders);

  const payments = savedOrders.map((o) =>
    payRepo.create({
      orderId: o.id,
      userId: o.userId,
      amount: o.total,
      method: randomItem(["card", "bank", "cash"]),
      status: o.status === "success" ? "success" : "failed",
    })
  );

  await payRepo.save(payments);

  console.log("🔥 SEED GENERATION COMPLETED!");
  process.exit(0);
}

run().catch((err) => {
  console.error("❌ SEED ERROR:", err);
  process.exit(1);
});
