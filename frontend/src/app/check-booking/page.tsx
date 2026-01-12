"use client";

import { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function CheckBookingPage() {
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function handleCheck() {
    if (!code || !email) {
      alert("Vui lòng nhập mã đặt chỗ và email");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API}/orders/bookings/check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, email }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Không tìm thấy đơn hàng");
      }

      const data = await res.json();
      setResult(data);
    } catch (e: any) {
      alert(e.message);
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  const order = result?.order;
  const item = order?.items?.[0];

  return (
    <div className="bg-white min-h-screen pt-10 pb-20 px-4">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold">Kiểm tra thông tin đặt tour</h1>
        <p className="text-gray-600 mt-2">
          Nhập <b>mã đặt chỗ (VD: ORD-123456)</b> và email để xem chi tiết.
        </p>

        <div className="flex flex-col md:flex-row gap-3 mt-8">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Mã đặt chỗ (ORD-xxxxxx)"
            className="flex-1 border rounded-xl px-4 py-3"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email đặt tour"
            className="flex-1 border rounded-xl px-4 py-3"
          />
          <button
            onClick={handleCheck}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl"
          >
            {loading ? "Đang kiểm tra..." : "Kiểm tra"}
          </button>
        </div>
      </div>

      {order && (
        <div className="max-w-3xl mx-auto mt-12 border rounded-2xl shadow-sm">
          <div className="flex justify-between px-6 py-4 border-b">
            <h2 className="font-semibold text-lg">Chi tiết đặt tour</h2>
            <span className="px-4 py-1 rounded-full text-sm bg-green-100 text-green-700">
              {order.status === "confirmed" ? "Đã xác nhận" : "Chờ thanh toán"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 py-8">
            <Info label="Mã đặt chỗ" value={order.code} />
            <Info label="Người đặt" value={order.user.fullName} />
            <Info label="Tên tour" value={item.tourTitle} />
            <Info label="Ngày đi" value={item.date || "—"} />
            <Info label="Số lượng" value={`${item.qty} người`} />
            <Info
              label="Tổng tiền"
              value={`${order.total.toLocaleString("vi-VN")} đ`}
              highlight
            />
          </div>
        </div>
      )}
    </div>
  );
}

function Info({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className={`font-semibold ${highlight ? "text-blue-600" : ""}`}>
        {value}
      </p>
    </div>
  );
}
