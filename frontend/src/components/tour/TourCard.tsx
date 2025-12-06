"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock } from "lucide-react";
import { formatPrice } from "@/lib/utils/formatPrice";

export default function TourCard({ tour = {} }: any) {
  return (
    <div className="bg-white border rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* IMAGE */}
      <div className="relative h-44">
        <Image
          src={tour.image || "/images/default-tour.jpg"}
          alt={tour.title || "Tour du lịch"}
          fill
          className="object-cover"
        />

        {/* BADGE (nếu có) */}
        {tour.badge && (
          <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-md shadow">
            {tour.badge}
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4">
        {/* TITLE */}
        <h3 className="font-semibold text-lg leading-tight line-clamp-2">
          {tour.title ?? "Tên tour không xác định"}
        </h3>

        {/* LOCATION */}
        <div className="flex items-center gap-2 text-gray-600 text-sm mt-2">
          <MapPin className="w-4 h-4 text-blue-600" />
          <span>{tour.location ?? "Không rõ"}</span>
        </div>

        {/* DURATION */}
        <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
          <Clock className="w-4 h-4 text-blue-600" />
          <span>{tour.duration ?? "Không rõ"}</span>
        </div>

        {/* PRICE */}
        <p className="text-gray-500 text-sm mt-3">Giá từ</p>
        <p className="text-blue-600 font-bold text-xl">
          {tour.price ? formatPrice(tour.price) + "đ" : "Liên hệ"}
        </p>

        {/* BUTTON */}
        <Link
          href={`/tours/${tour.slug || tour.id}`}
          className="mt-4 block bg-blue-600 text-white w-full py-2 rounded-lg text-sm font-medium text-center hover:bg-blue-700 transition"
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
}
