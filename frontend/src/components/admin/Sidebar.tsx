"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Map, BarChart3, Tag, Users, Plane, Settings } from "lucide-react";
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
      router.push("/"); // chặn user thường truy cập admin
      return;
    }

    setUser(u);
  }, []);

  if (!user) return null;

  return (
    <aside className="w-64 bg-white border-r h-screen p-6 flex flex-col">
      <h1 className="text-2xl font-bold text-blue-600 mb-8">TourAdmin</h1>

      {/* MENU */}
      <nav className="flex flex-col gap-3">
        <MenuItem
          label="Dashboard"
          href="/admin/dashboard"
          active={pathname === "/admin/dashboard"}
          icon={<BarChart3 />}
        />
        <MenuItem
          label="Quản lý Tour"
          href="/admin/tours"
          active={pathname.startsWith("/admin/tours")}
          icon={<Plane />}
        />
        <MenuItem
          label="Đơn hàng"
          href="/admin/orders"
          active={pathname.startsWith("/admin/orders")}
          icon={<Map />}
        />
        <MenuItem
          label="Người dùng"
          href="/admin/users"
          active={pathname.startsWith("/admin/users")}
          icon={<Users />}
        />
        <MenuItem
          label="Khuyến mãi"
          href="/admin/deals"
          active={pathname.startsWith("/admin/deals")}
          icon={<Tag />}
        />
      </nav>

      {/* SETTINGS + USER */}
      <div className="mt-auto">
        <MenuItem
          label="Cài đặt"
          href="/admin/settings"
          active={pathname.startsWith("/admin/settings")}
          icon={<Settings />}
        />

        {/* USER INFO */}
        <div className="flex items-center gap-3 mt-6 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
          <Image
            src={user.avatar || "/avatars/1.jpg"}
            alt="Admin"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <p className="font-semibold">{user.fullName || user.email}</p>
            <p className="text-sm text-gray-500 capitalize">{user.role}</p>
          </div>
        </div>
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
      className={`flex items-center gap-3 p-3 rounded-lg transition ${
        active ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
