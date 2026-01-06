"use client";

import Image from "next/image";
import { User, Lock, CreditCard, Calendar } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";

export type ProfileTab = "info" | "edit" | "password" | "payment" | "orders";

export default function ProfileSidebar({
  tab,
  setTab,
}: {
  tab: ProfileTab;
  setTab: (t: ProfileTab) => void;
}) {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="bg-white shadow-sm border rounded-xl p-6 h-max">
      {/* User Info */}
      <div className="text-center">
        <Image
          src={user.avatar || "/images/default-avatar.png"}
          width={70}
          height={70}
          alt="user"
          className="rounded-full mx-auto"
        />
        <h3 className="font-semibold mt-3">{user.fullName}</h3>
        <p className="text-gray-500 text-sm">{user.email}</p>
      </div>

      {/* Menu */}
      <div className="mt-6 space-y-2">
        <MenuButton active={tab === "info"} onClick={() => setTab("info")}>
          <User className="w-4 h-4" /> Thông tin cá nhân
        </MenuButton>

        <MenuButton active={tab === "edit"} onClick={() => setTab("edit")}>
          <User className="w-4 h-4" /> Chỉnh sửa hồ sơ
        </MenuButton>

        <MenuButton
          active={tab === "password"}
          onClick={() => setTab("password")}
        >
          <Lock className="w-4 h-4" /> Đổi mật khẩu
        </MenuButton>

        <MenuButton
          active={tab === "payment"}
          onClick={() => setTab("payment")}
        >
          <CreditCard className="w-4 h-4" /> Thanh toán
        </MenuButton>

        <MenuButton active={tab === "orders"} onClick={() => setTab("orders")}>
          <Calendar className="w-4 h-4" /> Lịch sử tour
        </MenuButton>
      </div>
    </div>
  );
}

/* ---------- REUSABLE BUTTON ---------- */
function MenuButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${
        active ? "bg-blue-50 text-blue-600 font-medium" : "hover:bg-gray-100"
      }`}
    >
      {children}
    </button>
  );
}
