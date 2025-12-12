"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api/client";
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />

        <div className="p-6">
          <h1 className="text-2xl font-semibold mb-6">Quản lý đơn hàng</h1>

          <div className="bg-white p-4 rounded-xl shadow">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="p-3">Mã đơn</th>
                  <th className="p-3">Khách hàng</th>
                  <th className="p-3">Tổng tiền</th>
                  <th className="p-3">Trạng thái</th>
                  <th className="p-3 text-right">Hành động</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{o.code}</td>
                    <td className="p-3">{o.user?.fullName}</td>
                    <td className="p-3">{o.total.toLocaleString()} đ</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 text-sm rounded ${
                          o.status === "success"
                            ? "bg-green-100 text-green-600"
                            : o.status === "pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button className="text-blue-600 mr-4">Xem</button>
                      <button className="text-red-600">Xóa</button>
                    </td>
                  </tr>
                ))}

                {orders.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-3 text-center text-gray-400">
                      Không có đơn hàng
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
