"use client";

import { useState } from "react";

const categories = [
  "Tất cả",
  "Kinh nghiệm",
  "Ẩm thực",
  "Du lịch biển",
  "Du lịch núi",
  "Du lịch nước ngoài",
];

export default function BlogCategoryFilter({
  setCategory,
}: {
  setCategory: (value: string) => void;
}) {
  const [active, setActive] = useState("Tất cả");

  const choose = (cat: string) => {
    setActive(cat);
    setCategory(cat);
  };

  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => choose(cat)}
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
