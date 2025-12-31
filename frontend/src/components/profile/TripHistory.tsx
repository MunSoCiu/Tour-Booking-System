<<<<<<< HEAD
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
=======
function StatusBadge({ status }: { status: string }) {
  const colors: any = {
    "Hoàn thành": "bg-green-100 text-green-600",
    "Đã xác nhận": "bg-blue-100 text-blue-600",
    "Đã hủy": "bg-red-100 text-red-600",
  };
  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${colors[status]}`}
    >
      {status}
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
    </span>
  );
}

export default function TripHistory() {
<<<<<<< HEAD
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    api.get("/orders/my").then((res) => {
      setOrders(res.data.items ?? []);
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
=======
  const trips = [
    {
      title: "Khám phá Vịnh Hạ Long 2N1Đ",
      date: "15/08/2023",
      guests: 2,
      status: "Hoàn thành",
    },
    {
      title: "Tour Đà Nẵng – Hội An",
      date: "20/05/2023",
      guests: 4,
      status: "Hoàn thành",
    },
    {
      title: "Chinh phục Fansipan",
      date: "10/01/2024",
      guests: 1,
      status: "Đã xác nhận",
    },
    {
      title: "Du lịch Phú Quốc 3N2Đ",
      date: "01/12/2022",
      guests: 2,
      status: "Đã hủy",
    },
  ];

  return (
    <div className="bg-white border shadow-sm rounded-xl p-6">
      <h3 className="text-xl font-semibold">Lịch sử chuyến đi của bạn</h3>
      <p className="text-gray-500 text-sm">
        Xem lại các chuyến đi đã đặt và quản lý đơn hàng.
      </p>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="py-2">TÊN TOUR</th>
              <th className="py-2">NGÀY ĐI</th>
              <th className="py-2">SỐ KHÁCH</th>
              <th className="py-2">TRẠNG THÁI</th>
              <th className="py-2">HÀNH ĐỘNG</th>
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
            </tr>
          </thead>

          <tbody>
<<<<<<< HEAD
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
=======
            {trips.map((t, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="py-3">{t.title}</td>
                <td className="py-3">{t.date}</td>
                <td className="py-3">{t.guests}</td>
                <td className="py-3">
                  <StatusBadge status={t.status} />
                </td>
                <td className="py-3 text-blue-600 cursor-pointer hover:underline">
                  Xem chi tiết
                </td>
              </tr>
            ))}
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
          </tbody>
        </table>
      </div>
    </div>
  );
}
