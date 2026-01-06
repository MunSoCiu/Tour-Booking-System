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
    <div className="rounded-2xl shadow-lg bg-white hover:shadow-xl transition p-6 flex flex-col h-full">
      {/* IMAGE */}
      <div className="relative h-72 w-full">
        <Image
          src={image || "/images/default.jpg"}
          fill
          alt={title}
          className="object-cover rounded-2xl"
        />

        <span className="absolute top-4 left-4 bg-red-600 text-white text-sm px-3 py-1 rounded-lg font-semibold">
          -{discount}%
        </span>
      </div>

      {/* TITLE */}
      <h3 className="font-bold text-xl mt-4 min-h-[56px] line-clamp-2">
        {title}
      </h3>

      {/* DESCRIPTION */}
      <p className="text-gray-600 text-base line-clamp-3 mt-2 min-h-[72px]">
        {desc}
      </p>

      {/* PRICES */}
      <div className="mt-4">
        <p className="text-blue-600 font-bold text-2xl">
          {formatPrice(price)}đ
        </p>

        <p className="line-through text-gray-400 text-base">
          {formatPrice(oldPrice)}đ
        </p>
      </div>

      {/* BUTTON */}
      <Link
        href={`/deals/${slug}`}
        className="mt-auto bg-blue-600 text-white text-center py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
      >
        Xem chi tiết
      </Link>
    </div>
  );
}
