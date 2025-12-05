"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">
        {/* Tabs */}
        <div className="flex border-b mb-6">
          <Link
            href="/login"
            className="flex-1 text-center py-3 text-gray-500 hover:text-blue-600"
          >
            Đăng nhập
          </Link>
          <span className="flex-1 text-center py-3 border-b-2 border-blue-600 text-blue-600 font-medium">
            Đăng ký
          </span>
        </div>

        <h2 className="text-2xl font-semibold text-center mb-2">
          Tạo tài khoản mới
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Nhập thông tin của bạn để bắt đầu hành trình.
        </p>

        {/* FORM */}
        <form className="space-y-4">
          {/* USERNAME */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Họ và tên
            </label>
            <input
              type="text"
              className="w-full mt-1 border rounded-lg px-4 py-3 outline-none focus:border-blue-500"
              placeholder="Nguyễn Văn A"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full mt-1 border rounded-lg px-4 py-3 outline-none focus:border-blue-500"
              placeholder="your@email.com"
            />
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <label className="text-sm font-medium text-gray-700">
              Mật khẩu
            </label>
            <input
              type={showPass ? "text" : "password"}
              className="w-full mt-1 border rounded-lg px-4 py-3 outline-none focus:border-blue-500"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-10 text-gray-500"
            >
              {showPass ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="relative">
            <label className="text-sm font-medium text-gray-700">
              Xác nhận mật khẩu
            </label>
            <input
              type={showConfirm ? "text" : "password"}
              className="w-full mt-1 border rounded-lg px-4 py-3 outline-none focus:border-blue-500"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-10 text-gray-500"
            >
              {showConfirm ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {/* SUBMIT BUTTON */}
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition">
            Đăng ký
          </button>

          {/* GOOGLE / FACEBOOK */}
          <div className="flex items-center my-4">
            <span className="w-full border-t"></span>
            <span className="px-4 text-gray-400 text-sm">
              Hoặc tiếp tục với
            </span>
            <span className="w-full border-t"></span>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 border rounded-lg py-2.5 hover:bg-gray-50 transition flex items-center justify-center gap-2">
              <img src="/icons/google.svg" className="w-5 h-5" />
              Google
            </button>

            <button className="flex-1 border rounded-lg py-2.5 hover:bg-gray-50 transition flex items-center justify-center gap-2">
              <img src="/icons/facebook.svg" className="w-5 h-5" />
              Facebook
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Bạn đã có tài khoản?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Đăng nhập ngay
          </Link>
        </p>
      </div>
    </div>
  );
}
