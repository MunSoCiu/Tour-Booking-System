"use client";

import { useState } from "react";
import Link from "next/link";
import LoginTabs from "@/components/auth/LoginTabs";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

export default function LoginPage() {
  const API = process.env.NEXT_PUBLIC_API_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        alert(data.message || "Đăng nhập thất bại.");
        return;
      }

      // Backend trả về: { access_token, user }
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Đăng nhập thành công!");

      // ROLE REDIRECT
      if (data.user.role === "admin") {
        window.location.href = "/admin/dashboard";
      } else {
<<<<<<< HEAD
        window.location.href = "/";
=======
        window.location.href = "/user";
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
      }
    } catch (error) {
      setLoading(false);
      alert("Lỗi kết nối đến server!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f8fa] px-4">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
        {/* Tabs */}
        <LoginTabs active="login" />

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mt-6">
          Chào mừng trở lại!
        </h2>

        <p className="text-center text-gray-500 text-sm mb-6">
          Đăng nhập để tiếp tục hành trình của bạn
        </p>

        <div className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-sm">Email hoặc Tên người dùng</label>
            <input
              type="email"
              className="w-full px-4 py-3 border rounded-lg mt-1 focus:border-blue-600 outline-none"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm">Mật khẩu</label>
            <input
              type="password"
              className="w-full px-4 py-3 border rounded-lg mt-1 focus:border-blue-600 outline-none"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Remember */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />
              Ghi nhớ tôi
            </label>

            <Link href="#" className="text-blue-600 hover:underline">
              Quên mật khẩu?
            </Link>
          </div>

          {/* Login button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition mt-2"
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>

          {/* Register link */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Chưa có tài khoản?
            <Link href="/register" className="text-blue-600 ml-1">
              Đăng ký ngay
            </Link>
          </p>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="px-3 text-gray-400 text-sm">
              Hoặc tiếp tục với
            </span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Social login */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 border py-3 rounded-lg hover:bg-gray-50">
              <FcGoogle className="text-xl" /> Google
            </button>
            <button className="flex items-center justify-center gap-2 border py-3 rounded-lg hover:bg-gray-50">
              <FaFacebookF className="text-blue-600 text-lg" /> Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
