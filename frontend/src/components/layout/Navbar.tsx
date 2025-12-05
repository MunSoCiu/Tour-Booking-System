"use client";

import Link from "next/link";
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
          <Link href="/blog">Blog</Link>
          <Link href="/about">Về chúng tôi</Link>
          <Link href="/contact">Liên hệ</Link>
        </div>

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
      </div>
    </nav>
  );
}
