"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api/client";

export default function TourTable() {
  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    try {
      setLoading(true);

      const res = await api.get("/tours");

      console.log("API DATA:", res.data);

      // Đảm bảo tours luôn là mảng
      const list = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.data)
        ? res.data.data
        : [];

      setTours(list);
    } catch (err) {
      console.error(err);
      alert("Không thể tải danh sách tour!");
    } finally {
      setLoading(false);
    }
  }

  async function deleteTour(id: string) {
    if (!confirm("Bạn có chắc chắn muốn xóa tour này?")) return;

    try {
      await api.delete(`/admin/tours/${id}`);
      loadData();
    } catch (err: any) {
      alert(err.response?.data?.message || "Không thể xóa tour!");
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  if (loading)
    return (
      <div className="bg-white p-4 rounded-xl shadow text-center">
        Đang tải dữ liệu...
      </div>
    );

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-500 border-b">
            <th className="p-3">Tên tour</th>
            <th className="p-3">Giá</th>
            <th className="p-3">Trạng thái</th>
            <th className="p-3 text-right">Hành động</th>
          </tr>
        </thead>

        <tbody>
          {tours.map((t: any) => (
            <tr key={t.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{t.title}</td>

              <td className="p-3">{t.price?.toLocaleString("vi-VN")} đ</td>

              <td className="p-3">
                <span
                  className={`px-2 py-1 text-sm rounded ${
                    t.dealType
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {t.dealType ? "Đang ưu đãi" : "Bình thường"}
                </span>
              </td>

              <td className="p-3 text-right">
                <button className="text-blue-600 mr-4">Sửa</button>

                <button
                  className="text-red-600"
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
