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
      setUser(JSON.parse(userJson));
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

  const avatar = user.avatar || "/avatars/default.png";

  return (
    <div className="h-20 bg-white border-b flex items-center justify-between px-6">
      {/* SEARCH */}
      <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2 w-96">
        <Search className="mr-2 text-gray-500" />
        <input
          className="bg-transparent outline-none w-full"
          placeholder="Tìm kiếm tour, đơn hàng…"
        />
      </div>

      {/* ACTIONS */}
      <div className="flex items-center gap-6">
        <Bell className="text-gray-500 w-6 h-6 cursor-pointer hover:text-gray-700" />
        <Mail className="text-gray-500 w-6 h-6 cursor-pointer hover:text-gray-700" />

        <div className="flex items-center gap-3 cursor-pointer">
          <Image
            src={avatar}
            width={40}
            height={40}
            alt="User Avatar"
            className="rounded-full"
          />
          <span className="font-medium text-gray-700">
            {user.fullName || user.email}
          </span>
        </div>
      </div>
    </div>
  );
}
