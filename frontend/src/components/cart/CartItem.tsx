"use client";

import Image from "next/image";
import { Trash2, Calendar, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { formatPrice } from "@/lib/utils/formatPrice";
import { resolveImage } from "@/lib/utils/resolveImage";

export default function CartItem({
  image,
  title,
  date,
  guests,
  price,
  quantity,
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
  onQuantityChange: (qty: number) => void;
  onRemove: () => void;
}) {
  const [qty, setQty] = useState(quantity);
  const isLocal = process.env.NODE_ENV === "development";

  useEffect(() => {
    setQty(quantity);
  }, [quantity]);

  return (
    <div className="bg-white rounded-2xl border p-5 flex gap-6">
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => onSelect(e.target.checked)}
        className="mt-2"
      />

      <Image
        src={resolveImage(image) || "/images/default.jpg"}
        width={120}
        height={90}
        alt={title}
        className="rounded-xl object-cover border"
        unoptimized={isLocal}
      />

      <div className="flex-1">
        <h3 className="font-semibold text-lg">{title}</h3>

        <div className="mt-2 text-sm text-gray-500 space-y-1">
          <p className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {date}
          </p>
          <p className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            {guests}
          </p>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <span className="text-sm">Số lượng:</span>
          <div className="flex border rounded-lg overflow-hidden">
            <button
              className="px-3"
              onClick={() => {
                if (qty > 1) {
                  const v = qty - 1;
                  setQty(v);
                  onQuantityChange(v);
                }
              }}
            >
              -
            </button>
            <span className="px-4">{qty}</span>
            <button
              className="px-3"
              onClick={() => {
                const v = qty + 1;
                setQty(v);
                onQuantityChange(v);
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between">
        <p className="text-blue-600 font-bold text-lg">
          {formatPrice(price * qty)}
        </p>

        <button onClick={onRemove} className="text-gray-400 hover:text-red-500">
          <Trash2 />
        </button>
      </div>
    </div>
  );
}
