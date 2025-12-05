import Image from "next/image";
import { User, Lock, CreditCard, Calendar } from "lucide-react";

export default function ProfileSidebar() {
  return (
    <div className="bg-white shadow-sm border rounded-xl p-6 h-max">
      {/* User Info */}
      <div className="text-center">
        <Image
          src="/images/user1.jpg"
          width={70}
          height={70}
          alt="user"
          className="rounded-full mx-auto"
        />
        <h3 className="font-semibold mt-3">Nguyễn Văn A</h3>
        <p className="text-gray-500 text-sm">nva@email.com</p>
      </div>

      {/* Menu */}
      <div className="mt-6 space-y-2">
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
      </div>
    </div>
  );
}
