import * as dotenv from "dotenv";
dotenv.config();

import "reflect-metadata";
import { DataSource, In } from "typeorm";
import ormconfig from "./ormconfig";

import { User } from "./modules/users/user.entity";
import { Tour } from "./modules/tours/tour.entity";
import { Testimonial } from "./modules/testimonials/testimonial.entity";
import { CartItem } from "./modules/cart/cart.entity";
import { Order } from "./modules/orders/order.entity";
import { Payments } from "./modules/payments/payment.entity";
import * as bcrypt from "bcrypt";
import { PaymentAccount } from "./modules/payments/payment-account.entity";

/* ======================================================
   1. USERS (3 admin + 5 users)
====================================================== */
const USERS = [
  {
    email: "admin1@gotour.test",
    password: "admin123",
    fullName: "Ad1",
    images: "/avatars/1.jpg",
    role: "admin",
    phone: "0912345678",
    address: " TP.HCM",
    birthDate: "2000-10-20",
  },
  {
    email: "admin2@gotour.test",
    password: "admin123",
    fullName: "Ad2",
    images: "/avatars/2.jpg",
    role: "admin",
    phone: "0979704951",
    address: " Hà Nội",
    birthDate: "2004-06-29",
  },
  {
    email: "admin3@gotour.test",
    password: "admin123",
    fullName: "Ad3",
    images: "/avatars/3.jpg",
    role: "admin",
    phone: "0912345678",
    address: "Quận 1, TP.HCM",
    birthDate: "1999-05-20",
  },
  {
    email: "user1@gotour.test",
    password: "password123",
    fullName: "Nguyễn Văn A",
    images: "/avatars/3.jpg",
    role: "user",
    phone: "0912345678",
    address: "Quận 1, TP.HCM",
    birthDate: "1999-05-20",
  },
  {
    email: "user2@gotour.test",
    password: "password123",
    images: "/avatars/3.jpg",
    fullName: "Trần Thị B",
    role: "user",
    phone: "0912345678",
    address: "Quận 1, TP.HCM",
    birthDate: "1999-05-20",
  },
  {
    email: "user3@gotour.test",
    password: "password123",
    fullName: "Phạm Hoàng C",
    images: "/avatars/2.jpg",
    role: "user",
    phone: "0912345678",
    address: "Quận 1, TP.HCM",
    birthDate: "1999-05-20",
  },
  {
    email: "user4@gotour.test",
    password: "password123",
    fullName: "Lê Minh D",
    images: "/avatars/3.jpg",
    role: "user",
    phone: "0912345678",
    address: "Quận 1, TP.HCM",
    birthDate: "1999-05-20",
  },
  {
    email: "user5@gotour.test",
    password: "password123",
    fullName: "Võ Thu E",
    images: "/avatars/4.jpg",
    role: "user",
    phone: "0912345678",
    address: "Quận 1, TP.HCM",
    birthDate: "1999-05-20",
  },
];

/* ======================================================
   2. TOURS — 30 TOUR (15 VN + 15 INT)
====================================================== */
const TOURS = [
  {
    title: "Khám phá Hà Giang 4N3Đ",
    slug: "ha-giang-4n3d",
    location: "Hà Giang",
    duration: "4N3Đ",
    price: 4200000,
    description: "Khám phá cao nguyên đá Đồng Văn, đèo Mã Pì Lèng.",
    image: "/uploads/tours/1.jpg",
    itinerary: [
      {
        day: "Ngày 1",
        title: "Khởi hành - Hà Nội → Hà Giang",
        desc: "Tập trung tại Hà Nội, khởi hành sớm, dừng chân ăn trưa, đến Quản Bạ, nhận phòng và nghỉ ngơi.",
      },
      {
        day: "Ngày 2",
        title: "Đồng Văn - Lũng Cú",
        desc: "Thăm Mèo Vạc, Lũng Cú, check-in cột cờ Lũng Cú, thăm dinh vua Mèo.",
      },
      {
        day: "Ngày 3",
        title: "Mã Pì Lèng - Sông Nho Quế",
        desc: "Đi đèo Mã Pì Lèng, ngắm sông Nho Quế từ trên cao, tham quan chợ Đồng Văn.",
      },
      {
        day: "Ngày 4",
        title: "Trở về",
        desc: "Trở về Hà Nội, kết thúc hành trình.",
      },
    ],
  },

  {
    title: "Sapa Trekking 3N2Đ",
    slug: "sapa-trekking-3n2d",
    location: "Sapa",
    duration: "3N2Đ",
    price: 3200000,
    description: "Ruộng bậc thang và bản làng dân tộc.",
    image: "/uploads/tours/2.jpg",
    itinerary: [
      {
        day: "Ngày 1",
        title: "Khởi hành tới Sapa",
        desc: "Di chuyển tới Sapa, nhận phòng, dạo chợ đêm, ăn tối.",
      },
      {
        day: "Ngày 2",
        title: "Trekking bản Cát Cát",
        desc: "Trekking bản Cát Cát, thăm thác, ngắm ruộng bậc thang.",
      },
      {
        day: "Ngày 3",
        title: "Fansipan & về",
        desc: "Tham quan Fansipan (cáp treo) hoặc nghỉ tự do, trở về.",
      },
    ],
  },

  {
    title: "Vịnh Hạ Long Du thuyền 3N2Đ",
    slug: "vinh-ha-long-3n2d",
    location: "Hạ Long",
    duration: "3N2Đ",
    price: 4800000,
    description:
      "Du thuyền 4 sao, thăm hang Sửng Sốt, chèo kayak tại động Thiên Cung.",
    image: "/uploads/tours/3.jpg",
    itinerary: [
      {
        day: "Ngày 1",
        title: "Khởi hành - Hạ Long",
        desc: "Lên du thuyền, check-in cabin, ăn tối trên tàu.",
      },
      {
        day: "Ngày 2",
        title: "Thăm hang Sửng Sốt & kayaking",
        desc: "Thăm hang, chèo kayak, tắm biển tại bãi tắm nhỏ.",
      },
      {
        day: "Ngày 3",
        title: "Trả tàu - Về Hà Nội",
        desc: "Ăn sáng trên tàu, trả phòng, trở về Hà Nội.",
      },
    ],
  },

  {
    title: "Ninh Bình Kinh đô cổ 2N1Đ",
    slug: "ninh-binh-2n1d",
    location: "Ninh Bình",
    duration: "2N1Đ",
    price: 1800000,
    description: "Tham quan Tràng An, Bích Động và chùa Bái Đính trong ngày.",
    image: "/uploads/tours/4.jpg",
    itinerary: [
      {
        day: "Ngày 1",
        title: "Tràng An - Bích Động",
        desc: "Thuyền Tràng An, thăm Bích Động, ăn tối, nghỉ đêm.",
      },
      {
        day: "Ngày 2",
        title: "Bái Đính - Về",
        desc: "Thăm chùa Bái Đính, tham quan cố đô Hoa Lư, về Hà Nội.",
      },
    ],
  },

  {
    title: "Hành trình Huế Cố đô 3N2Đ",
    slug: "hue-co-do-3n2d",
    location: "Huế",
    duration: "3N2Đ",
    price: 2600000,
    description: "Thăm Đại Nội, lăng tẩm triều Nguyễn và đền đài cổ kính.",
    image: "/uploads/tours/5.jpg",
    itinerary: [
      {
        day: "Ngày 1",
        title: "Huế - Thành nội",
        desc: "Tham quan Đại Nội, cầu Trường Tiền, thưởng thức ẩm thực Huế.",
      },
      {
        day: "Ngày 2",
        title: "Lăng tẩm & sông Hương",
        desc: "Thăm Lăng Khải Định, Lăng Tự Đức, dạo sông Hương.",
      },
      {
        day: "Ngày 3",
        title: "Chợ Đông Ba - Về",
        desc: "Mua sắm đặc sản, khởi hành về.",
      },
    ],
  },

  {
    title: "Đà Nẵng - Hội An 4N3Đ",
    slug: "da-nang-hoi-an-4n3d",
    location: "Đà Nẵng",
    duration: "4N3Đ",
    price: 3500000,
    description: "Thăm Bà Nà Hills, phố cổ Hội An về đêm và tắm biển Mỹ Khê.",
    image: "/uploads/tours/6.jpg",
    itinerary: [
      {
        day: "Ngày 1",
        title: "Đà Nẵng - Nhận phòng",
        desc: "Check-in, tắm biển, tự do.",
      },
      {
        day: "Ngày 2",
        title: "Bà Nà Hills",
        desc: "Thăm khu giải trí, Cầu Vàng.",
      },
      {
        day: "Ngày 3",
        title: "Hội An - Phố cổ",
        desc: "Thăm phố cổ, đèn lồng, tham gia lớp làm đèn lồng.",
      },
      {
        day: "Ngày 4",
        title: "Trả phòng - Về",
        desc: "Tự do sáng, kết thúc tour.",
      },
    ],
  },

  {
    title: "Nha Trang Biển đảo 4N3Đ",
    slug: "nha-trang-4n3d",
    location: "Nha Trang",
    duration: "4N3Đ",
    price: 4400000,
    description: "Vinpearl, lặn biển Hòn Mun, thưởng thức hải sản tươi ngon.",
    image: "/uploads/tours/7.jpg",
    itinerary: [
      {
        day: "Ngày 1",
        title: "Đến Nha Trang",
        desc: "Nhận phòng, dạo biển Trần Phú.",
      },
      {
        day: "Ngày 2",
        title: "Vinpearl",
        desc: "Đi cáp treo, vào công viên nước.",
      },
      {
        day: "Ngày 3",
        title: "Lặn Hòn Mun",
        desc: "Lặn ngắm san hô, thăm đảo.",
      },
      { day: "Ngày 4", title: "Trả phòng", desc: "Mua sắm và trở về." },
    ],
  },

  {
    title: "Đà Lạt Lãng mạn 3N2Đ",
    slug: "da-lat-3n2d",
    location: "Đà Lạt",
    duration: "3N2Đ",
    price: 3100000,
    description:
      "Thăm hồ Tuyền Lâm, vườn hoa, đồi chè và thưởng thức café trứ danh.",
    image: "/uploads/tours/8.jpg",
    itinerary: [
      {
        day: "Ngày 1",
        title: "Đến Đà Lạt",
        desc: "Tham quan Hồ Xuân Hương, chợ đêm.",
      },
      {
        day: "Ngày 2",
        title: "Hồ Tuyền Lâm & Thung lũng Tình Yêu",
        desc: "Tham quan vườn hoa, cà phê.",
      },
      { day: "Ngày 3", title: "Chợ và về", desc: "Mua đặc sản, khởi hành về." },
    ],
  },

  {
    title: "Phú Quốc Nghỉ dưỡng 3N2Đ",
    slug: "phu-quoc-3n2d",
    location: "Phú Quốc",
    duration: "3N2Đ",
    price: 5200000,
    description: "Resort 5 sao, safari, lặn ngắm san hô và chợ đêm Dinh Cậu.",
    image: "/uploads/tours/9.jpg",
    itinerary: [
      { day: "Ngày 1", title: "Đến Phú Quốc", desc: "Nhận resort, tắm biển." },
      {
        day: "Ngày 2",
        title: "Safari & lặn",
        desc: "Tham quan Safari, lặn Hòn Thơm.",
      },
      {
        day: "Ngày 3",
        title: "Chợ Dinh Cậu - về",
        desc: "Mua sắm chợ đêm, về.",
      },
    ],
  },

  {
    title: "Quy Nhơn - Biển và ẩm thực 3N2Đ",
    slug: "quy-nhon-3n2d",
    location: "Quy Nhơn",
    duration: "3N2Đ",
    price: 3600000,
    description: "Eo Gió, Kỳ Co, trải nghiệm ẩm thực miền Trung đặc sắc.",
    image: "/uploads/tours/10.jpg",
    itinerary: [
      { day: "Ngày 1", title: "Đến Quy Nhơn", desc: "Check-in, dạo biển." },
      {
        day: "Ngày 2",
        title: "Kỳ Co - Eo Gió",
        desc: "Tham quan Kỳ Co, Eo Gió, ăn hải sản.",
      },
      {
        day: "Ngày 3",
        title: "Thưởng thức ẩm thực - về",
        desc: "Ăn sáng, mua đặc sản, khởi hành về.",
      },
    ],
  },

  {
    title: "Cần Thơ - Miền Tây 2N1Đ",
    slug: "can-tho-mien-tay-2n1d",
    location: "Cần Thơ",
    duration: "2N1Đ",
    price: 1700000,
    description: "Chợ nổi Cái Răng, miệt vườn và văn hoá sông nước.",
    image: "/uploads/tours/11.jpg",
    itinerary: [
      {
        day: "Ngày 1",
        title: "Chợ Nổi Cái Răng",
        desc: "Tham quan chợ nổi, ăn sáng trên thuyền, thăm vườn trái cây.",
      },
      {
        day: "Ngày 2",
        title: "Về",
        desc: "Tham quan các làng thủ công, kết thúc tour.",
      },
    ],
  },

  {
    title: "Hội An ẩm thực & văn hóa 3N2Đ",
    slug: "hoi-an-3n2d",
    location: "Hội An",
    duration: "3N2Đ",
    price: 2900000,
    description: "Dạo phố cổ, học nấu ăn truyền thống và tham quan làng gốm.",
    image: "/uploads/tours/31.jpg",
    itinerary: [
      {
        day: "Ngày 1",
        title: "Phố cổ Hội An",
        desc: "Dạo phố, thăm các cửa hàng đèn lồng.",
      },
      {
        day: "Ngày 2",
        title: "Làng gốm & lớp nấu ăn",
        desc: "Tham quan làng gốm, tham gia lớp học nấu ăn.",
      },
      { day: "Ngày 3", title: "Tự do - về", desc: "Mua quà, kết thúc." },
    ],
  },

  {
    title: "Saigon City Break 2N1Đ",
    slug: "saigon-city-break-2n1d",
    location: "Sài Gòn",
    duration: "2N1Đ",
    price: 1500000,
    description: "Khám phá ẩm thực đường phố, Bến Thành và Bitexco.",
    image: "/uploads/tours/13.jpg",
    itinerary: [
      {
        day: "Ngày 1",
        title: "City tour",
        desc: "Tham quan Bến Thành, phố đi bộ, ăn tối.",
      },
      {
        day: "Ngày 2",
        title: "Bitexco & về",
        desc: "Lên Bitexco ngắm Sài Gòn, kết thúc.",
      },
    ],
  },

  {
    title: "Mộc Châu Hoa & Trà 2N1Đ",
    slug: "moc-chau-2n1d",
    location: "Mộc Châu",
    duration: "2N1Đ",
    price: 1400000,
    description: "Đồi chè, vườn dâu và mùa hoa cải rực rỡ.",
    image: "/uploads/tours/14.jpg",
    itinerary: [
      {
        day: "Ngày 1",
        title: "Mộc Châu - Vườn dâu",
        desc: "Thăm đồi chè, vườn dâu, check-in cánh đồng hoa.",
      },
      {
        day: "Ngày 2",
        title: "Chợ địa phương - về",
        desc: "Mua đồ đặc sản, trở về.",
      },
    ],
  },

  {
    title: "Phan Thiết - Mũi Né 3N2Đ",
    slug: "phan-thiet-mui-ne-3n2d",
    location: "Phan Thiết",
    duration: "3N2Đ",
    price: 2800000,
    description: "Đồi cát bay, lướt ván, thưởng thức hải sản tươi sống.",
    image: "/uploads/tours/15.jpg",
    itinerary: [
      { day: "Ngày 1", title: "Đến Mũi Né", desc: "Nhận phòng, tự do biển." },
      {
        day: "Ngày 2",
        title: "Đồi cát & làng chài",
        desc: "Tham quan đồi cát bay, chụp hình hoàng hôn.",
      },
      { day: "Ngày 3", title: "Trả phòng - về", desc: "Ăn sáng, thu dọn, về." },
    ],
  },

  // INTERNATIONAL (16..30)
  {
    title: "Singapore Highlights 4N3Đ",
    slug: "singapore-4n3d",
    location: "Singapore",
    duration: "4N3Đ",
    price: 9200000,
    description: "Gardens by the Bay, Marina Bay Sands và Sentosa.",
    image: "/images/tours/16.jpg",
    itinerary: [
      {
        day: "Ngày 1",
        title: "Đến Singapore",
        desc: "Nhận phòng, dạo Marina Bay.",
      },
      {
        day: "Ngày 2",
        title: "Gardens by the Bay",
        desc: "Thăm Gardens, ArtScience Museum.",
      },
      {
        day: "Ngày 3",
        title: "Sentosa",
        desc: "Sentosa island: Universal, bãi biển.",
      },
      { day: "Ngày 4", title: "Mua sắm & về", desc: "Orchard Road, trở về." },
    ],
  },

  {
    title: "Bangkok & Pattaya 5N4Đ",
    slug: "bangkok-pattaya-5n4d",
    location: "Thailand",
    duration: "5N4Đ",
    price: 7400000,
    description: "Đền Wat Arun, chợ Chatuchak và Pattaya sôi động.",
    image: "/uploads/tours/17.jpg",
    itinerary: [
      { day: "Ngày 1", title: "Đến Bangkok", desc: "Check-in, dạo phố." },
      {
        day: "Ngày 2",
        title: "Đền và chợ",
        desc: "Wat Arun, Wat Pho, chợ Chatuchak.",
      },
      { day: "Ngày 3", title: "Pattaya", desc: "Di chuyển Pattaya, tắm biển." },
      {
        day: "Ngày 4",
        title: "Pattaya khám phá",
        desc: "Floating Market & Alcazar show.",
      },
      { day: "Ngày 5", title: "Về Bangkok", desc: "Trở về sân bay." },
    ],
  },

  {
    title: "Seoul City & DMZ 5N4Đ",
    slug: "seoul-dmz-5n4d",
    location: "Korea",
    duration: "5N4Đ",
    price: 13900000,
    description: "Khám phá Seoul hiện đại, DMZ và ẩm thực Hàn Quốc.",
    image: "/uploads/tours/18.jpg",
    itinerary: [
      { day: "Ngày 1", title: "Đến Seoul", desc: "Check-in, dạo Myeongdong." },
      {
        day: "Ngày 2",
        title: "Cung điện Gyeongbok",
        desc: "Thăm palaces, Insadong.",
      },
      {
        day: "Ngày 3",
        title: "DMZ tour",
        desc: "Tham quan Khu phi quân sự DMZ.",
      },
      {
        day: "Ngày 4",
        title: "Namsan & ăn tối",
        desc: "Tháp N Seoul, ăn tối Hàn.",
      },
      { day: "Ngày 5", title: "Mua sắm & về", desc: "Mua sắm, ra sân bay." },
    ],
  },

  {
    title: "Tokyo & Mount Fuji 5N4Đ",
    slug: "tokyo-mt-fuji-5n4d",
    location: "Japan",
    duration: "5N4Đ",
    price: 15200000,
    description: "Tokyo sầm uất, đền chùa cổ kính và núi Phú Sĩ.",
    image: "/uploads/tours/19.jpg",
    itinerary: [
      { day: "Ngày 1", title: "Đến Tokyo", desc: "Check-in, dạo Shibuya." },
      {
        day: "Ngày 2",
        title: "Tokyo Highlights",
        desc: "Asakusa, Skytree, Ueno.",
      },
      {
        day: "Ngày 3",
        title: "Mount Fuji day trip",
        desc: "Tham quan Kawaguchiko, Mt Fuji views.",
      },
      {
        day: "Ngày 4",
        title: "Akihabara & Shinjuku",
        desc: "Mua sắm & trải nghiệm.",
      },
      { day: "Ngày 5", title: "Về", desc: "Thu dọn, ra sân bay." },
    ],
  },

  {
    title: "Bali Beach Retreat 4N3Đ",
    slug: "bali-4n3d",
    location: "Bali",
    duration: "4N3Đ",
    price: 8500000,
    description: "Resort biển, yoga, văn hoá Bali và lặn ngắm san hô.",
    image: "/uploads/tours/20.jpg",
    itinerary: [
      { day: "Ngày 1", title: "Đến Bali", desc: "Check-in resort, thư giãn." },
      {
        day: "Ngày 2",
        title: "Ubud & rice terraces",
        desc: "Thăm Ubud, rừng khỉ, ruộng bậc thang.",
      },
      { day: "Ngày 3", title: "Lặn biển & spa", desc: "Lặn, spa thư giãn." },
      { day: "Ngày 4", title: "Mua sắm & về", desc: "Kết thúc." },
    ],
  },

  {
    title: "Dubai Luxury Escape 5N4Đ",
    slug: "dubai-5n4d",
    location: "UAE",
    duration: "5N4Đ",
    price: 22000000,
    description: "Burj Khalifa, sa mạc safari và shopping cao cấp.",
    image: "/uploads/tours/21.jpg",
    itinerary: [
      { day: "Ngày 1", title: "Đến Dubai", desc: "Check-in, dạo Marina." },
      {
        day: "Ngày 2",
        title: "Burj Khalifa & Mall",
        desc: "Thăm Burj, mua sắm.",
      },
      { day: "Ngày 3", title: "Sa mạc Safari", desc: "Safari, BBQ dưới sao." },
      {
        day: "Ngày 4",
        title: "Palm & Atlantis",
        desc: "Thăm Palm Jumeirah, Atlantis.",
      },
      { day: "Ngày 5", title: "Về", desc: "Hoàn tất." },
    ],
  },

  {
    title: "Paris - Rome Highlights 7N6Đ",
    slug: "paris-rome-7n6d",
    location: "Europe",
    duration: "7N6Đ",
    price: 42000000,
    description: "Tham quan Paris, Rome và Venice trong hành trình văn hoá.",
    image: "/uploads/tours/22.jpg",
    itinerary: [
      {
        day: "Ngày 1",
        title: "Paris - Tháp Eiffel",
        desc: "Đến Paris, thăm Tháp Eiffel.",
      },
      {
        day: "Ngày 2",
        title: "Bảo tàng Louvre",
        desc: "Thăm Louvre và Notre Dame.",
      },
      {
        day: "Ngày 3",
        title: "Rome - Colosseum",
        desc: "Bay tới Rome, thăm Colosseum.",
      },
      {
        day: "Ngày 4",
        title: "Vatican",
        desc: "Thăm Vatican & Sistine Chapel.",
      },
      {
        day: "Ngày 5",
        title: "Venice",
        desc: "Đi tàu tới Venice, dạo gondola.",
      },
      {
        day: "Ngày 6",
        title: "Khám phá Venice",
        desc: "Tham quan các đảo và kênh.",
      },
      { day: "Ngày 7", title: "Về", desc: "Kết thúc hành trình." },
    ],
  },

  {
    title: "London & Edinburgh 7N6Đ",
    slug: "london-edinburgh-7n6d",
    location: "UK",
    duration: "7N6Đ",
    price: 38000000,
    description: "London hiện đại và Edinburgh cổ kính, lâu đài và di sản.",
    image: "/uploads/tours/23.jpg",
    itinerary: [
      { day: "Ngày 1", title: "London", desc: "Check-in, dạo Westminster." },
      {
        day: "Ngày 2",
        title: "Buckingham & Museums",
        desc: "Thăm Buckingham, British Museum.",
      },
      {
        day: "Ngày 3",
        title: "Oxford/Stonehenge",
        desc: "Tour ngoại ô (tuỳ chương trình).",
      },
      {
        day: "Ngày 4",
        title: "Tàu tới Edinburgh",
        desc: "Di chuyển tới Scotland.",
      },
      {
        day: "Ngày 5",
        title: "Edinburgh Castle",
        desc: "Thăm lâu đài và Royal Mile.",
      },
      {
        day: "Ngày 6",
        title: "Khám phá vùng Highlands",
        desc: "Ngoài trời, hồ, phong cảnh.",
      },
      { day: "Ngày 7", title: "Về", desc: "Kết thúc tour." },
    ],
  },

  {
    title: "Sydney & Blue Mountains 6N5Đ",
    slug: "sydney-blue-mountains-6n5d",
    location: "Australia",
    duration: "6N5Đ",
    price: 36000000,
    description: "Opera House, Harbour Bridge và Blue Mountains hùng vĩ.",
    image: "/uploads/tours/24.jpg",
    itinerary: [
      {
        day: "Ngày 1",
        title: "Sydney arrival",
        desc: "Check-in, Opera House view.",
      },
      {
        day: "Ngày 2",
        title: "Harbour Bridge",
        desc: "Climb hoặc walk Bridge, Darling Harbour.",
      },
      {
        day: "Ngày 3",
        title: "Blue Mountains",
        desc: "Tour trong ngày tới Blue Mountains.",
      },
      {
        day: "Ngày 4",
        title: "Bondi Beach",
        desc: "Tắm biển Bondi & coastal walk.",
      },
      { day: "Ngày 5", title: "City free", desc: "Mua sắm & giải trí." },
      { day: "Ngày 6", title: "Về", desc: "Kết thúc" },
    ],
  },

  {
    title: "New York City Break 5N4Đ",
    slug: "new-york-5n4d",
    location: "USA",
    duration: "5N4Đ",
    price: 40000000,
    description: "Times Square, Central Park, tượng Nữ Thần Tự Do và Broadway.",
    image: "/uploads/tours/25.jpg",
    itinerary: [
      {
        day: "Ngày 1",
        title: "NYC Arrival",
        desc: "Check-in, dạo Times Square.",
      },
      {
        day: "Ngày 2",
        title: "Central Park & Museums",
        desc: "Thăm Central Park, Met.",
      },
      {
        day: "Ngày 3",
        title: "Statue of Liberty",
        desc: "Ferry thăm Tượng Nữ Thần Tự Do.",
      },
      {
        day: "Ngày 4",
        title: "Brooklyn & shopping",
        desc: "Dạo Brooklyn, mua sắm.",
      },
      { day: "Ngày 5", title: "Về", desc: "Kết thúc" },
    ],
  },

  {
    title: "Istanbul Heritage 5N4Đ",
    slug: "istanbul-5n4d",
    location: "Turkey",
    duration: "5N4Đ",
    price: 18000000,
    description: "Cầu Hagia Sophia, chợ Grand Bazaar và ẩm thực Ottoman.",
    image: "/uploads/tours/26.jpg",
    itinerary: [
      {
        day: "Ngày 1",
        title: "Istanbul arrival",
        desc: "Check-in, dạo Sultanahmet.",
      },
      {
        day: "Ngày 2",
        title: "Hagia Sophia & Blue Mosque",
        desc: "Thăm 2 công trình lịch sử.",
      },
      {
        day: "Ngày 3",
        title: "Topkapi & Grand Bazaar",
        desc: "Bảo tàng & chợ.",
      },
      {
        day: "Ngày 4",
        title: "Bosphorus cruise",
        desc: "Du thuyền Bosphorus.",
      },
      { day: "Ngày 5", title: "Về", desc: "Kết thúc" },
    ],
  },

  {
    title: "Hanoi to Luang Prabang 4N3Đ",
    slug: "luang-prabang-4n3d",
    location: "Laos",
    duration: "4N3Đ",
    price: 8200000,
    description: "Cố đô Luang Prabang yên bình, thác Kuang Si và văn hóa Lào.",
    image: "/uploads/tours/27.jpg",
    itinerary: [
      {
        day: "Ngày 1",
        title: "Đến Luang Prabang",
        desc: "Check-in, dạo phố cổ.",
      },
      {
        day: "Ngày 2",
        title: "Kuang Si Falls",
        desc: "Thăm thác Kuang Si, nghỉ dưỡng.",
      },
      {
        day: "Ngày 3",
        title: "Wats & Royal Palace",
        desc: "Thăm các ngôi chùa.",
      },
      { day: "Ngày 4", title: "Về", desc: "Kết thúc" },
    ],
  },

  {
    title: "Kuala Lumpur & Genting 4N3Đ",
    slug: "kuala-lumpur-genting-4n3d",
    location: "Malaysia",
    duration: "4N3Đ",
    price: 7600000,
    description: "Petronas, Batu Caves và khu giải trí Genting Highlands.",
    image: "/uploads/tours/28.jpg",
    itinerary: [
      {
        day: "Ngày 1",
        title: "Đến KL",
        desc: "Check-in, thăm Petronas Tower.",
      },
      {
        day: "Ngày 2",
        title: "Batu Caves",
        desc: "Thăm động Batu và khám phá.",
      },
      {
        day: "Ngày 3",
        title: "Genting",
        desc: "Lên Genting Highlands, công viên giải trí.",
      },
      { day: "Ngày 4", title: "Về", desc: "Kết thúc" },
    ],
  },

  {
    title: "Seville & Granada 6N5Đ",
    slug: "seville-granada-6n5d",
    location: "Spain",
    duration: "6N5Đ",
    price: 30000000,
    description: "Kiến trúc Andalusia, Alhambra và ẩm thực tapas đặc sắc.",
    image: "/uploads/tours/29.jpg",
    itinerary: [
      { day: "Ngày 1", title: "Đến Seville", desc: "Check-in, dạo phố cổ." },
      {
        day: "Ngày 2",
        title: "Seville highlights",
        desc: "Thăm Alcázar, nhà thờ Sevilla.",
      },
      { day: "Ngày 3", title: "Granada & Alhambra", desc: "Thăm Alhambra." },
      { day: "Ngày 4", title: "Khám phá vùng", desc: "Ẩm thực & flamenco." },
      { day: "Ngày 5", title: "Mua sắm & về", desc: "Kết thúc." },
      { day: "Ngày 6", title: "Về", desc: "Hoàn tất hành trình." },
    ],
  },

  {
    title: "Kyoto & Osaka Cultural Tour 5N4Đ",
    slug: "kyoto-osaka-5n4d",
    location: "Japan",
    duration: "5N4Đ",
    price: 14500000,
    description:
      "Đền chùa lịch sử Kyoto, ẩm thực Osaka và trải nghiệm trà đạo.",
    image: "/uploads/tours/30.jpg",
    itinerary: [
      { day: "Ngày 1", title: "Đến Kyoto", desc: "Thăm Kiyomizu-dera, Gion." },
      {
        day: "Ngày 2",
        title: "Arashiyama & Bamboo",
        desc: "Rừng tre, cầu Togetsukyo.",
      },
      {
        day: "Ngày 3",
        title: "Osaka",
        desc: "Di chuyển Osaka, Dotonbori & ẩm thực.",
      },
      {
        day: "Ngày 4",
        title: "Nara day trip",
        desc: "Thăm Nara và Deer Park.",
      },
      { day: "Ngày 5", title: "Về", desc: "Kết thúc tour." },
    ],
  },
];

/* ======================================================
   3. TESTIMONIALS — 20
====================================================== */
const TESTIMONIALS = [
  {
    name: "Minh Nguyễn",
    role: "Khách hàng",
    avatar: "/avatars/1.jpg",
    rating: 5,
    text: "Hành trình tuyệt vời!",
    tourIndex: 0,
  },
  {
    name: "Thu Trần",
    role: "Khách hàng",
    avatar: "/avatars/2.jpg",
    rating: 5,
    text: "Dịch vụ chu đáo.",
    tourIndex: 1,
  },
  {
    name: "Hải Phạm",
    role: "Khách hàng",
    avatar: "/avatars/3.jpg",
    rating: 4,
    text: "Rất đáng tiền, sẽ quay lại.",
    tourIndex: 2,
  },
  {
    name: "Lan Võ",
    role: "Khách hàng",
    avatar: "/avatars/4.jpg",
    rating: 5,
    text: "Hướng dẫn viên nhiệt tình và chuyên nghiệp.",
    tourIndex: 3,
  },
  {
    name: "Quang Lê",
    role: "Khách hàng",
    avatar: "/avatars/3.jpg",
    rating: 4,
    text: "Phong cảnh đẹp, ăn uống ngon.",
    tourIndex: 4,
  },

  {
    name: "Tâm Bùi",
    role: "Khách hàng",
    avatar: "/avatars/2.jpg",
    rating: 5,
    text: "Gia đình mình rất hài lòng.",
    tourIndex: 5,
  },
  {
    name: "Mai Nguyễn",
    role: "Khách hàng",
    avatar: "/avatars/2.jpg",
    rating: 4,
    text: "Mọi thứ đều ổn.",
    tourIndex: 6,
  },
  {
    name: "Dũng Trần",
    role: "Khách hàng",
    avatar: "/avatars/1.jpg",
    rating: 5,
    text: "Đây là chuyến đi khó quên.",
    tourIndex: 7,
  },
  {
    name: "Vy Phạm",
    role: "Khách hàng",
    avatar: "/avatars/4.jpg",
    rating: 5,
    text: "Rất chuyên nghiệp và an toàn.",
    tourIndex: 8,
  },
  {
    name: "Long Hoàng",
    role: "Khách hàng",
    avatar: "/avatars/1.jpg",
    rating: 4,
    text: "Hài lòng về chất lượng tour.",
    tourIndex: 9,
  },

  {
    name: "Lan Anh",
    role: "Khách hàng",
    avatar: "/avatars/2.jpg",
    rating: 5,
    text: "Mình thích mọi thứ trong tour này.",
    tourIndex: 10,
  },
  {
    name: "Hạnh Lê",
    role: "Khách hàng",
    avatar: "/avatars/4.jpg",
    rating: 4,
    text: "Những trải nghiệm rất đáng giá.",
    tourIndex: 11,
  },
  {
    name: "Phúc Nguyễn",
    role: "Khách hàng",
    avatar: "/avatars/3.jpg",
    rating: 5,
    text: "Cảnh đẹp hơn mong đợi.",
    tourIndex: 12,
  },
  {
    name: "Trang Phạm",
    role: "Khách hàng",
    avatar: "/avatars/4.jpg",
    rating: 5,
    text: "Hướng dẫn viên rất tốt.",
    tourIndex: 13,
  },
  {
    name: "Bình Trần",
    role: "Khách hàng",
    avatar: "/avatars/1.jpg",
    rating: 4,
    text: "Sẽ giới thiệu cho bạn bè.",
    tourIndex: 14,
  },

  {
    name: "Anna Kim",
    role: "Khách hàng",
    avatar: "/avatars/1.jpg",
    rating: 5,
    text: "Amazing experience!",
    tourIndex: 15,
  },
  {
    name: "John Lee",
    role: "Khách hàng",
    avatar: "/avatars/2.jpg",
    rating: 5,
    text: "Highly recommended.",
    tourIndex: 16,
  },
  {
    name: "Maria Rossi",
    role: "Khách hàng",
    avatar: "/avatars/3.jpg",
    rating: 4,
    text: "Great service and food.",
    tourIndex: 17,
  },
  {
    name: "Carlos M",
    role: "Khách hàng",
    avatar: "/avatars/4.jpg",
    rating: 5,
    text: "Wonderful guide and itinerary.",
    tourIndex: 18,
  },
  {
    name: "Elena G",
    role: "Khách hàng",
    avatar: "/avatars/2.jpg",
    rating: 5,
    text: "Memorable trip!",
    tourIndex: 19,
  },
];

/* ======================================================
   SEED FUNCTION — FINAL
====================================================== */

async function run() {
  const ds = new DataSource(ormconfig as any);
  await ds.initialize();
  console.log("🌍 Connected!");

  /** Disable FK to allow truncating tables safely */
  await ds.query("SET FOREIGN_KEY_CHECKS = 0");

  await ds.getRepository(PaymentAccount).clear();
  await ds.getRepository(Payments).clear();
  await ds.getRepository(Order).clear();
  await ds.getRepository(CartItem).clear();
  await ds.getRepository(Testimonial).clear();
  await ds.getRepository(Tour).clear();
  await ds.getRepository(User).clear();

  await ds.query("SET FOREIGN_KEY_CHECKS = 1");
  console.log("🧹 Tables cleared safely");

  /* USERS */
  const userRepo = ds.getRepository(User);
  const users = await Promise.all(
    USERS.map(async (u) =>
      userRepo.save(
        userRepo.create({
          email: u.email,
          password: await bcrypt.hash(u.password, 10),
          fullName: u.fullName,
          phone: u.phone ?? null,
          address: u.address ?? null,
          birthDate: u.birthDate ? new Date(u.birthDate) : null,
          avatar: u.images || null,
          role: u.role as "admin" | "user",
          status: "active",
        })
      )
    )
  );
  console.log("👤 Users:", users.length);

  /* TOURS */
  const tourRepo = ds.getRepository(Tour);

  const savedTours = await Promise.all(
    TOURS.map((t, index) => {
      const DEAL_INDEX = [0, 2, 4, 7, 10, 13, 17, 22];
      const DEAL_TYPES = [
        "Summer Sale",
        "Winter Sale",
        "VIP",
        "Early",
        "Golden Deal",
        "Diamond Deal",
        "Silver Deal",
      ];

      let discount = 0;
      let discountPrice = t.price;
      let dealType = null;
      let dealStart = null;
      let dealEnd = null;

      if (DEAL_INDEX.includes(index)) {
        discount = Math.floor(Math.random() * 6) + 10; // 10–15%
        discountPrice = Math.round(t.price - (t.price * discount) / 100);

        dealType = DEAL_TYPES[index % DEAL_TYPES.length];
        dealStart = new Date();
        dealEnd = new Date(Date.now() + 7 * 86400 * 1000);
      }

      return tourRepo.save(
        tourRepo.create({
          ...t,
          discount,
          discountPrice,
          dealType,
          dealStart,
          dealEnd,
        })
      );
    })
  );

  console.log("🗺 Tours:", savedTours.length);

  /* TESTIMONIALS */
  const testRepo = ds.getRepository(Testimonial);
  await Promise.all(
    TESTIMONIALS.map((t) =>
      testRepo.save(
        testRepo.create({
          name: t.name,
          role: t.role,
          avatar: t.avatar,
          rating: t.rating,
          text: t.text,
          tourName: savedTours[t.tourIndex].title,
        })
      )
    )
  );
  console.log("⭐ Testimonials created");

  /* CART ITEMS */
  const cartRepo = ds.getRepository(CartItem);

  await Promise.all(
    [...Array(20)].map((_, i) =>
      cartRepo.save(
        cartRepo.create({
          userId: users[i % users.length].id,
          tourId: savedTours[i % savedTours.length].id,
          qty: (i % 2) + 1,
        })
      )
    )
  );
  console.log("🛒 Cart items: 20");

  /* ORDERS */
  const orderRepo = ds.getRepository(Order);

  const orders = await Promise.all(
    [...Array(20)].map((_, i) => {
      const tour = savedTours[i % savedTours.length];

      return orderRepo.save(
        orderRepo.create({
          code: `ORD-${2000 + i}`,
          userId: users[i % users.length].id,
          items: [
            {
              tourId: tour.id,
              tourTitle: tour.title,
              tourImage: tour.image,
              qty: 1,
              price: tour.price,
              discount: tour.discount || 0,
              finalPrice: tour.discountPrice || tour.price,
            },
          ],
          total: tour.discountPrice || tour.price,
          status: i % 3 === 0 ? "confirmed" : "pending",
          createdAt: new Date(Date.now() - i * 86400 * 1000),
        })
      );
    })
  );

  console.log("📦 Orders:", orders.length);

  /* PAYMENTS */
  const paymentAccountRepo = ds.getRepository(PaymentAccount);
  const payRepo = ds.getRepository(Payments);

  const WALLET_PROVIDERS = ["momo", "vnpay"];
  const BANKS_PROVIDERS = ["bank:vcb", "bank:bidv", "bank:tcb"];
  function randomItem<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function formatAccountNumber(raw: string) {
    return raw.replace(/(\d{4})(\d{3})(\d{3})/, "$1.$2.$3");
  }

  function randomBalance(min: number, max: number) {
    const value = Math.floor(Math.random() * (max - min + 1) + min) * 1_000_000;
    return value; // NUMBER, không phải string
  }

  // seed.ts
  for (const user of users) {
    // ví điện tử
    const walletRaw = "09" + Math.floor(10000000 + Math.random() * 90000000);
    await paymentAccountRepo.save({
      userId: user.id,
      provider: randomItem(WALLET_PROVIDERS),
      accountNumber: formatAccountNumber(walletRaw),
      accountName: user.fullName,
      balance: randomBalance(30, 80),
      isActive: true,
    });

    // ngân hàng
    const bankRaw = "10" + Math.floor(100000000 + Math.random() * 900000000);
    await paymentAccountRepo.save({
      userId: user.id,
      provider: randomItem(BANKS_PROVIDERS),
      accountNumber: formatAccountNumber(bankRaw),
      accountName: user.fullName,
      balance: randomBalance(80, 200),
      isActive: true,
    });
  }

  await Promise.all(
    orders.map((o, i) => {
      let method: string;

      if (i % 3 === 0) method = "momo";
      else if (i % 3 === 1) method = "vnpay";
      else method = BANKS_PROVIDERS[i % BANKS_PROVIDERS.length];

      const isPaid = o.status === "confirmed";

      return payRepo.save(
        payRepo.create({
          orderId: o.id,
          userId: o.userId,
          amount: o.total,
          method,
          status: isPaid ? "success" : "pending",
          code: isPaid ? `PAY-${Date.now()}.toString().slice(-6)-${i}` : null,
          paidAt: isPaid ? new Date() : null,
        })
      );
    })
  );

  console.log("💳 Payments created");

  console.log("🔥 SEED COMPLETED!");
  process.exit(0);
}

run().catch((err) => {
  console.error("❌ SEED ERROR:", err);
  process.exit(1);
});
