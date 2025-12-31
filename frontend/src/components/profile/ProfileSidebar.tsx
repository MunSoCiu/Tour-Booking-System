<<<<<<< HEAD
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

=======
import Image from "next/image";
import { User, Lock, CreditCard, Calendar } from "lucide-react";

export default function ProfileSidebar() {
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
  return (
    <div className="bg-white shadow-sm border rounded-xl p-6 h-max">
      {/* User Info */}
      <div className="text-center">
        <Image
<<<<<<< HEAD
          src={user.avatar || "/images/default-avatar.png"}
=======
          src="/images/user1.jpg"
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
          width={70}
          height={70}
          alt="user"
          className="rounded-full mx-auto"
        />
<<<<<<< HEAD
        <h3 className="font-semibold mt-3">{user.fullName}</h3>
        <p className="text-gray-500 text-sm">{user.email}</p>
=======
        <h3 className="font-semibold mt-3">Nguyễn Văn A</h3>
        <p className="text-gray-500 text-sm">nva@email.com</p>
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
      </div>

      {/* Menu */}
      <div className="mt-6 space-y-2">
<<<<<<< HEAD
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
=======
        <button className="w-full flex items-center gap-3 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium">
          <User className="w-4 h-4" /> Thông tin cá nhân
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-lg text-gray-700">
          <Lock className="w-4 h-4" /> Đổi mật khẩu
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-lg text-gray-700">
          <CreditCard className="w-4 h-4" /> Quản lý thanh toán
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-lg text-gray-700">
          <Calendar className="w-4 h-4" /> Lịch sử đặt tour
        </button>
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
      </div>
    </div>
  );
}
<<<<<<< HEAD

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
=======
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
