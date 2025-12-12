"use client";

import { useEffect, useState } from "react";
import { Bell, Mail, Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userJson = localStorage.getItem("user");

    if (!userJson) {
      router.push("/login");
      return;
    }

    try {
      const parsed = JSON.parse(userJson);
      setUser(parsed);
    } catch {
      router.push("/login");
    }
  }, []);

  if (!user) {
    return (
      <div className="h-20 bg-white border-b flex items-center justify-center">
        <p className="text-gray-500 text-sm">Đang tải thông tin...</p>
      </div>
    );
  }

  const avatar = user.avatar || "/avatars/1.jpg";

  return (
    <div className="h-20 bg-white border-b flex items-center justify-between px-8 shadow-sm">
      {/* SEARCH BOX */}
      <div className="flex items-center bg-gray-100 rounded-xl px-4 py-2 w-96">
        <Search className="mr-3 text-gray-500 w-5 h-5" />
        <input
          className="bg-transparent outline-none w-full text-sm"
          placeholder="Tìm kiếm tour, đơn hàng..."
        />
      </div>

      {/* RIGHT ACTIONS */}
      <div className="flex items-center gap-8">
        <Bell className="text-gray-500 w-6 h-6 cursor-pointer hover:text-gray-700 transition" />
        <Mail className="text-gray-500 w-6 h-6 cursor-pointer hover:text-gray-700 transition" />

        {/* USER PROFILE */}
        <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition">
          <Image
            src={avatar}
            width={42}
            height={42}
            alt="Avatar"
            className="rounded-full shadow-sm"
          />
          <div className="leading-tight">
            <p className="text-gray-800 font-medium text-sm">
              {user.fullName || user.email}
            </p>
            <p className="text-xs text-gray-500">Quản trị viên</p>
          </div>
        </div>
      </div>
    </div>
  );
}
