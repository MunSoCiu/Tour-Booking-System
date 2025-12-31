"use client";

import Link from "next/link";
<<<<<<< HEAD
import Image from "next/image";
import { Menu } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";
import { useState } from "react";

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link
          href="/"
          className="text-2xl font-bold text-blue-600 flex items-center gap-2"
        >
          <Image
            src="/images/logo.jpg"
            width={44}
            height={44}
            alt="GoTour logo"
            priority
          />
          GoTour
        </Link>

        {/* MAIN MENU */}
        <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <Link href="/">Trang chủ</Link>
          <Link href="/tours">Tours</Link>
          <Link href="/deals">Khuyến mãi</Link>
=======
import { Menu, User } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={32} height={32} />
          <span className="font-semibold text-lg">TravelBooking</span>
        </Link>

        {/* Menu */}
        <div className="hidden md:flex items-center gap-8 text-gray-700">
          <Link href="/">Trang chủ</Link>
          <Link href="/tours">Tours</Link>
          <Link href="/promotions">Khuyến mãi</Link>
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
          <Link href="/blog">Blog</Link>
          <Link href="/about">Về chúng tôi</Link>
          <Link href="/contact">Liên hệ</Link>
        </div>

<<<<<<< HEAD
        {/* RIGHT SIDE */}
        {!loading && user && (
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-3 px-3 py-1 rounded-lg hover:bg-gray-100 transition"
            >
              {/* GREETING */}
              <span className="hidden md:block text-sm text-gray-700">
                Xin chào,&nbsp;
                <span className="font-semibold">
                  {user.fullName || user.email}
                </span>
              </span>

              {/* AVATAR */}
              <Image
                src={user.avatar || "/images/default-avatar.png"}
                width={36}
                height={36}
                className="rounded-full object-cover"
                alt="avatar"
              />

              {/* DROPDOWN ICON */}
              <Menu className="w-5 h-5 text-gray-600" />
            </button>

            {/* DROPDOWN */}
            {open && (
              <div className="absolute right-0 mt-2 w-56 bg-white border rounded-xl shadow-lg z-50 overflow-hidden">
                <Link
                  href="/profile"
                  className="block px-4 py-3 hover:bg-gray-100"
                >
                  👤 Thông tin cá nhân
                </Link>
                <Link
                  href="/my-orders"
                  className="block px-4 py-3 hover:bg-gray-100"
                >
                  📦 Quản lý đơn hàng
                </Link>
                <Link
                  href="/cart"
                  className="block px-4 py-3 hover:bg-gray-100"
                >
                  🛒 Giỏ hàng
                </Link>

                <div className="border-t">
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-3 text-red-600 hover:bg-gray-100"
                  >
                    🚪 Đăng xuất
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* MOBILE ICON (để sau nếu cần menu mobile) */}
        <button className="md:hidden">
          <Menu className="w-6 h-6" />
        </button>
=======
        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Login */}
          <Link
            href="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Đăng nhập
          </Link>

          {/* Mobile menu */}
          <button className="md:hidden">
            <Menu className="w-6 h-6" />
          </button>
        </div>
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
      </div>
    </nav>
  );
}
