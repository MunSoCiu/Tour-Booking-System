"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api/client";

function StatusBadge({ status }: { status: string }) {
  const map: any = {
    pending: "bg-yellow-100 text-yellow-700",
    success: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        map[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status.toUpperCase()}
    </span>
  );
}

export default function TripHistory() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    api.get("/orders/my").then((res) => {
      setOrders(Array.isArray(res.data) ? res.data : []);
    });
  }, []);

  return (
    <div className="bg-white border rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-4">Lịch sử tour</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-gray-500">
              <th className="p-3 text-left">Mã đơn</th>
              <th className="p-3 text-left">Ngày đặt</th>
              <th className="p-3 text-right">Tổng tiền</th>
              <th className="p-3 text-center">Trạng thái</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">{o.code}</td>

                <td className="p-3">
                  {new Date(o.createdAt).toLocaleDateString("vi-VN")}
                </td>

                <td className="p-3 text-right font-semibold">
                  {o.total.toLocaleString()} ₫
                </td>

                <td className="p-3 text-center">
                  <StatusBadge status={o.status} />
                </td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td colSpan={4} className="p-6 text-center text-gray-400">
                  Bạn chưa đặt tour nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
