"use client";

<<<<<<< HEAD
import { formatPrice } from "@/lib/utils/formatPrice";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { useState } from "react";
import { authFetch } from "@/lib/api/authFetch";
=======
import { useState, useEffect } from "react";
import { formatPrice } from "@/lib/utils/formatPrice";
import { useRouter } from "next/navigation";
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0

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
<<<<<<< HEAD
  const { user } = useAuth();
  const router = useRouter();
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const isLoggedIn = !!user;

  const serviceFee = 500_000;
  const total = tour.price * guests + serviceFee;

  /* =========================
      LOGIN REQUIRED
  ========================= */
=======
  const router = useRouter();
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const serviceFee = 500000;
  const total = tour.price * guests + serviceFee;

  /* =====================================================
     CHECK LOGIN STATE
  ===================================================== */
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  /* =====================================================
     HANDLE "NEED LOGIN"
  ===================================================== */
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
  const requireLogin = () => {
    setShowLoginPopup(true);
  };

  const goToLogin = () => {
<<<<<<< HEAD
    const redirect = window.location.pathname;
    router.push(`/login?redirect=${redirect}`);
  };

  /* =========================
      ADD TO CART
  ========================= */
=======
    const redirect = window.location.pathname; // trang hiện tại
    router.push(`/login?redirect=${redirect}`);
  };

  /* =====================================================
     HANDLE ADD TO CART (If Logged In)
  ===================================================== */
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
  const addToCart = async () => {
    if (!isLoggedIn) return requireLogin();

    try {
<<<<<<< HEAD
      const res = await authFetch(`${apiUrl}/cart`, {
        method: "POST",
=======
      const token = localStorage.getItem("accessToken");

      const res = await fetch(`${apiUrl}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
        body: JSON.stringify({
          tourId: tour.id,
          qty: guests,
        }),
      });

<<<<<<< HEAD
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
  const checkout = async () => {
    if (!isLoggedIn) return requireLogin();

    if (!date) {
      alert("Vui lòng chọn ngày khởi hành");
      return;
    }

    const res = await authFetch(`${apiUrl}/orders`, {
      method: "POST",
      body: JSON.stringify({
        items: [{ tourId: tour.id, qty: guests }],
      }),
    });

    if (!res.ok) {
      alert("Đặt tour thất bại");
      return;
    }

    const order = await res.json();
    router.push(`/orders?created=${order.code}`);
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
=======
      if (!res.ok) throw new Error("Add to cart failed");

      alert("Thêm giỏ hàng thành công!");
    } catch (err) {
      alert("Lỗi thêm giỏ hàng");
      console.error(err);
    }
  };

  /* =====================================================
     HANDLE CHECKOUT (If Logged In)
  ===================================================== */
  const checkout = async () => {
    if (!isLoggedIn) return requireLogin();

    try {
      const token = localStorage.getItem("accessToken");

      const res = await fetch(`${apiUrl}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: [{ tourId: tour.id, qty: guests, price: tour.price }],
          total,
          date,
        }),
      });

      if (!res.ok) throw new Error("Checkout failed");

      const order = await res.json();
      alert("Đặt tour thành công! Mã đơn: " + order.id);
    } catch (err) {
      alert("Đặt tour thất bại");
      console.error(err);
    }
  };

  return (
    <div
      id="book"
      className="bg-white p-6 rounded-2xl shadow-lg h-max sticky top-24 border border-gray-200 relative"
    >
      {/* PRICE */}
      <div className="text-sm text-gray-500">Giá từ</div>
      <div className="text-4xl font-bold text-blue-600 mt-2">
        {formatPrice(tour.price)}đ
      </div>
      <div className="text-xs text-gray-500 mt-1">/khách</div>

      {/* FORM */}
      <div className="mt-5 space-y-4">
        {/* DATE */}
        <div>
          <label className="text-sm text-gray-600">Ngày khởi hành</label>
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
<<<<<<< HEAD
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>

        <div>
          <label className="text-sm">Số lượng khách</label>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full border px-3 py-2 rounded-lg"
=======
            className="w-full border px-3 py-2 rounded-lg mt-1"
          />
        </div>

        {/* GUESTS */}
        <div>
          <label className="text-sm text-gray-600">Số lượng khách</label>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full border px-3 py-2 rounded-lg mt-1"
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
          >
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n} người lớn
              </option>
            ))}
          </select>
        </div>

<<<<<<< HEAD
        <div className="border-t pt-4 text-gray-700">
=======
        {/* SUMMARY */}
        <div className="border-t pt-4 space-y-2 text-gray-700">
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
          <div className="flex justify-between">
            <span>Giá tour</span>
            <span>{formatPrice(tour.price * guests)}đ</span>
          </div>
          <div className="flex justify-between">
            <span>Phí dịch vụ</span>
            <span>{formatPrice(serviceFee)}đ</span>
          </div>
          <div className="flex justify-between font-bold text-xl">
<<<<<<< HEAD
            <span>Tổng</span>
=======
            <span>Tổng cộng</span>
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
            <span className="text-blue-600">{formatPrice(total)}đ</span>
          </div>
        </div>

<<<<<<< HEAD
        <button
          onClick={checkout}
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
=======
        {/* ACTION BUTTONS */}
        <button
          onClick={checkout}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700"
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
        >
          Đặt tour ngay
        </button>

<<<<<<< HEAD
        <button onClick={addToCart} className="w-full border py-3 rounded-lg">
=======
        <button
          onClick={addToCart}
          className="w-full border py-3 rounded-lg text-gray-700 hover:bg-gray-50"
        >
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
          Thêm vào giỏ
        </button>
      </div>

<<<<<<< HEAD
      {/* LOGIN POPUP */}
      {showLoginPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-80 text-center space-y-4">
            <h3 className="text-xl font-bold">Bạn chưa đăng nhập</h3>
            <p className="text-gray-600">Vui lòng đăng nhập để tiếp tục.</p>

            <button
              onClick={goToLogin}
              className="w-full bg-blue-600 text-white py-2 rounded-lg"
=======
      {/* ============================== */}
      {/* BEAUTIFUL LOGIN POPUP */}
      {/* ============================== */}
      {showLoginPopup && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[2000] animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-sm shadow-xl animate-scaleIn text-center space-y-4">
            <h3 className="text-xl font-bold">Bạn chưa đăng nhập</h3>
            <p className="text-gray-600">
              Hãy đăng nhập để đặt tour hoặc thêm vào giỏ hàng.
            </p>

            <button
              onClick={goToLogin}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700"
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
            >
              Đăng nhập
            </button>

            <button
              onClick={() => setShowLoginPopup(false)}
<<<<<<< HEAD
              className="w-full border py-2 rounded-lg"
=======
              className="w-full border py-2 rounded-lg text-gray-700 hover:bg-gray-100"
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
            >
              Hủy
            </button>
          </div>
        </div>
      )}
<<<<<<< HEAD
=======

      {/* POPUP ANIM CSS */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.25s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.85);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
    </div>
  );
}
