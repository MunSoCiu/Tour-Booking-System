import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/utils/formatPrice";

interface DealProps {
  title: string;
  desc?: string;
  price: number;
  oldPrice: number;
  image: string;
  slug: string;
  discount: number;
}

export default function DealCard({
  title,
  desc = "",
  price,
  oldPrice,
  image,
  slug,
  discount,
}: DealProps) {
  return (
    <div className="rounded-xl shadow-md bg-white hover:shadow-lg transition p-4 flex flex-col h-full">
      {/* IMAGE */}
      <div className="relative h-52 w-full">
        <Image
          src={image || "/images/default.jpg"}
          fill
          alt={title}
          className="object-cover rounded-xl"
        />

        <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-1 rounded-md">
          -{discount}%
        </span>
      </div>

      {/* TITLE */}
      <h3 className="font-semibold text-lg mt-3 min-h-[48px] line-clamp-2">
        {title}
      </h3>

      {/* DESCRIPTION */}
      <p className="text-gray-600 text-sm line-clamp-3 mt-1 min-h-[60px]">
        {desc}
      </p>

      {/* PRICES */}
      <div className="mt-3">
        <p className="text-blue-600 font-bold text-xl">{formatPrice(price)}đ</p>

        <p className="line-through text-gray-400 text-sm">
          {formatPrice(oldPrice)}đ
        </p>
      </div>

      {/* BUTTON */}
      <Link
        href={`/deals/${slug}`}
        className="mt-auto bg-blue-600 text-white text-center py-2 rounded-lg font-medium hover:bg-blue-700 transition"
      >
        Xem chi tiết
      </Link>
    </div>
  );
}
