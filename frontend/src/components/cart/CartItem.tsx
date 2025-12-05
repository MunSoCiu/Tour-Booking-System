"use client";

import Image from "next/image";
import { Trash2, Calendar, Users } from "lucide-react";
import { useState } from "react";
import { formatPrice } from "@/lib/utils/formatPrice";

export default function CartItem({
  image,
  title,
  date,
  guests,
  price,
  quantity: initialQty,
}: {
  image: string;
  title: string;
  date: string;
  guests: string;
  price: number;
  quantity: number;
}) {
  const [qty, setQty] = useState(initialQty);

  const increase = () => setQty(qty + 1);
  const decrease = () => qty > 1 && setQty(qty - 1);

  return (
    <div className="bg-white rounded-xl shadow-sm border p-4 flex gap-4">
      {/* Image */}
      <Image
        src={image}
        width={180}
        height={120}
        className="rounded-xl object-cover"
        alt={title}
      />

      {/* Info */}
      <div className="flex-1">
        <h3 className="font-semibold text-lg leading-tight">{title}</h3>

        {/* Date & Guests */}
        <div className="mt-2 space-y-1 text-gray-600 text-sm">
          <p className="flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Ngày đi: {date}
          </p>

          <p className="flex items-center gap-2">
            <Users className="w-4 h-4" /> {guests}
          </p>
        </div>

        {/* Quantity Selector */}
        <div className="mt-3 flex items-center gap-3">
          <span className="text-gray-700 font-medium">Số lượng:</span>

          <div className="flex items-center border rounded-lg overflow-hidden">
            <button
              onClick={decrease}
              className="px-3 py-1 border-r hover:bg-gray-100"
            >
              -
            </button>
            <span className="px-4">{qty}</span>
            <button
              onClick={increase}
              className="px-3 py-1 border-l hover:bg-gray-100"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Price + Delete */}
      <div className="flex flex-col justify-between items-end">
        <p className="text-blue-600 font-semibold text-lg">
          {formatPrice(price)}
        </p>

        <button className="text-gray-400 hover:text-red-500 transition">
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
