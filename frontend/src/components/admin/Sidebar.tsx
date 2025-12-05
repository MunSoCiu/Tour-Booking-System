import Link from "next/link";
import { Map, BarChart3, Tag, Users, Plane, Settings } from "lucide-react";
import Image from "next/image";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r h-screen p-6 flex flex-col">
      <h1 className="text-2xl font-bold text-blue-600 mb-8">TourAdmin</h1>

      {/* MENU */}
      <nav className="flex flex-col gap-3">
        <MenuItem label="Dashboard" icon={<BarChart3 />} active />
        <MenuItem label="Quản lý Tour" icon={<Plane />} />
        <MenuItem label="Đơn hàng" icon={<Map />} />
        <MenuItem label="Người dùng" icon={<Users />} />
        <MenuItem label="Khuyến mãi" icon={<Tag />} />
      </nav>

      {/* SETTINGS + USER */}
      <div className="mt-auto">
        <MenuItem label="Cài đặt" icon={<Settings />} />

        <div className="flex items-center gap-3 mt-6 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
          <Image
            src="/images/admin-avatar.png"
            alt="Admin"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <p className="font-semibold">Admin</p>
            <p className="text-sm text-gray-500">Quản trị viên</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function MenuItem({
  label,
  icon,
  active = false,
}: {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href="#"
      className={`flex items-center gap-3 p-3 rounded-lg transition ${
        active ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
