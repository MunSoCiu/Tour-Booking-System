"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, Users, Star } from "lucide-react";
import { formatPrice } from "@/lib/utils/format";

interface TourCardProps {
  id: string;
  title: string;
  image: string;
  price: number;
  originalPrice?: number;
  duration: string;
  maxGuests: number;
  rating: number;
  reviewCount: number;
  discount?: number;
  badge?: string;
}

export default function TourCard({
  id,
  title,
  image,
  price,
  originalPrice,
  duration,
  maxGuests,
  rating,
  reviewCount,
  discount,
  badge,
}: TourCardProps) {
  return (
    <Link href={`/tours/${id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        {/* Image */}
        <div className="relative h-48 w-full">
          <Image
            src={image || "/images/placeholder-tour.jpg"}
            alt={title}
            fill
            className="object-cover"
          />
          {badge && (
            <div className="absolute top-2 left-2 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {badge}
            </div>
          )}
          {discount && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              -{discount}%
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-blue-600">
            {title}
          </h3>

          {/* Info */}
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{maxGuests} người</span>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {rating} ({reviewCount} đánh giá)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-end justify-between">
            <div>
              {originalPrice && (
                <p className="text-sm text-gray-500 line-through">
                  {formatPrice(originalPrice)}
                </p>
              )}
              <p className="text-xl font-bold text-blue-600">
                {formatPrice(price)}
              </p>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
              Xem Chi Tiết
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
