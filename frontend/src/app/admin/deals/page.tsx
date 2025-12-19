"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api/client";
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";

export default function DealsPage() {
  const [deals, setDeals] = useState<any[]>([]);

  useEffect(() => {
    loadDeals();
  }, []);

  async function loadDeals() {
    try {
      const res = await api.get("/tours");

      console.log("DEAL API:", res.data);

      const list = Array.isArray(res.data?.items) ? res.data.items : [];

      const dealsOnly = list.filter((t: any) => t.dealType);

      setDeals(dealsOnly);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />

        <div className="p-6">
          <h1 className="text-2xl font-semibold mb-6">Khuyến mãi</h1>

          <div className="bg-white p-4 rounded-xl shadow">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="p-3">Tên Deal</th>
                  <th className="p-3">Giảm (%)</th>
                  <th className="p-3">Giá sau giảm</th>
                  <th className="p-3">Hạn dùng</th>
                  <th className="p-3 text-right">Hành động</th>
                </tr>
              </thead>

              <tbody>
                {deals.map((d, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="p-3">{d.dealType}</td>
                    <td className="p-3">{d.discount}%</td>
                    <td className="p-3">
                      {d.discountPrice.toLocaleString()} đ
                    </td>
                    <td className="p-3">
                      {d.dealEnd ? d.dealEnd.slice(0, 10) : "—"}
                    </td>
                    <td className="p-3 text-right">
                      <button className="text-blue-600 mr-4">Sửa</button>
                      <button className="text-red-600">Xóa</button>
                    </td>
                  </tr>
                ))}

                {deals.length === 0 && (
                  <tr>
                    <td className="p-3 text-center text-gray-400" colSpan={5}>
                      Không có khuyến mãi
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
