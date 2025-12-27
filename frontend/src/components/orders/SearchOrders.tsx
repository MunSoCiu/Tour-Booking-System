"use client";

import { Search } from "lucide-react";

export default function SearchOrders({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Tìm theo tên tour, mã đơn..."
        className="w-full border rounded-xl py-3 pl-12 pr-4"
      />
    </div>
  );
}
