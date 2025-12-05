import { Bell, Mail, Search } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
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
        <Bell className="text-gray-500 w-6 h-6 cursor-pointer" />
        <Mail className="text-gray-500 w-6 h-6 cursor-pointer" />

        <Image
          src="/images/admin-avatar.png"
          width={40}
          height={40}
          alt="User"
          className="rounded-full cursor-pointer"
        />
      </div>
    </div>
  );
}
