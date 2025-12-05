import Image from "next/image";
import { Star, MapPin } from "lucide-react";
import { formatPrice } from "@/lib/utils/formatPrice";

export default function TourCard({ tour }: any) {
  return (
    <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
      {/* Image */}
      <div className="relative h-40">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          className="object-cover"
        />

        {tour.badge && (
          <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-md">
            {tour.badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold leading-tight">{tour.title}</h3>

        {/* Days + Location */}
        <div className="text-gray-600 text-sm mt-2 flex gap-4">
          <span>{tour.days}</span>
          <span>•</span>
          <span>{tour.location}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2 text-sm">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span>{tour.rating}</span>
          <span className="text-gray-500">({tour.reviews} đánh giá)</span>
        </div>

        {/* PRICE */}
        <p className="text-gray-600 text-sm mt-3">Giá từ</p>
        <p className="text-blue-600 font-semibold text-lg">
          {formatPrice(tour.price)}
        </p>

        <button className="mt-3 bg-blue-600 text-white w-full py-2 rounded-lg text-sm hover:bg-blue-700">
          Xem Chi Tiết
        </button>
      </div>
    </div>
  );
}
