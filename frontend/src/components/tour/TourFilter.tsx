"use client";

import { useState } from "react";

export default function TourFilter({ onChange }: any) {
  const [destination, setDestination] = useState("");
  const [price, setPrice] = useState(20_000_000); // max mặc định
  const [days, setDays] = useState("all"); // 2 → 2N, 3 → 3N,...

  // APPLY FILTER
  const apply = () => {
    onChange({
      location: destination || null,
      maxPrice: price,
      days: days === "all" ? null : Number(days), // gửi SỐ, FE filter sẽ match 2N*, 3N*, ...
    });
  };

  // RESET FILTER
  const reset = () => {
    setDestination("");
    setPrice(20_000_000);
    setDays("all");

    onChange({}); // gửi object rỗng → load lại tất cả
  };

  return (
    <div className="bg-white border rounded-xl p-5">
      <h3 className="font-semibold mb-4 text-lg">Bộ lọc</h3>

      {/* LOCATION */}
      <div className="space-y-1">
        <label className="font-medium">Điểm đến</label>
        <input
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
          placeholder="Nhập thành phố..."
        />
      </div>

      {/* PRICE */}
      <div className="mt-4 space-y-1">
        <label className="font-medium">Ngân sách tối đa</label>
        <input
          type="range"
          min={500_000}
          max={20_000_000}
          step={500_000}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full"
        />
        <p className="text-sm text-gray-600 text-right">
          {(price / 1_000_000).toFixed(1)} triệu
        </p>
      </div>

      {/* DAYS */}
      <div className="mt-4 space-y-1">
        <label className="font-medium">Số ngày</label>
        <select
          value={days}
          onChange={(e) => setDays(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg"
        >
          <option value="all">Tất cả</option>
          <option value="2">2N</option>
          <option value="3">3N</option>
          <option value="4">4N</option>
          <option value="5">5N</option>
          <option value="6">6N</option>
          <option value="7">7N</option>
        </select>
      </div>

      {/* BUTTONS */}
      <button
        onClick={apply}
        className="w-full mt-5 bg-blue-600 text-white py-2 rounded-lg font-medium"
      >
        Áp dụng bộ lọc
      </button>

      <button
        onClick={reset}
        className="w-full mt-2 border py-2 rounded-lg text-gray-600"
      >
        Xoá bộ lọc
      </button>
    </div>
  );
}
