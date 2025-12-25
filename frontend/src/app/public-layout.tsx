"use client";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/hooks/useAuth";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, logout } = useAuth();

  return (
    <>
      <main className="bg-white">{children}</main>
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
    </>
  );
}
