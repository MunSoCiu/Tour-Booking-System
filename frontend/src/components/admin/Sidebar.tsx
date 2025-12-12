"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Map,
  BarChart3,
  Tag,
  Users,
  Plane,
  Settings,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userJson = localStorage.getItem("user");

    if (!userJson) {
      router.push("/login");
      return;
    }

    const u = JSON.parse(userJson);

    if (u.role !== "admin") {
      router.push("/");
      return;
    }

    setUser(u);
  }, []);

  if (!user) return null;

  return (
    <aside className="w-64 bg-white h-screen border-r flex flex-col py-6 px-5">
      {/* LOGO */}
      <div className="flex items-center gap-3 mb-10">
        <Image
          src="/icon/admin-logo.jpg"
          width={36}
          height={36}
          alt="Logo"
          className="rounded-lg bg-blue-600 p-1"
        />
        <h1 className="text-xl font-bold text-gray-800 tracking-wide">
          TourAdmin
        </h1>
      </div>

      {/* MENU */}
      <nav className="flex flex-col gap-2">
        <MenuItem
          label="Dashboard"
          href="/admin/dashboard"
          active={pathname === "/admin/dashboard"}
          icon={<BarChart3 className="w-5 h-5" />}
        />

        <MenuItem
          label="Quản lý Tour"
          href="/admin/tours"
          active={pathname.startsWith("/admin/tours")}
          icon={<Plane className="w-5 h-5" />}
        />

        <MenuItem
          label="Đơn hàng"
          href="/admin/orders"
          active={pathname.startsWith("/admin/orders")}
          icon={<Map className="w-5 h-5" />}
        />

        <MenuItem
          label="Người dùng"
          href="/admin/users"
          active={pathname.startsWith("/admin/users")}
          icon={<Users className="w-5 h-5" />}
        />

        <MenuItem
          label="Khuyến mãi"
          href="/admin/deals"
          active={pathname.startsWith("/admin/deals")}
          icon={<Tag className="w-5 h-5" />}
        />
      </nav>

      {/* FOOTER AREA */}
      <div className="mt-auto">
        <MenuItem
          label="Cài đặt"
          href="/admin/settings"
          active={pathname.startsWith("/admin/settings")}
          icon={<Settings className="w-5 h-5" />}
        />

        {/* USER SECTION */}
        <div className="mt-6 p-3 rounded-xl bg-gray-50 flex items-center gap-3 border cursor-pointer hover:bg-gray-100 transition">
          <Image
            src={user.avatar || "/avatars/1.jpg"}
            width={45}
            height={45}
            alt="Admin Avatar"
            className="rounded-full border shadow-sm"
          />
          <div>
            <p className="font-semibold text-gray-800">
              {user.fullName || user.email}
            </p>
            <p className="text-sm text-gray-500 capitalize">{user.role}</p>
          </div>
        </div>

        {/* LOGOUT BUTTON */}
        <button
          onClick={() => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            router.push("/login");
          }}
          className="mt-4 flex items-center gap-2 text-red-500 hover:text-red-600 text-sm"
        >
          <LogOut className="w-4 h-4" />
          Đăng xuất
        </button>
      </div>
    </aside>
  );
}

function MenuItem({
  label,
  icon,
  href,
  active,
}: {
  label: string;
  icon: React.ReactNode;
  href: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
        active
          ? "bg-blue-600 text-white shadow-sm"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
