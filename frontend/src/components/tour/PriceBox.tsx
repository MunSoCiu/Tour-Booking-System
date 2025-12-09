"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/utils/formatPrice";

export default function PriceBox({
  tour,
  date,
  setDate,
  guests,
  setGuests,
  apiUrl,
}: {
  tour: any;
  date: string;
  setDate: (d: string) => void;
  guests: number;
  setGuests: (n: number) => void;
  apiUrl: string;
}) {
  const [loading, setLoading] = useState(false);
  const serviceFee = 500000;

  const total = tour.price * guests + serviceFee;

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      await fetch(`${apiUrl}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: 2, tourId: tour.id, qty: guests }), // thay userId động nếu có auth
      });
      alert("Đã thêm vào giỏ hàng");
    } catch (err) {
      console.error(err);
      alert("Lỗi khi thêm giỏ hàng");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const orderRes = await fetch(`${apiUrl}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: 2,
          items: [{ tourId: tour.id, qty: guests, price: tour.price }],
          total,
          date,
        }),
      });
      if (!orderRes.ok) throw new Error("order fail");
      const order = await orderRes.json();
      // redirect to payment / order page nếu cần
      alert("Tạo đơn hàng thành công: " + (order.code ?? order.id));
    } catch (err) {
      console.error(err);
      alert("Tạo đơn hàng thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="book"
      className="bg-white p-5 rounded-xl shadow-sm h-max sticky top-20"
    >
      <div className="text-sm text-gray-500">Giá từ</div>
      <div className="text-3xl font-bold text-blue-600 mt-2">
        {formatPrice(tour.price)}đ
      </div>
      <div className="text-xs text-gray-500 mt-1">/khách</div>

      <div className="mt-4 space-y-3">
        <div>
          <label className="text-sm text-gray-600">Ngày khởi hành</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg mt-1"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Số lượng khách</label>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full border px-3 py-2 rounded-lg mt-1"
          >
            <option value={1}>1 người lớn</option>
            <option value={2}>2 người lớn</option>
            <option value={3}>3 người lớn</option>
            <option value={4}>4 người lớn</option>
          </select>
        </div>

        <div className="border-t pt-3 mt-3 text-gray-700 space-y-2">
          <div className="flex justify-between">
            <span>Giá tour</span>
            <span>{formatPrice(tour.price * guests)}đ</span>
          </div>
          <div className="flex justify-between">
            <span>Phí dịch vụ</span>
            <span>{formatPrice(serviceFee)}đ</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Tổng cộng</span>
            <span className="text-blue-600">{formatPrice(total)}đ</span>
          </div>
        </div>

        <button
          disabled={loading}
          onClick={handleCheckout}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700"
        >
          {loading ? "Đang xử lý..." : "Đặt tour ngay"}
        </button>

        <button
          disabled={loading}
          onClick={handleAddToCart}
          className="w-full border py-3 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
}
