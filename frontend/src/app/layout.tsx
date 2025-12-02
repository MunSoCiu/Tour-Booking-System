import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Traveloka - Đặt Tour Du Lịch",
  description: "Khám phá thế giới, tìm kiếm cuộc phiêu lưu tiếp theo của bạn",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm sticky top-0 z-50">
          <div className="text-2xl font-bold text-blue-600 flex items-center gap-2">
            GoTour
          </div>
          <div className="flex gap-6 font-medium text-gray-600">
            <Link href="/">Trang Chủ</Link>
            <Link href="/tours">Tours</Link>
            <Link href="/promotions">Khuyến Mãi</Link>
            <Link href="/help">Liên Hệ</Link>
          </div>
          <div className="flex gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
            >
              Đăng Nhập
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Đăng Ký
            </Link>
          </div>
        </nav>

        {children}

        <footer className="bg-gray-100 py-8 mt-12 text-center text-gray-500">
          © 2024 GoTour. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
