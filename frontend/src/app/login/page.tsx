"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const API = process.env.NEXT_PUBLIC_API_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    setLoading(true);

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

    // Lưu token
    localStorage.setItem("token", data.token);

    alert("Đăng nhập thành công!");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Đăng Nhập</h2>

        <div className="space-y-4">
          <div>
            <label className="text-sm">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 border rounded-lg mt-1"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm">Mật khẩu</label>
            <input
              type="password"
              className="w-full px-4 py-3 border rounded-lg mt-1"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 mt-2"
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Chưa có tài khoản?
            <Link href="/register" className="text-blue-600 ml-1">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
