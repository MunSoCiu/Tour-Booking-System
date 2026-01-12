"use client";

import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function BookingSuccessPage() {
  const params = useSearchParams();
  const code = params.get("code");

  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!code) return;

    fetch(`${API}/orders/bookings/success?code=${code}`)
      .then((r) => {
        if (!r.ok) throw new Error("Không tìm thấy đơn hàng");
        return r.json();
      })
      .then(setData)
      .catch((e) => setError(e.message));
  }, [code]);

  /* ================= ERROR ================= */
  if (error) {
    return (
      <div className="py-20 text-center text-red-600 font-medium">{error}</div>
    );
  }

  /* ================= LOADING ================= */
  if (!data?.order) {
    return <div className="py-20 text-center">Đang tải…</div>;
  }

  const order = data.order;
  const item = data.items?.[0];

  /* ================= SUCCESS ================= */

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      {/* ===== SUCCESS HEADER ===== */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-10 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
        <h1 className="text-2xl font-bold mt-4">Đặt tour thành công!</h1>
        <p className="text-gray-600 mt-2">
          Cảm ơn bạn đã tin tưởng dịch vụ của chúng tôi.
        </p>

        <p className="mt-6 text-gray-500">Mã đặt chỗ</p>
        <p className="text-2xl font-bold text-blue-600">#{order.code}</p>
      </div>

      {/* ===== ORDER DETAILS ===== */}
      {item && (
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-8 mt-10">
          <h2 className="font-semibold text-lg mb-4">Chi tiết đặt tour</h2>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <Info label="Tên tour" value={item.tourTitle} />
            <Info label="Ngày đi" value={item.date || "—"} />
            <Info label="Số lượng" value={`${item.qty} người`} />
            <Info
              label="Tổng cộng"
              value={`${order.total.toLocaleString("vi-VN")} đ`}
              highlight
            />
          </div>
        </div>
      )}

      {/* ===== ACTIONS ===== */}
      <div className="max-w-3xl mx-auto flex gap-4 mt-10 justify-center">
        <Link
          href="/my-orders"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Xem đơn hàng
        </Link>

        <Link
          href="/"
          className="border px-6 py-3 rounded-lg hover:bg-gray-100"
        >
          Về trang chủ
        </Link>
      </div>
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
      <p className="text-gray-500">{label}</p>
      <p className={`font-semibold ${highlight ? "text-blue-600" : ""}`}>
        {value}
      </p>
    </div>
  );
}
