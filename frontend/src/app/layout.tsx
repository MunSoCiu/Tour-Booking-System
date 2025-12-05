import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GoTour - Đặt Tour Du Lịch",
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
        {/* ========================================================= */}
        {/* NAVBAR */}
        {/* ========================================================= */}
        <nav className="w-full bg-white shadow-sm sticky top-0 z-50 border-b">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            {/* LOGO */}
            <Link
              href="/"
              className="text-2xl font-bold text-blue-600 flex items-center gap-2"
            >
              <Image src="/logo.png" width={32} height={32} alt="GoTour logo" />
              GoTour
            </Link>

            {/* MAIN MENU */}
            <div className="hidden md:flex gap-8 font-medium text-gray-700">
              <Link href="/">Trang Chủ</Link>
              <Link href="/tours">Tours</Link>
              <Link href="/promotions">Khuyến Mãi</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/about">Về Chúng Tôi</Link>
              <Link href="/contact">Liên Hệ</Link>
            </div>

            {/* AUTH + ACCOUNT */}
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
              >
                Đăng Nhập
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Đăng Ký
              </Link>
            </div>
          </div>
        </nav>

        {/* ========================================================= */}
        {/* CONTENT */}
        {/* ========================================================= */}
        <main className="min-h-screen bg-white">{children}</main>

        {/* ========================================================= */}
        {/* FOOTER */}
        {/* ========================================================= */}
        <footer className="bg-gray-100 py-12 mt-20 border-t">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-6">
            {/* COLUMN 1 */}
            <div>
              <h3 className="font-semibold text-lg mb-2">GoTour</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Mang đến những chuyến đi tuyệt vời và những kỷ niệm khó phai.
              </p>
            </div>

            {/* COLUMN 2 */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Về chúng tôi</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>
                  <Link href="/about">Câu chuyện</Link>
                </li>
                <li>
                  <Link href="/careers">Tuyển dụng</Link>
                </li>
                <li>
                  <Link href="/press">Báo chí</Link>
                </li>
              </ul>
            </div>

            {/* COLUMN 3 */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Hỗ trợ</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>
                  <Link href="/help">Trung tâm hỗ trợ</Link>
                </li>
                <li>
                  <Link href="/security">Chính sách bảo mật</Link>
                </li>
                <li>
                  <Link href="/terms">Điều khoản dịch vụ</Link>
                </li>
                <li>
                  <Link href="/orders">Đơn hàng của tôi</Link>
                </li>
              </ul>
            </div>

            {/* COLUMN 4 */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Nhận ưu đãi</h3>
              <p className="text-gray-600 text-sm mb-3">
                Đăng ký email để nhận ưu đãi và voucher độc quyền.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="px-3 py-2 w-full bg-white border rounded-l-lg outline-none"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700">
                  Đăng ký
                </button>
              </div>
            </div>
          </div>

          <p className="text-center text-gray-500 text-sm mt-10">
            © 2024 GoTour. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
