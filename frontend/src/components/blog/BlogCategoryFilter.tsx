"use client";

import { useState } from "react";

const categories = [
  "Tất cả",
  "Kinh nghiệm",
  "Điểm đến",
  "Ẩm thực",
  "Du lịch biển",
  "Du lịch núi",
];

export default function BlogCategoryFilter() {
  const [active, setActive] = useState("Tất cả");

  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActive(cat)}
          className={`px-4 py-2 rounded-full text-sm border transition 
          ${
            active === cat
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
