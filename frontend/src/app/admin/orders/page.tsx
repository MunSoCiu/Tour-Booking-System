"use client";

import { useEffect, useState } from "react";
<<<<<<< HEAD
import OrderStatusDropdown from "@/components/admin/orders/OrderStatusDropdown";
import OrderDetailModal from "@/components/admin/orders/OrderDetailModal";
=======
import StatCard from "@/components/admin/StatCard";
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
import { fetchAdminOrders, fetchAdminOrderStats } from "@/lib/api/admin";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
<<<<<<< HEAD
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
=======
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0

  useEffect(() => {
    Promise.all([fetchAdminOrders(), fetchAdminOrderStats()]).then(([o, s]) => {
      setOrders(Array.isArray(o?.items) ? o.items : []);
      setStats(s);
    });
  }, []);

<<<<<<< HEAD
  function updateOrderStatus(orderId: string, newStatus: string) {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );

    if (selectedOrder?.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  }

  if (!stats) return <div>Đang tải...</div>;

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-2xl font-semibold mb-6">Quản lý đơn hàng</h1>

      <div className="bg-white rounded-xl shadow p-4">
        <table className="w-full text-base">
          <thead>
            <tr className="border-b text-gray-500">
              <th className="p-4 text-left font-semibold text-gray-600">Mã</th>
              <th className="p-4 text-left font-semibold text-gray-600">
                Khách
              </th>
              <th className="p-4 text-left font-semibold text-gray-600">
                Tour
              </th>
              <th className="p-4 text-center font-semibold text-gray-600">
                Số Lượng Người
              </th>
              <th className="p-4 text-right font-semibold text-gray-600">
                Giá
              </th>
              <th className="p-4 text-right font-semibold text-gray-600">
                Tổng
              </th>
              <th className="p-4 text-center font-semibold text-gray-600">
                Trạng thái
              </th>
              <th className="p-4 text-center font-semibold text-gray-600">
                Thao tác
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => {
              const item = o.items[0];

              return (
                <tr key={o.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{o.code}</td>
                  <td className="p-4 text-gray-800">{o.user?.fullName}</td>
                  <td className="p-3 truncate max-w-[220px]">
                    {item.tourTitle}
                  </td>
                  <td className="p-3 text-center">{item.qty}</td>
                  <td className="p-3 text-right">
                    {item.price.toLocaleString()} đ
                    {item.discount > 0 && (
                      <span className="ml-2 text-sm text-green-600 font-semibold">
                        -{item.discount}%
                      </span>
                    )}
                  </td>

                  <td className="p-3 text-right font-semibold">
                    {(item.finalPrice * item.qty).toLocaleString()} đ
                  </td>
                  <td className="p-3 text-center">
                    <OrderStatusDropdown
                      order={o}
                      onUpdated={updateOrderStatus}
                    />
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => setSelectedOrder(o)}
                      className="text-blue-600 font-semibold hover:underline text-base"
                    >
                      Xem
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
=======
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
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
    </div>
  );
}
