"use client";

import { useEffect, useState } from "react";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import { authFetch } from "@/lib/api/authFetch";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    authFetch(`${API}/cart`)
      .then((res) => res.json())
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  const toggleSelect = async (id: string, selected: boolean) => {
    await authFetch(`${API}/cart/${id}/select`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ selected }),
    });

    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, selected } : i)));
  };

  const removeItem = async (id: string) => {
    await authFetch(`${API}/cart/${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQty = async (id: string, qty: number) => {
    await authFetch(`${API}/cart/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: qty }),
    });

    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  };

  const selectedItems = items.filter((i) => i.selected);

  const handlePay = async () => {
    if (selectedItems.length === 0) {
      alert("Vui lòng chọn tour để thanh toán");
      return;
    }

    await authFetch(`${API}/orders/from-cart`, { method: "POST" });
    router.push("/my-orders");
  };

  if (loading) return <div className="py-20 text-center">Đang tải…</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="space-y-4 md:col-span-2">
        {items.map((item) => (
          <CartItem
            key={item.id}
            id={item.id}
            image={item.tour.image}
            title={item.tour.title}
            date="Chưa chọn ngày"
            guests={`${item.qty} khách`}
            price={item.tour.price}
            quantity={item.qty}
            selected={item.selected}
            onSelect={(v) => toggleSelect(item.id, v)}
            onQuantityChange={(q) => updateQty(item.id, q)}
            onRemove={() => removeItem(item.id)}
          />
        ))}
      </div>

      <CartSummary
        items={selectedItems.map((i) => ({
          name: i.tour.title,
          price: i.tour.price * i.qty,
        }))}
        serviceFee={15000}
        onPay={handlePay}
      />
    </div>
  );
}
