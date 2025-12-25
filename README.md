# 🌏 Traveloka - Tour Booking System

Hệ thống đặt tour du lịch trực tuyến được xây dựng với Next.js 14, TypeScript, và Tailwind CSS.

## ✨ Tính năng chính

### Người dùng (User)

- 🔐 Đăng ký / Đăng nhập / Quên mật khẩu
- 🏠 Trang chủ với hero section, search, destinations, featured tours
- 🔍 Tìm kiếm và lọc tours theo nhiều tiêu chí
- 📱 Chi tiết tour với hình ảnh, lịch trình, đánh giá
- 🛒 Giỏ hàng và thanh toán
- 💳 Nhiều phương thức thanh toán (Thẻ, Ví điện tử, Chuyển khoản)
- 📋 Quản lý đơn hàng đã đặt
- 👤 Quản lý hồ sơ cá nhân
- ⭐ Đánh giá và nhận xét tours

### Admin

- 📊 Dashboard với thống kê tổng quan
- 🎫 Quản lý tours (CRUD)
- 📦 Quản lý đơn hàng
- 👥 Quản lý người dùng
- 📈 Báo cáo doanh thu

### Tính năng khác

- 📱 Responsive design (Mobile, Tablet, Desktop)
- 🌙 Dark mode support (có thể thêm)
- 🔔 Thông báo real-time
- 💬 Live chat support
- 🌐 Đa ngôn ngữ (VI/EN)

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: SWR, Axios
- **Form Handling**: React Hook Form + Zod
- **Icons**: Lucide React
- **Charts**: Recharts
- **Date**: date-fns

## 📁 Cấu trúc dự án

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/            # Auth pages group
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── tours/             # Tours pages
│   │   ├── bookings/          # Booking pages
│   │   ├── profile/           # User profile
│   │   ├── admin/             # Admin dashboard
│   │   ├── contact/           # Contact page
│   │   ├── about/             # About page
│   │   └── layout.tsx         # Root layout
│   │
│   ├── components/            # Reusable components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── TourCard.tsx
│   │   └── ui/               # UI components
│   │
│   ├── lib/                   # Utilities & helpers
│   │   ├── api/              # API clients
│   │   └── utils/            # Helper functions
│   │
│   ├── hooks/                 # Custom React hooks
│   ├── types/                 # TypeScript types
│   └── styles/                # Global styles
│
├── public/                    # Static assets
├── Dockerfile                 # Docker configuration
├── docker-compose.yml         # Docker Compose setup
└── package.json              # Dependencies
```

## 🚀 Cài đặt và Chạy

### Yêu cầu hệ thống

- Node.js >= 18.x
- npm hoặc yarn
- Docker & Docker Compose (optional)

### Cài đặt dependencies

```bash
npm install
# hoặc
yarn install
```

### Chạy development server

```bash
npm run dev
# hoặc
yarn dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem kết quả.

### Build production

```bash
npm run build
npm start
```

### Chạy với Docker

```bash
# Build và chạy tất cả services
docker-compose up --build

# Chạy ở chế độ background
docker-compose up -d

# Dừng services
docker-compose down
```

## 🌐 Các trang đã hoàn thành

### Public Pages

1. ✅ **Homepage** (`/`) - Trang chủ với search, destinations, featured tours
2. ✅ **Tours Listing** (`/tours`) - Danh sách tours với filters
3. ✅ **Tour Detail** (`/tours/[id]`) - Chi tiết tour với booking
4. ✅ **Login** (`/login`) - Đăng nhập
5. ✅ **Register** (`/register`) - Đăng ký tài khoản
6. ✅ **Contact** (`/contact`) - Liên hệ
7. ✅ **About** (`/about`) - Về chúng tôi

### User Pages (Protected)

8. ✅ **Cart** (`/cart`) - Giỏ hàng
9. ✅ **Checkout** (`/bookings/checkout`) - Thanh toán
10. ✅ **Booking Success** (`/bookings/success`) - Xác nhận đặt tour
11. ✅ **My Bookings** (`/bookings`) - Quản lý đơn hàng
12. ✅ **Profile** (`/profile`) - Thông tin cá nhân

### Admin Pages (Protected)

13. ✅ **Admin Dashboard** (`/admin/dashboard`) - Tổng quan
14. ✅ **Tours Management** (`/admin/tours`) - Quản lý tours
15. ✅ **Bookings Management** (`/admin/bookings`) - Quản lý đơn hàng
16. ✅ **Users Management** (`/admin/users`) - Quản lý người dùng

### Additional Pages

17. ✅ **Terms of Service** (`/terms`) - Điều khoản dịch vụ
18. ✅ **Privacy Policy** (`/privacy`) - Chính sách bảo mật
19. ✅ **FAQ** (`/faq`) - Câu hỏi thường gặp

## 🎨 Tùy chỉnh

### Màu sắc (Tailwind Config)

Chỉnh sửa `tailwind.config.js` để thay đổi theme:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Màu chủ đạo
      },
      secondary: {
        // Màu phụ
      },
    },
  },
}
```

### Environment Variables

Tạo file `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 🔐 Authentication

Hệ thống sử dụng JWT tokens được lưu trong localStorage:

- Access Token: Xác thực các API requests
- Refresh Token: Làm mới access token khi hết hạn

## 🌍 API Integration

API được tổ chức trong `src/lib/api/`:

- `tourAPI` - Tours endpoints
- `bookingAPI` - Bookings endpoints
- `authAPI` - Authentication endpoints

Ví dụ sử dụng:

```typescript
import { tourAPI } from "@/lib/api/client";

// Lấy danh sách tours
const tours = await tourAPI.getAll({ page: 1, limit: 10 });

// Lấy chi tiết tour
const tour = await tourAPI.getById("tour-id");
```

## 📱 Responsive Design

Hệ thống hỗ trợ đầy đủ các breakpoints:

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🔄 State Management

Sử dụng Zustand cho global state:

- User state
- Cart state
- UI state (modals, notifications)

## 🧪 Testing (Tùy chọn)

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e
```

## 📝 Conventions

### Naming

- Components: PascalCase (`TourCard.tsx`)
- Utilities: camelCase (`formatPrice.ts`)
- Types: PascalCase with descriptive names

### Git Commit Messages

```
feat: thêm tính năng mới
fix: sửa lỗi
docs: cập nhật tài liệu
style: format code
refactor: tái cấu trúc code
test: thêm tests
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push code lên GitHub
2. Import project trên Vercel
3. Deploy tự động

### Docker

```bash
docker build -t tour-booking-frontend .
docker run -p 3000:3000 tour-booking-frontend
```

## 🤝 Contributing

1. Fork project
2. Tạo branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

MIT License - xem file LICENSE để biết thêm chi tiết

## 📞 Support

- Email: hotro@traveloka.com
- Hotline: 1900 1234
- Website: https://traveloka.com

## 👥 Authors

- **Nguyễn Văn A** - CEO & Founder
- **Development Team** - Traveloka Tech Team

---

Made with ❤️ by Traveloka Team
