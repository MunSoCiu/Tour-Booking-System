"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api/client";

export default function TripHistory() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    api.get("/orders/my").then((res) => setOrders(res.data));
  }, []);

  return (
    <div className="bg-white border rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-4">Lịch sử tour</h3>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-gray-500">
            <th>Mã</th>
            <th>Tổng</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-b">
              <td>{o.code}</td>
              <td>{o.total.toLocaleString()} ₫</td>
              <td>{o.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
