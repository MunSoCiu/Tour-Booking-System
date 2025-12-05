"use client";

import { useState } from "react";
import LoginTabs from "@/components/auth/LoginTabs";

export default function LoginPage() {
  const [tab, setTab] = useState<"login" | "register">("login");

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">
        {/* Tabs */}
        <LoginTabs tab={tab} setTab={setTab} />

        {/* Heading */}
        <div className="text-center mt-6">
          <h1 className="text-2xl font-bold">Chào mừng trở lại!</h1>
          <p className="text-gray-600 text-sm mt-1">
            Đăng nhập để tiếp tục hành trình của bạn.
          </p>
        </div>

        {/* Login form */}
        {tab === "login" && (
          <form className="mt-6 space-y-5">
            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Email hoặc Tên người dùng
              </label>
              <input
                type="text"
                placeholder="you@example.com"
                className="w-full mt-1 border rounded-lg px-4 py-3 outline-none focus:border-blue-500 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Mật khẩu
              </label>
              <input
                type="password"
                className="w-full mt-1 border rounded-lg px-4 py-3 outline-none focus:border-blue-500 transition"
              />
            </div>

            {/* Remember me + forgot password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                Ghi nhớ tôi
              </label>

              <button className="text-blue-600 hover:underline">
                Quên mật khẩu?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Đăng nhập
            </button>

            {/* Social Login Separator */}
            <div className="flex items-center my-4">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="px-4 text-gray-500 text-sm">
                Hoặc tiếp tục với
              </span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Social Buttons */}
            <div className="flex gap-4">
              <button className="flex-1 flex items-center justify-center gap-2 border py-3 rounded-lg hover:bg-gray-100 transition">
                <img src="/icons/google.svg" className="w-5 h-5" />
                Google
              </button>

              <button className="flex-1 flex items-center justify-center gap-2 border py-3 rounded-lg hover:bg-gray-100 transition">
                <img src="/icons/facebook.svg" className="w-5 h-5" />
                Facebook
              </button>
            </div>
          </form>
        )}

        {/* Register content (optional) */}
        {tab === "register" && (
          <div className="mt-6 text-center py-6 text-gray-600">
            <p>Form Đăng ký bạn muốn mình build luôn không? 👌</p>
          </div>
        )}
      </div>
    </div>
  );
}
