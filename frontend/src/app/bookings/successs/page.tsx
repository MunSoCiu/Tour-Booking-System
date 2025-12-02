"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckCircle,
  Calendar,
  Users,
  Mail,
  Download,
  Home,
} from "lucide-react";
import { formatPrice } from "@/lib/utils/format";

export default function BookingSuccessPage() {
  const [bookingId, setBookingId] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("lastBookingId") || "#A8B2C5";
    setBookingId(id);
  }, []);

  const bookingDetails = {
    id: bookingId,
    tourTitle: "Tour Châu Âu: Pháp - Thụy Sĩ - Ý",
    date: "15/09/2024",
    guests: 2,
    children: 1,
    total: 52480000,
    email: "email@example.com",
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Icon */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Đặt tour thành công!
          </h1>
          <p className="text-gray-600">
            Cảm ơn bạn đã tin tưởng dịch vụ của chúng tôi.
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6 animate-slide-up">
          <div className="border-b border-gray-200 pb-4 mb-6">
            <h2 className="text-xl font-semibold mb-2">Chi tiết đặt tour</h2>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Mã đặt chỗ của bạn:</span>
              <span className="text-2xl font-bold text-blue-600">
                {bookingDetails.id}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-700 mb-1">Tên tour</h3>
                <p className="text-gray-900 font-semibold">
                  {bookingDetails.tourTitle}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Ngày đi
                </h3>
                <p className="text-gray-900">{bookingDetails.date}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Số lượng khách
                </h3>
                <p className="text-gray-900">
                  {bookingDetails.guests} người lớn, {bookingDetails.children}{" "}
                  trẻ em
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-700">
                  Tổng giá
                </span>
                <span className="text-2xl font-bold text-blue-600">
                  {formatPrice(bookingDetails.total)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-blue-900 mb-4 flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Các bước tiếp theo
          </h3>
          <ul className="space-y-2 text-blue-800">
            <li className="flex gap-2">
              <span>•</span>
              <span>
                Một email xác nhận với đầy đủ chi tiết và vé điện tử đã được gửi
                đến địa chỉ <strong>{bookingDetails.email}</strong>
              </span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>
                Bạn có thể kiểm tra trạng thái và quản lý đặt chỗ của mình bất
                cứ lúc nào trong mục "Đơn hàng của tôi".
              </span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>
                Nếu có bất kỳ câu hỏi nào, vui lòng liên hệ với bộ phận hỗ trợ
                khách hàng của chúng tôi qua số hotline:{" "}
                <strong>1900 1234</strong>
              </span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/bookings"
            className="flex items-center justify-center gap-2 bg-white border-2 border-blue-500 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium"
          >
            <Download className="w-5 h-5" />
            Xem đơn hàng
          </Link>
          <button
            onClick={() => window.print()}
            className="flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            <Download className="w-5 h-5" />
            In vé
          </button>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            <Home className="w-5 h-5" />
            Về trang chủ
          </Link>
        </div>

        {/* Support Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-2">Cần hỗ trợ?</p>
          <Link
            href="/contact"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Liên hệ với chúng tôi →
          </Link>
        </div>
      </div>
    </div>
  );
}
