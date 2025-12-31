"use client";

import { useEffect, useState } from "react";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
<<<<<<< HEAD
import { authFetch } from "@/lib/api/authFetch";
=======
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0

export default function CartPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const API = process.env.NEXT_PUBLIC_API_URL;

  // ============================================
  // FETCH CART
  // ============================================
  useEffect(() => {
<<<<<<< HEAD
    authFetch(`${API}/cart`)
      .then((res) => res.json())
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);
=======
    fetch(`${API}/api/cart`)
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data.items ?? [];
        setItems(list);
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [API]);
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0

  // ============================================
  // REMOVE ITEM
  // ============================================
  const removeItem = async (id: number) => {
<<<<<<< HEAD
    await authFetch(`${API}/cart/${id}`, { method: "DELETE" });
=======
    await fetch(`${API}/api/cart/${id}`, {
      method: "DELETE",
    });

>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  // ============================================
  // UPDATE QUANTITY
  // ============================================
  const updateQty = async (id: number, quantity: number) => {
<<<<<<< HEAD
    await fetch(`${API}/cart/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ qty: quantity }),
=======
    if (quantity < 1) return;

    await fetch(`${API}/api/cart/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
    });

    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  // ============================================
  // CART SUMMARY DATA
  // ============================================
  const summaryItems = items.map((item) => ({
<<<<<<< HEAD
    name: item.tour.title,
    price: item.tour.price * item.qty,
=======
    name: item.title,
    price: item.price * item.quantity,
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
  }));

  const serviceFee = 15000; // 15k phí dịch vụ demo

  // ============================================
  // RENDER UI
  // ============================================

  if (loading)
    return (
      <div className="text-center py-20 text-gray-500">Đang tải giỏ hàng…</div>
    );

  if (items.length === 0)
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Giỏ hàng của bạn đang trống.
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
<<<<<<< HEAD
=======
      {/* LEFT: CART ITEMS */}
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
      <div className="space-y-4 md:col-span-2">
        {items.map((item) => (
          <CartItem
            key={item.id}
<<<<<<< HEAD
            image={item.tour.image}
            title={item.tour.title}
            date="Chưa chọn ngày"
            guests={`${item.qty} khách`}
            price={item.tour.price}
            quantity={item.qty}
            onRemove={() => removeItem(item.id)}
            onQuantityChange={(qty) => updateQty(item.id, qty)}
=======
            image={item.image}
            title={item.title}
            date={item.date ?? "Chưa chọn ngày"}
            guests={`${item.quantity} khách`}
            price={item.price}
            quantity={item.quantity}
            // 🔥 Thêm event điều khiển
            onRemove={() => removeItem(item.id)}
            onQuantityChange={(qty: number) => updateQty(item.id, qty)}
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
          />
        ))}
      </div>

<<<<<<< HEAD
=======
      {/* RIGHT: SUMMARY */}
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
      <CartSummary items={summaryItems} serviceFee={serviceFee} />
    </div>
  );
}
