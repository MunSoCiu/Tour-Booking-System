"use client";

import { useState } from "react";

const TABS = [
  "Tất cả",
  "Chờ thanh toán",
  "Đã xác nhận",
  "Đã hoàn thành",
  "Đã hủy",
];

export default function OrdersFilter() {
  const [active, setActive] = useState("Tất cả");

  return (
    <div className="flex gap-3 flex-wrap">
      {TABS.map((tab) => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={`px-4 py-2 rounded-lg text-sm border transition 
          ${
            active === tab
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
