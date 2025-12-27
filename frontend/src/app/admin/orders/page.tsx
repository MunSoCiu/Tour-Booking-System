"use client";

import { useEffect, useState } from "react";
import OrderStatusDropdown from "@/components/admin/orders/OrderStatusDropdown";
import OrderDetailModal from "@/components/admin/orders/OrderDetailModal";
import { fetchAdminOrders, fetchAdminOrderStats } from "@/lib/api/admin";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  useEffect(() => {
    Promise.all([fetchAdminOrders(), fetchAdminOrderStats()]).then(([o, s]) => {
      setOrders(Array.isArray(o?.items) ? o.items : []);
      setStats(s);
    });
  }, []);

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
    </div>
  );
}
