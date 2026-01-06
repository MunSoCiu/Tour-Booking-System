"use client";

import { formatPrice } from "@/lib/utils/formatPrice";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { useState } from "react";
import { authFetch } from "@/lib/api/authFetch";

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
  const { user } = useAuth();
  const router = useRouter();
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const isLoggedIn = !!user;

  const serviceFee = 500_000;
  const total = tour.price * guests + serviceFee;

  /* =========================
      LOGIN REQUIRED
  ========================= */
  const requireLogin = () => {
    setShowLoginPopup(true);
  };

  const goToLogin = () => {
    const redirect = window.location.pathname;
    router.push(`/login?redirect=${redirect}`);
  };

  /* =========================
      ADD TO CART
  ========================= */
  const addToCart = async () => {
    if (!isLoggedIn) return requireLogin();

    try {
      const res = await authFetch(`${apiUrl}/cart`, {
        method: "POST",
        body: JSON.stringify({
          tourId: tour.id,
          qty: guests,
        }),
      });

      if (!res.ok) throw new Error();
      router.push("/cart");
      alert("Thêm giỏ hàng thành công!");
    } catch {
      alert("Lỗi thêm giỏ hàng");
    }
  };

  /* =========================
      CHECKOUT
  ========================= */
  /* =========================
    DIRECT ORDER (ĐẶT TOUR NGAY)
========================= */
  const checkout = async () => {
    if (!isLoggedIn) return requireLogin();

    if (!date) {
      alert("Vui lòng chọn ngày khởi hành");
      return;
    }

    try {
      const res = await authFetch(`${apiUrl}/orders/direct`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tourId: tour.id,
          qty: guests,
          date,
        }),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
      }

      // ✅ ĐẶT TOUR THÀNH CÔNG → MY ORDERS
      router.push("/my-orders");
    } catch (e) {
      alert("Đặt tour thất bại, vui lòng thử lại");
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg sticky top-24 border">
      {/* PRICE */}
      <div className="text-sm text-gray-500">Giá từ</div>
      <div className="text-4xl font-bold text-blue-600">
        {formatPrice(tour.price)}đ
      </div>
      <div className="text-xs text-gray-500">/khách</div>

      {/* FORM */}
      <div className="mt-5 space-y-4">
        <div>
          <label className="text-sm">Ngày khởi hành</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>

        <div>
          <label className="text-sm">Số lượng khách</label>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full border px-3 py-2 rounded-lg"
          >
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n} người lớn
              </option>
            ))}
          </select>
        </div>

        <div className="border-t pt-4 text-gray-700">
          <div className="flex justify-between">
            <span>Giá tour</span>
            <span>{formatPrice(tour.price * guests)}đ</span>
          </div>
          <div className="flex justify-between">
            <span>Phí dịch vụ</span>
            <span>{formatPrice(serviceFee)}đ</span>
          </div>
          <div className="flex justify-between font-bold text-xl">
            <span>Tổng</span>
            <span className="text-blue-600">{formatPrice(total)}đ</span>
          </div>
        </div>

        <button
          onClick={checkout}
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
        >
          Đặt tour ngay
        </button>

        <button onClick={addToCart} className="w-full border py-3 rounded-lg">
          Thêm vào giỏ
        </button>
      </div>

      {/* LOGIN POPUP */}
      {showLoginPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-80 text-center space-y-4">
            <h3 className="text-xl font-bold">Bạn chưa đăng nhập</h3>
            <p className="text-gray-600">Vui lòng đăng nhập để tiếp tục.</p>

            <button
              onClick={goToLogin}
              className="w-full bg-blue-600 text-white py-2 rounded-lg"
            >
              Đăng nhập
            </button>

            <button
              onClick={() => setShowLoginPopup(false)}
              className="w-full border py-2 rounded-lg"
            >
              Hủy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
