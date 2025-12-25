"use client";

import { useEffect, useState } from "react";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";

export default function CartPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const API = process.env.NEXT_PUBLIC_API_URL;

  // ============================================
  // FETCH CART
  // ============================================
  useEffect(() => {
    fetch(`${API}/cart`)
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data.items ?? [];
        setItems(list);
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [API]);

  // ============================================
  // REMOVE ITEM
  // ============================================
  const removeItem = async (id: number) => {
    await fetch(`${API}/cart/${id}`, {
      method: "DELETE",
    });

    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  // ============================================
  // UPDATE QUANTITY
  // ============================================
  const updateQty = async (id: number, quantity: number) => {
    if (quantity < 1) return;

    await fetch(`${API}/cart/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    });

    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  // ============================================
  // CART SUMMARY DATA
  // ============================================
  const summaryItems = items.map((item) => ({
    name: item.title,
    price: item.price * item.quantity,
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
      {/* LEFT: CART ITEMS */}
      <div className="space-y-4 md:col-span-2">
        {items.map((item) => (
          <CartItem
            key={item.id}
            image={item.image}
            title={item.title}
            date={item.date ?? "Chưa chọn ngày"}
            guests={`${item.quantity} khách`}
            price={item.price}
            quantity={item.quantity}
            // 🔥 Thêm event điều khiển
            onRemove={() => removeItem(item.id)}
            onQuantityChange={(qty: number) => updateQty(item.id, qty)}
          />
        ))}
      </div>

      {/* RIGHT: SUMMARY */}
      <CartSummary items={summaryItems} serviceFee={serviceFee} />
    </div>
  );
}
