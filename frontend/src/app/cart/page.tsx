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

  /* ================= FETCH CART ================= */
  useEffect(() => {
    authFetch("/cart")
      .then((res) => res.json())
      .then((data) => {
        setItems(
          Array.isArray(data)
            ? data.map((i) => ({ ...i, selected: true })) // mặc định chọn
            : []
        );
      })
      .finally(() => setLoading(false));
  }, []);

  /* ================= SELECT (FE ONLY) ================= */
  const toggleSelect = (id: string, selected: boolean) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, selected } : i)));
  };

  /* ================= REMOVE ================= */
  const removeItem = async (id: string) => {
    const ok = confirm("❗ Bạn có chắc chắn muốn xoá tour này khỏi giỏ hàng?");
    if (!ok) return;

    await authFetch(`/cart/${id}`, { method: "DELETE" });

    setItems((prev) => prev.filter((i) => i.id !== id));
    alert("🗑️ Đã xoá tour khỏi giỏ hàng");
  };

  /* ================= UPDATE QTY ================= */
  const updateQty = async (id: string, qty: number) => {
    await authFetch(`/cart/${id}`, {
      method: "PUT",
      body: JSON.stringify({ qty }),
    });

    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  };

  /* ================= PAY ================= */
  const selectedItems = items.filter((i) => i.selected);

  const handlePay = async () => {
    if (selectedItems.length === 0) {
      alert("Vui lòng chọn tour để thanh toán");
      return;
    }

    try {
      await authFetch("/orders/from-cart", {
        method: "POST",
        body: JSON.stringify({
          cartItemIds: selectedItems.map((i) => i.id),
        }),
      });

      alert("🎉 Đặt tour thành công!");
      router.push("/my-orders"); // ✅ CHUYỂN ĐÚNG TRANG
    } catch (err: any) {
      alert(err.message || "Thanh toán thất bại");
    }
  };

  if (loading) return <div className="py-20 text-center">Đang tải…</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Giỏ Hàng Của Bạn</h1>
      <p className="text-gray-500 mb-8">
        Bạn có {items.length} tour trong giỏ hàng.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              image={item.tour.image}
              title={item.tour.title}
              date={item.date}
              guests={`${item.qty} người`}
              price={item.tour.price}
              quantity={item.qty}
              selected={item.selected}
              onSelect={(v) => toggleSelect(item.id, v)}
              onQuantityChange={(q) => updateQty(item.id, q)}
              onRemove={() => removeItem(item.id)}
            />
          ))}
        </div>

        {/* RIGHT */}
        <CartSummary
          items={selectedItems.map((i) => ({
            name: i.tour.title,
            price: i.tour.price * i.qty,
          }))}
          serviceFee={0}
          onPay={handlePay}
        />
      </div>
    </div>
  );
}
