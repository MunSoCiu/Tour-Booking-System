"use client";

import { useEffect, useState } from "react";
import OrderDetailModal from "@/components/admin/orders/OrderDetailModal";
import { fetchAdminOrders, fetchAdminOrderStats } from "@/lib/api/admin";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  useEffect(() => {
    Promise.all([fetchAdminOrders(), fetchAdminOrderStats()]).then(
      ([orders, stats]) => {
        setOrders(Array.isArray(orders) ? orders : []);
        setStats(stats);
      }
    );
  }, []);

  function renderPaymentMethod(method?: string) {
    if (!method) return "—";
    const map: Record<string, string> = {
      momo: "MoMo",
      vnpay: "VNPay",
      bank: "Chuyển khoản",
    };
    return map[method] ?? method;
  }

  function shortTx(id?: string) {
    if (!id) return "—";
    return id.slice(0, 8) + "...";
  }

  if (!stats) return <div>Đang tải...</div>;

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-2xl font-semibold mb-6">Quản lý đơn hàng</h1>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr className="text-gray-600">
              <th className="px-4 py-3 text-left">Mã GD</th>
              <th className="px-4 py-3 text-left">Mã đơn</th>
              <th className="px-4 py-3 text-left">Khách</th>
              <th className="px-4 py-3 text-left">Tour</th>
              <th className="px-4 py-3 text-center">Ngày TT</th>
              <th className="px-4 py-3 text-center">SL</th>
              <th className="px-4 py-3 text-right">Tổng</th>
              <th className="px-4 py-3 text-center">PTTT</th>
              <th className="px-4 py-3 text-center">Trạng thái</th>
              <th className="px-4 py-3 text-center">Thao tác</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {orders.map((o, idx) => {
              const item = o.items?.[0];

              return (
                <tr
                  key={o.id}
                  className={`hover:bg-gray-50 transition ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50/40"
                  }`}
                >
                  {/* MÃ GIAO DỊCH */}
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">
                    <span title={o.paymentId}>
                      {o.paymentId ? o.paymentId.slice(0, 8) + "…" : "—"}
                    </span>
                  </td>

                  {/* MÃ ĐƠN */}
                  <td className="px-4 py-3 font-semibold text-gray-900">
                    {o.code}
                  </td>

                  {/* KHÁCH */}
                  <td className="px-4 py-3">
                    <p className="font-medium">{o.customer}</p>
                    <p className="text-xs text-gray-500">{o.email}</p>
                  </td>

                  {/* TOUR */}
                  <td className="px-4 py-3 max-w-[260px]">
                    <p className="truncate font-medium">
                      {item?.tourTitle ?? "—"}
                    </p>
                  </td>

                  {/* NGÀY THANH TOÁN */}
                  <td className="px-4 py-3 text-center text-gray-600">
                    {o.paymentDate
                      ? new Date(o.paymentDate).toLocaleDateString("vi-VN")
                      : "—"}
                  </td>

                  {/* SỐ LƯỢNG */}
                  <td className="px-4 py-3 text-center">{item?.qty ?? "—"}</td>

                  {/* TỔNG */}
                  <td className="px-4 py-3 text-right font-semibold text-blue-600">
                    {o.total.toLocaleString()} đ
                  </td>

                  {/* PHƯƠNG THỨC */}
                  <td className="px-4 py-3 text-center">
                    <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                      {o.paymentMethod ?? "—"}
                    </span>
                  </td>

                  {/* TRẠNG THÁI */}
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                ${
                  o.paymentStatus === "success"
                    ? "bg-green-100 text-green-700"
                    : o.paymentStatus === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
                    >
                      {o.paymentStatus}
                    </span>
                  </td>

                  {/* ACTION */}
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => setSelectedOrder(o)}
                      className="px-3 py-1.5 rounded-lg border text-sm text-blue-600 hover:bg-blue-50"
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
