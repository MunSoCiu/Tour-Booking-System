"use client";

import { CheckCircle, Mail, ClipboardList, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function BookingSuccessPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      {/* SUCCESS BOX */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-10 text-center">
        <div className="flex justify-center">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>

        <h1 className="text-2xl font-bold mt-4">Đặt tour thành công!</h1>
        <p className="text-gray-600 mt-2">
          Cảm ơn bạn đã tin tưởng dịch vụ của chúng tôi.
        </p>

        {/* BOOKING CODE */}
        <p className="mt-6 text-gray-600">Mã đặt chỗ của bạn</p>
        <p className="text-2xl font-bold text-blue-600 mt-1">#A8B2C5</p>
      </div>

      {/* TOUR DETAILS */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-8 mt-10">
        <h2 className="font-semibold text-lg mb-4">Chi tiết đặt tour</h2>

        <div className="grid grid-cols-2 gap-4 text-gray-700 text-sm">
          <p className="font-medium">Tên tour</p>
          <p>Khám phá Châu Âu: Pháp – Thụy Sĩ – Ý</p>

          <p className="font-medium">Ngày đi</p>
          <p>15/09/2024</p>

          <p className="font-medium">Số lượng khách</p>
          <p>2 người lớn</p>
        </div>

        <div className="border-t mt-6 pt-4 flex justify-between text-lg font-semibold text-gray-800">
          <span>Tổng cộng</span>
          <span className="text-blue-600">51.980.000đ</span>
        </div>
      </div>

      {/* NEXT STEPS */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-8 mt-10">
        <h2 className="font-semibold text-lg mb-4">Các bước tiếp theo</h2>

        <ul className="space-y-4 text-gray-700 text-sm">
          <li className="flex gap-3">
            <Mail className="text-blue-600 w-5 h-5 mt-0.5" />
            <p>
              Một email xác nhận với đầy đủ chi tiết và vé điện tử đã được gửi
              đến địa chỉ
              <span className="font-medium"> email@example.com</span>.
            </p>
          </li>

          <li className="flex gap-3">
            <ClipboardList className="text-blue-600 w-5 h-5 mt-0.5" />
            <p>
              Bạn có thể kiểm tra trạng thái và quản lý đặt chỗ của mình bất cứ
              lúc nào trong mục
              <span className="font-medium"> “Đơn hàng của tôi”.</span>
            </p>
          </li>

          <li className="flex gap-3">
            <HelpCircle className="text-blue-600 w-5 h-5 mt-0.5" />
            <p>
              Nếu có bất kỳ câu hỏi nào, vui lòng liên hệ với bộ phận hỗ trợ
              khách hàng của chúng tôi.
            </p>
          </li>
        </ul>
      </div>

      {/* BUTTONS */}
      <div className="max-w-3xl mx-auto flex gap-4 mt-10 justify-center">
        <Link
          href="/orders"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Xem đơn hàng
        </Link>

        <Link
          href="/"
          className="border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}
