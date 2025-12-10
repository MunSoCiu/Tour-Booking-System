"use client";

import { useState } from "react";
import LoginTabs from "@/components/auth/LoginTabs";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

export default function RegisterPage() {
  const API = process.env.NEXT_PUBLIC_API_URL;

  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);

  const handleRegister = async () => {
    if (!regName || !regEmail || !regPassword)
      return alert("Vui lòng nhập đầy đủ thông tin.");

    setRegisterLoading(true);

    const res = await fetch(`${API}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: regName,
        email: regEmail,
        password: regPassword,
      }),
    });

    const data = await res.json();
    setRegisterLoading(false);

    if (!res.ok) return alert(data.message || "Đăng ký thất bại.");

    localStorage.setItem("token", data.token);

    alert("Đăng ký thành công!");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f8fa] px-4">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
        <LoginTabs active="register" />

        <h2 className="text-2xl font-bold text-center mt-6">Tạo tài khoản</h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Tham gia ngay để nhận ưu đãi hấp dẫn
        </p>

        <div className="space-y-4">
          <div>
            <label className="text-sm">Họ và tên</label>
            <input
              type="text"
              className="w-full px-4 py-3 border rounded-lg mt-1 focus:border-blue-600 outline-none"
              placeholder="Nguyễn Văn A"
              value={regName}
              onChange={(e) => setRegName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 border rounded-lg mt-1 focus:border-blue-600 outline-none"
              placeholder="email@example.com"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm">Mật khẩu</label>
            <input
              type="password"
              className="w-full px-4 py-3 border rounded-lg mt-1 focus:border-blue-600 outline-none"
              placeholder="••••••••"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleRegister}
            disabled={registerLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition mt-2"
          >
            {registerLoading ? "Đang đăng ký..." : "Đăng ký"}
          </button>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="px-3 text-gray-400 text-sm">
              Hoặc tiếp tục với
            </span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

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
