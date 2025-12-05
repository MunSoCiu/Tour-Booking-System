"use client";

import Image from "next/image";
import { Star, MapPin, Calendar, Users, ChevronDown } from "lucide-react";
import { useState } from "react";
import TourAccordion from "@/components/tour/TourAccordion";

export default function TourDetailPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-600">
        Trang chủ / Tour / Tour Châu Âu 5N4Đ: Khám Phá Paris – Brussels –
        Amsterdam
      </div>

      {/* Title */}
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold">
          Tour Châu Âu 5N4Đ: Khám Phá Paris – Brussels – Amsterdam
        </h1>

        <div className="flex items-center gap-2 mt-3">
          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          <span className="font-medium">4.8</span>
          <span className="text-gray-500">(125 đánh giá)</span>
          <span className="mx-2">•</span>
          <MapPin className="w-4 h-4 text-gray-500" />
          <span className="text-gray-600">Pháp - Bỉ - Hà Lan</span>
        </div>
      </div>

      {/* Images + Booking Sidebar */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 px-4">
        {/* Image Gallery */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          <Image
            src="/images/eu1.jpg"
            width={900}
            height={600}
            alt=""
            className="rounded-xl object-cover col-span-2 h-[360px]"
          />
          <Image
            src="/images/eu2.jpg"
            width={500}
            height={300}
            alt=""
            className="rounded-xl object-cover h-[180px]"
          />
          <Image
            src="/images/eu3.jpg"
            width={500}
            height={300}
            alt=""
            className="rounded-xl object-cover h-[180px]"
          />
          <Image
            src="/images/eu4.jpg"
            width={500}
            height={300}
            alt=""
            className="rounded-xl object-cover h-[180px]"
          />
          <div className="relative h-[180px]">
            <Image
              src="/images/eu5.jpg"
              fill
              alt=""
              className="object-cover rounded-xl"
            />
            <button className="absolute bottom-3 right-3 bg-white px-4 py-2 rounded-xl shadow text-sm font-medium">
              Xem tất cả ảnh
            </button>
          </div>
        </div>

        {/* Booking Sidebar */}
        <div className="bg-white shadow-md rounded-xl border p-6 h-max">
          <p className="text-3xl font-bold text-blue-600">
            25.990.000đ <span className="text-sm text-gray-500">/ khách</span>
          </p>

          {/* Form */}
          <div className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">
                Ngày khởi hành
              </label>
              <input
                type="date"
                className="w-full border rounded-lg px-4 py-3 mt-1 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">
                Số lượng khách
              </label>
              <select className="w-full border rounded-lg px-4 py-3 mt-1 outline-none focus:border-blue-500">
                <option>2 người lớn</option>
                <option>1 người lớn</option>
                <option>Gia đình</option>
              </select>
            </div>

            {/* Price summary */}
            <div className="border-t pt-4 text-sm">
              <div className="flex justify-between">
                <span>25.990.000đ x 2 khách</span>
                <span>51.980.000đ</span>
              </div>
              <div className="flex justify-between mt-1">
                <span>Phí dịch vụ</span>
                <span>500.000đ</span>
              </div>

              <div className="flex justify-between mt-3 text-lg font-semibold">
                <span>Tổng cộng</span>
                <span>52.480.000đ</span>
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700">
              Đặt tour ngay
            </button>

            <p className="text-xs text-gray-500 text-center">
              Bạn sẽ chưa bị trừ tiền ở bước này.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="max-w-6xl mx-auto mt-10 px-4">
        <div className="flex gap-8 border-b pb-3 font-medium">
          <button className="text-blue-600 border-b-2 border-blue-600 pb-3">
            Tổng quan
          </button>
          <button className="text-gray-600 hover:text-blue-600">
            Lịch trình chi tiết
          </button>
          <button className="text-gray-600 hover:text-blue-600">Dịch vụ</button>
          <button className="text-gray-600 hover:text-blue-600">
            Đánh giá
          </button>
        </div>

        {/* Description */}
        <h2 className="text-xl font-semibold mt-8">Mô tả tour</h2>
        <p className="mt-2 text-gray-700 leading-relaxed">
          Hành trình 5 ngày 4 đêm sẽ đưa bạn qua ba thành phố mang tính biểu
          tượng của Châu Âu...
        </p>

        {/* Itinerary Accordion */}
        <div className="mt-8 space-y-3">
          <TourAccordion
            title="Ngày 1: Chào Paris – Kinh đô ánh sáng"
            content="Sáng: Đến sân bay Charles de Gaulle..."
            index={1}
            open={open}
            setOpen={setOpen}
          />

          <TourAccordion
            title="Ngày 2: Paris – Nghệ thuật và Lịch sử"
            content="Tham quan bảo tàng Louvre..."
            index={2}
            open={open}
            setOpen={setOpen}
          />

          <TourAccordion
            title="Ngày 3: Brussels – Trái tim Châu Âu"
            content="Khám phá quảng trường Grand Place..."
            index={3}
            open={open}
            setOpen={setOpen}
          />
        </div>

        {/* Included / Excluded */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Included */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Dịch vụ bao gồm</h3>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Vé máy bay khứ hồi quốc tế</li>
              <li>✓ Khách sạn 3–4 sao tiêu chuẩn</li>
              <li>✓ Xe du lịch đời mới suốt chương trình</li>
              <li>✓ Vé tham quan các điểm theo lịch trình</li>
              <li>✓ Bảo hiểm du lịch quốc tế</li>
            </ul>
          </div>

          {/* Excluded */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-red-600">
              Không bao gồm
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>✗ Chi phí làm visa</li>
              <li>✗ Chi phí cá nhân: giặt ủi, điện thoại...</li>
              <li>✗ Tiền tip hướng dẫn viên và tài xế</li>
            </ul>
          </div>
        </div>

        {/* Reviews */}
        <h2 className="text-xl font-semibold mt-12">Đánh giá từ khách hàng</h2>

        <div className="mt-6 space-y-4">
          <div className="border rounded-xl p-4 flex gap-4">
            <Image
              src="/images/user1.jpg"
              width={50}
              height={50}
              alt=""
              className="rounded-full"
            />
            <div>
              <p className="font-semibold">Minh Anh</p>
              <p className="text-yellow-400">★★★★★</p>
              <p className="text-gray-700 mt-1">
                Chuyến đi tuyệt vời! Lịch trình hợp lý...
              </p>
            </div>
          </div>

          <div className="border rounded-xl p-4 flex gap-4">
            <Image
              src="/images/user2.jpg"
              width={50}
              height={50}
              alt=""
              className="rounded-full"
            />
            <div>
              <p className="font-semibold">Quốc Hưng</p>
              <p className="text-yellow-400">★★★★★</p>
              <p className="text-gray-700 mt-1">
                Mọi thứ đều tốt, chuyến đi Amsterdam thật đáng nhớ.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
