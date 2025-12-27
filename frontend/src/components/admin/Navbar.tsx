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
        <Search className="mr-2 text-gray-500 w-20 h-5" />
        <input
          className="bg-transparent outline-none w-full text-sm"
          placeholder="Tìm kiếm..."
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-9">
        <Bell className="w-7 h-7 text-gray-500 hover:text-gray-700 cursor-pointer" />
        <Mail className="w-7 h-7 text-gray-500 hover:text-gray-700 cursor-pointer" />
      </div>
    </div>
  );
}
