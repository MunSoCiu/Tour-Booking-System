"use client";
import { Search, Calendar, FileDown } from "lucide-react";

export default function PaymentSearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      {/* SEARCH */}
      <div className="relative max-w-md">
        <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />

        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Tìm theo mã đơn hoặc phương thức thanh toán…"
          className="w-full border rounded-xl py-3 pl-12 pr-4 outline-none focus:border-blue-500"
        />
      </div>

      {/* DATE FROM */}
      <div className="relative">
        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="mm/dd/yyyy"
          className="border rounded-xl py-3 pl-10 pr-4 w-[150px] focus:border-blue-500"
        />
      </div>

      <span className="text-gray-500">-</span>

      {/* DATE TO */}
      <div className="relative">
        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="mm/dd/yyyy"
          className="border rounded-xl py-3 pl-10 pr-4 w-[150px] focus:border-blue-500"
        />
      </div>

      {/* EXPORT */}
      <button className="ml-auto flex items-center gap-2 border px-4 py-3 rounded-xl hover:bg-gray-100">
        <FileDown className="w-4 h-4" />
        Xuất Báo Cáo
      </button>
    </div>
  );
}
