"use client";

import { useState } from "react";

const FILTERS = ["Tất cả", "Thành công", "Chờ xử lý", "Thất bại"];

export default function PaymentFilter() {
  const [active, setActive] = useState("Tất cả");

  return (
    <div className="flex gap-3 flex-wrap">
      {FILTERS.map((tag) => (
        <button
          key={tag}
          onClick={() => setActive(tag)}
          className={`px-4 py-2 rounded-lg text-sm border transition 
          ${
            active === tag
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
