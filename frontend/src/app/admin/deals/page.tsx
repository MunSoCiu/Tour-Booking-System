"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api/client";
import DealModal from "@/components/admin/deals/DealModal";

export default function DealsPage() {
  const [deals, setDeals] = useState<any[]>([]);
  const [editingDeal, setEditingDeal] = useState<any | null>(null);

  useEffect(() => {
    loadDeals();
  }, []);

  async function loadDeals() {
    const res = await api.get("/tours");
    const list = Array.isArray(res.data?.items) ? res.data.items : [];
    setDeals(list.filter((t: any) => t.dealType));
  }

  async function removeDeal(id: string) {
    if (!confirm("Xóa khuyến mãi này?")) return;
    await api.delete(`/admin/tours/${id}/deal`);
    loadDeals();
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-6">Khuyến mãi</h1>

        <div className="bg-white p-4 rounded-xl shadow">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="p-3">Tên tour</th>
                <th className="p-3">Ưu đãi</th>
                <th className="p-3">Giảm</th>
                <th className="p-3">Giá sau giảm</th>
                <th className="p-3">Hạn</th>
                <th className="p-3 text-right">Hành động</th>
              </tr>
            </thead>

            <tbody>
              {deals.map((d) => (
                <tr key={d.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{d.title}</td>
                  <td className="p-3 text-blue-600 font-semibold">
                    {d.dealType}
                  </td>
                  <td className="p-3">{d.discount}%</td>
                  <td className="p-3">{d.discountPrice.toLocaleString()} đ</td>
                  <td className="p-3">{d.dealEnd?.slice(0, 10) || "—"}</td>
                  <td className="p-3 text-right">
                    <button
                      className="text-blue-600 mr-4"
                      onClick={() => setEditingDeal(d)}
                    >
                      Sửa
                    </button>
                    <button
                      className="text-red-600"
                      onClick={() => removeDeal(d.id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}

              {deals.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-gray-400">
                    Không có khuyến mãi
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {editingDeal && (
          <DealModal
            tour={editingDeal}
            onClose={() => setEditingDeal(null)}
            onSaved={loadDeals}
          />
        )}
      </div>
    </div>
  );
}
