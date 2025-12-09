"use client";

import Image from "next/image";
import { useState } from "react";

export default function PhotoGallery({
  images = [],
  title = "",
}: {
  images: string[];
  title?: string;
}) {
  const [mainIndex, setMainIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="relative h-[420px] rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
        <div className="text-gray-400">Không có ảnh</div>
      </div>
    );
  }

  const main = images[mainIndex];

  return (
    <div>
      <div className="relative rounded-xl overflow-hidden h-[420px]">
        <Image src={main} alt={title} fill className="object-cover" />
      </div>

      <div className="mt-3 grid grid-cols-4 gap-3">
        {images.slice(0, 8).map((img, idx) => (
          <button
            key={idx}
            onClick={() => setMainIndex(idx)}
            className={`relative h-24 rounded-lg overflow-hidden border ${
              idx === mainIndex ? "ring-2 ring-blue-400" : "border-transparent"
            }`}
          >
            <Image
              src={img}
              alt={`thumb-${idx}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
