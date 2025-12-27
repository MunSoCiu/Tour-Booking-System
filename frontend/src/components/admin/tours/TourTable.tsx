"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api/client";
import { useRouter } from "next/navigation";

export default function TourTable({ onEdit }: { onEdit: (tour: any) => void }) {
  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  async function loadData() {
    try {
      setLoading(true);
      const res = await api.get("/tours");
      setTours(Array.isArray(res.data?.items) ? res.data.items : []);
    } finally {
      setLoading(false);
    }
  }

  async function deleteTour(id: string) {
    if (!confirm("Bạn có chắc chắn muốn xóa tour này?")) return;
    await api.delete(`/admin/tours/${id}`);
    loadData();
    router.refresh();
  }

  useEffect(() => {
    loadData();
  }, []);

  if (loading)
    return (
      <div className="bg-white p-6 rounded-xl shadow text-center">
        Đang tải dữ liệu...
      </div>
    );

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <table className="w-full text-base">
        <thead>
          <tr className="text-left text-gray-500 border-b">
            <th className="p-4">Tên tour</th>
            <th className="p-4">Giá</th>
            <th className="p-4">Trạng thái</th>
            <th className="p-4 text-right">Hành động</th>
          </tr>
        </thead>

        <tbody>
          {tours.map((t) => (
            <tr key={t.id} className="border-b hover:bg-gray-50">
              <td className="p-4 font-medium">{t.title}</td>
              <td className="p-4">{t.price.toLocaleString()} đ</td>
              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    t.dealType
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {t.dealType ? "Đang ưu đãi" : "Bình thường"}
                </span>
              </td>
              <td className="p-4 text-right">
                <button
                  className="text-blue-600 font-semibold mr-4"
                  onClick={() => onEdit(t)}
                >
                  Sửa
                </button>
                <button
                  className="text-red-600 font-semibold"
                  onClick={() => deleteTour(t.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
