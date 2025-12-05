import { Calendar, ChevronDown } from "lucide-react";

export default function TourFilter() {
  return (
    <div className="bg-white border rounded-xl shadow-sm p-5 h-max">
      <h3 className="font-semibold mb-4">Bộ lọc</h3>

      <div className="space-y-4 text-sm">
        {/* Destination */}
        <div>
          <label>Tìm điểm đến</label>
          <input
            placeholder="Nhập thành phố..."
            className="mt-1 w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Date */}
        <div>
          <label>Ngày đi</label>
          <div className="relative">
            <input
              type="text"
              placeholder="mm/dd/yyyy"
              className="mt-1 w-full border rounded-lg px-3 py-2"
            />
            <Calendar className="w-4 h-4 text-gray-400 absolute right-3 top-3" />
          </div>
        </div>

        {/* Budget */}
        <div>
          <label>Ngân sách</label>
          <input type="range" className="w-full" />
          <div className="flex justify-between text-gray-500 text-xs">
            <span>500k</span>
            <span>20tr+</span>
          </div>
        </div>

        {/* Type */}
        <div>
          <label>Loại tour</label>
          <div className="relative">
            <select className="mt-1 w-full border rounded-lg px-3 py-2 appearance-none">
              <option>Tất cả</option>
              <option>Gia đình</option>
              <option>Cặp đôi</option>
              <option>Nhóm bạn</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Guests */}
        <div>
          <label>Số lượng khách</label>
          <input
            type="number"
            defaultValue={2}
            className="mt-1 w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Amenities */}
        <div>
          <label className="font-medium">Tiện ích</label>
          <div className="mt-2 space-y-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Có hướng dẫn viên
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Bao gồm bữa ăn
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Bao gồm khách sạn
            </label>
          </div>
        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium mt-4">
          Áp dụng bộ lọc
        </button>

        <button className="w-full border py-2 rounded-lg font-medium text-gray-600">
          Xoá bộ lọc
        </button>
      </div>
    </div>
  );
}
