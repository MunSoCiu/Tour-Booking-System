import { Search, SlidersHorizontal, Calendar } from "lucide-react";

export default function SearchOrders() {
  return (
    <div className="flex gap-3 items-center">
      <div className="relative flex-1">
        <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          placeholder="Tìm theo tên tour, mã đơn hàng..."
          className="w-full border rounded-xl py-3 pl-12 pr-4 outline-none focus:border-blue-500"
        />
      </div>

      <button className="border px-4 py-3 rounded-xl bg-white flex items-center gap-2 hover:bg-gray-100">
        <SlidersHorizontal className="w-4 h-4" /> Lọc
      </button>

      <button className="border px-4 py-3 rounded-xl bg-white flex items-center gap-2 hover:bg-gray-100">
        <Calendar className="w-4 h-4" /> Ngày đi
      </button>
    </div>
  );
}
