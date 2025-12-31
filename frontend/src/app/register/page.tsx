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
<<<<<<< HEAD
  const [regPhone, setRegPhone] = useState("");
  const [regAddress, setRegAddress] = useState("");
  const [regBirthDate, setRegBirthDate] = useState("");
=======
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0

  const handleRegister = async () => {
    if (!regName || !regEmail || !regPassword)
      return alert("Vui lòng nhập đầy đủ thông tin.");

    setRegisterLoading(true);

    const res = await fetch(`${API}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
<<<<<<< HEAD
        fullName: regName,
        email: regEmail,
        password: regPassword,
        phone: regPhone || undefined,
        address: regAddress || undefined,
        birthDate: regBirthDate || undefined,
=======
        name: regName,
        email: regEmail,
        password: regPassword,
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
      }),
    });

    const data = await res.json();
    setRegisterLoading(false);

    if (!res.ok) return alert(data.message || "Đăng ký thất bại.");

<<<<<<< HEAD
    localStorage.setItem("token", data.access_token);
    localStorage.setItem("user", JSON.stringify(data.user));
=======
    localStorage.setItem("token", data.token);
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0

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
<<<<<<< HEAD
            <label className="text-sm">Số điện thoại</label>
            <input
              type="tel"
              className="w-full px-4 py-3 border rounded-lg mt-1 focus:border-blue-600 outline-none"
              placeholder="0123456789"
              value={regPhone}
              onChange={(e) => setRegPhone(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm">Ngày sinh</label>
            <input
              type="date"
              className="w-full px-4 py-3 border rounded-lg mt-1 focus:border-blue-600 outline-none"
              value={regBirthDate}
              onChange={(e) => setRegBirthDate(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm">Địa chỉ</label>
            <input
              type="text"
              className="w-full px-4 py-3 border rounded-lg mt-1 focus:border-blue-600 outline-none"
              placeholder="Quận 1, TP.HCM"
              value={regAddress}
              onChange={(e) => setRegAddress(e.target.value)}
            />
          </div>

          <div>
=======
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
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
