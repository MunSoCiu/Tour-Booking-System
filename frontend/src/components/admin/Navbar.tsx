"use client";

import { Bell, Mail, Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    if (userJson) {
      setUser(JSON.parse(userJson));
    }
  }, []);

  return (
    <div className="h-16 bg-white border-b flex items-center justify-between px-6">
      {/* SEARCH */}
      <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-80">
        <Search className="mr-2 text-gray-500 w-4 h-4" />
        <input
          className="bg-transparent outline-none w-full text-sm"
          placeholder="Tìm kiếm..."
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6">
        <Bell className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
        <Mail className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />

        {user && (
          <div className="flex items-center gap-3">
            <Image
              src={user.avatar || "/avatars/1.jpg"}
              width={36}
              height={36}
              alt="avatar"
              className="rounded-full"
            />
            <div className="text-sm leading-tight">
              <p className="font-medium">{user.fullName || user.email}</p>
              <p className="text-xs text-gray-500">Quản trị viên</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
