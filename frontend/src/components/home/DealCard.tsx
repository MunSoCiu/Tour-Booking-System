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
<<<<<<< HEAD
    <div className="rounded-2xl shadow-lg bg-white hover:shadow-xl transition p-6 flex flex-col h-full">
      {/* IMAGE */}
      <div className="relative h-72 w-full">
=======
    <div className="rounded-xl shadow-md bg-white hover:shadow-lg transition p-4 flex flex-col h-full">
      {/* IMAGE */}
      <div className="relative h-52 w-full">
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
        <Image
          src={image || "/images/default.jpg"}
          fill
          alt={title}
<<<<<<< HEAD
          className="object-cover rounded-2xl"
        />

        <span className="absolute top-4 left-4 bg-red-600 text-white text-sm px-3 py-1 rounded-lg font-semibold">
=======
          className="object-cover rounded-xl"
        />

        <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-1 rounded-md">
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
          -{discount}%
        </span>
      </div>

      {/* TITLE */}
<<<<<<< HEAD
      <h3 className="font-bold text-xl mt-4 min-h-[56px] line-clamp-2">
=======
      <h3 className="font-semibold text-lg mt-3 min-h-[48px] line-clamp-2">
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
        {title}
      </h3>

      {/* DESCRIPTION */}
<<<<<<< HEAD
      <p className="text-gray-600 text-base line-clamp-3 mt-2 min-h-[72px]">
=======
      <p className="text-gray-600 text-sm line-clamp-3 mt-1 min-h-[60px]">
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
        {desc}
      </p>

      {/* PRICES */}
<<<<<<< HEAD
      <div className="mt-4">
        <p className="text-blue-600 font-bold text-2xl">
          {formatPrice(price)}đ
        </p>

        <p className="line-through text-gray-400 text-base">
=======
      <div className="mt-3">
        <p className="text-blue-600 font-bold text-xl">{formatPrice(price)}đ</p>

        <p className="line-through text-gray-400 text-sm">
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
          {formatPrice(oldPrice)}đ
        </p>
      </div>

      {/* BUTTON */}
      <Link
        href={`/deals/${slug}`}
<<<<<<< HEAD
        className="mt-auto bg-blue-600 text-white text-center py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
=======
        className="mt-auto bg-blue-600 text-white text-center py-2 rounded-lg font-medium hover:bg-blue-700 transition"
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
      >
        Xem chi tiết
      </Link>
    </div>
  );
}
