"use client";

import { useEffect, useState } from "react";
import StatCard from "@/components/admin/StatCard";
import { fetchAdminOrders, fetchAdminOrderStats } from "@/lib/api/admin";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    Promise.all([fetchAdminOrders(), fetchAdminOrderStats()]).then(([o, s]) => {
      setOrders(Array.isArray(o?.items) ? o.items : []);
      setStats(s);
    });
  }, []);

  if (!stats) return <div>Đang tải...</div>;

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <div className="flex-1">
        <div className="p-6">
          <h1 className="text-2xl font-semibold">Quản lý đơn hàng</h1>

          {/* STAT */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6"></div>

          {/* TABLE */}
          <div className="bg-white mt-8 p-4 rounded-xl shadow">
            <table className="w-full">
              <thead>
                <tr className="text-gray-500 border-b">
                  <th className="p-3">Mã</th>
                  <th className="p-3">Khách</th>
                  <th className="p-3">Tổng</th>
                  <th className="p-3">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-b">
                    <td className="p-3">{o.code}</td>
                    <td className="p-3">{o.user?.fullName}</td>
                    <td className="p-3">{o.total.toLocaleString()} đ</td>
                    <td className="p-3 capitalize">{o.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
