"use client";

import { useEffect, useState } from "react";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import { authFetch } from "@/lib/api/authFetch";

export default function CartPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const API = process.env.NEXT_PUBLIC_API_URL;

  // ============================================
  // FETCH CART
  // ============================================
  useEffect(() => {
    authFetch(`${API}/cart`)
      .then((res) => res.json())
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  // ============================================
  // REMOVE ITEM
  // ============================================
  const removeItem = async (id: number) => {
    await authFetch(`${API}/cart/${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  // ============================================
  // UPDATE QUANTITY
  // ============================================
  const updateQty = async (id: number, quantity: number) => {
    await fetch(`${API}/cart/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ qty: quantity }),
    });

    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  // ============================================
  // CART SUMMARY DATA
  // ============================================
  const summaryItems = items.map((item) => ({
    name: item.tour.title,
    price: item.tour.price * item.qty,
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
      <div className="space-y-4 md:col-span-2">
        {items.map((item) => (
          <CartItem
            key={item.id}
            image={item.tour.image}
            title={item.tour.title}
            date="Chưa chọn ngày"
            guests={`${item.qty} khách`}
            price={item.tour.price}
            quantity={item.qty}
            onRemove={() => removeItem(item.id)}
            onQuantityChange={(qty) => updateQty(item.id, qty)}
          />
        ))}
      </div>

      <CartSummary items={summaryItems} serviceFee={serviceFee} />
    </div>
  );
}
