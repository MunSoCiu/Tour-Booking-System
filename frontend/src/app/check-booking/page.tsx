"use client";

import { useState } from "react";
import { Search, Ticket } from "lucide-react";

export default function CheckBookingPage() {
  const [code, setCode] = useState("ABC-123456");
  const [showResult, setShowResult] = useState(true); // demo: hiển thị luôn

  return (
    <div className="bg-white min-h-screen pt-10 pb-20 px-4">
      {/* TITLE */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold">
          Kiểm tra thông tin đặt tour
        </h1>
        <p className="text-gray-600 mt-2">
          Nhập mã đặt chỗ của bạn để xem lại chi tiết chuyến đi.
        </p>

        {/* SEARCH BAR */}
        <div className="flex items-center gap-3 mt-8 max-w-xl mx-auto">
          {/* Input */}
          <div className="relative flex-1">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Nhập mã đặt chỗ..."
              className="w-full border rounded-xl px-12 py-4 text-lg outline-none focus:border-blue-500 transition"
            />
            <Ticket className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          {/* Button */}
          <button
            onClick={() => setShowResult(true)}
            className="bg-blue-600 text-white px-6 py-4 rounded-xl text-lg flex items-center gap-2 hover:bg-blue-700 transition"
          >
            <Search className="w-5 h-5" />
            Kiểm tra
          </button>
        </div>
      </div>

      {/* RESULT BOX */}
      {showResult && (
        <div className="max-w-3xl mx-auto mt-14 border rounded-2xl shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="font-semibold text-lg">Chi tiết đặt tour</h2>

            <span className="text-green-700 bg-green-100 px-4 py-1 rounded-full text-sm font-medium">
              ✓ Đã xác nhận
            </span>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 py-8 text-gray-700">
            {/* Mã đặt chỗ */}
            <div>
              <p className="text-sm text-gray-500">Mã đặt chỗ</p>
              <p className="font-semibold mt-1">ABC -123456</p>
            </div>

            {/* Người đặt */}
            <div>
              <p className="text-sm text-gray-500">Người đặt</p>
              <p className="font-semibold mt-1">Nguyễn Văn A</p>
            </div>

            {/* Tên Tour */}
            <div className="md:col-span-2">
              <p className="text-sm text-gray-500">Tên Tour</p>
              <p className="font-semibold mt-1">
                Khám phá Vịnh Hạ Long 2 ngày 1 đêm
              </p>
            </div>

            {/* Ngày đi */}
            <div>
              <p className="text-sm text-gray-500">Ngày đi</p>
              <p className="font-semibold mt-1">30/11/2024</p>
            </div>

            {/* Số lượng khách */}
            <div>
              <p className="text-sm text-gray-500">Số lượng khách</p>
              <p className="font-semibold mt-1">2 Người lớn, 1 Trẻ em</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
