"use client";

import Image from "next/image";
import { Trash2, Calendar, Users } from "lucide-react";
import { useState } from "react";
import { formatPrice } from "@/lib/utils/formatPrice";

export default function CartItem({
  id,
  image,
  title,
  date,
  guests,
  price,
  quantity: initialQty,
  selected,
  onSelect,
  onQuantityChange,
  onRemove,
}: {
  id: string;
  image: string;
  title: string;
  date: string;
  guests: string;
  price: number;
  quantity: number;
  selected: boolean;
  onSelect: (checked: boolean) => void;
  onQuantityChange?: (qty: number) => void;
  onRemove?: () => void;
}) {
  const [qty, setQty] = useState(initialQty);

  return (
    <div className="bg-white rounded-xl shadow-sm border p-4 flex gap-4">
      {/* CHECKBOX */}
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => onSelect(e.target.checked)}
        className="mt-2"
      />

      {/* Image */}
      <Image
        src={image}
        width={160}
        height={110}
        className="rounded-xl object-cover"
        alt={title}
      />

      {/* Info */}
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{title}</h3>

        <div className="mt-2 text-sm text-gray-600 space-y-1">
          <p className="flex items-center gap-2">
            <Calendar className="w-4 h-4" /> {date}
          </p>
          <p className="flex items-center gap-2">
            <Users className="w-4 h-4" /> {guests}
          </p>
        </div>

        {/* Quantity */}
        <div className="mt-3 flex items-center gap-3">
          <span>Số lượng:</span>
          <div className="flex border rounded-lg overflow-hidden">
            <button
              onClick={() => {
                if (qty > 1) {
                  const v = qty - 1;
                  setQty(v);
                  onQuantityChange?.(v);
                }
              }}
              className="px-3"
            >
              -
            </button>
            <span className="px-4">{qty}</span>
            <button
              onClick={() => {
                const v = qty + 1;
                setQty(v);
                onQuantityChange?.(v);
              }}
              className="px-3"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Price + Delete */}
      <div className="flex flex-col justify-between items-end">
        <p className="text-blue-600 font-semibold">
          {formatPrice(price * qty)}
        </p>

        <button onClick={onRemove} className="text-gray-400 hover:text-red-500">
          <Trash2 />
        </button>
      </div>
    </div>
  );
}
