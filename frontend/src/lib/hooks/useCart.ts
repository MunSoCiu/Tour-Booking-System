// frontend/src/lib/useCart.ts
import { useState, useEffect } from "react";
import api from "@/lib/api/client";
import Cookies from "js-cookie";

export function useCart(userId?: string) {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => {
    if (!userId) return;
    api.get(`/api/cart/user/${userId}`).then((r) => setItems(r.data));
  }, [userId]);

  function addToCart(payload: { userId: string; tourId: string; qty: number }) {
    return api.post("/api/cart", payload).then((r) => {
      setItems((prev) => [...prev, r.data]);
      return r.data;
    });
  }

  function updateQty(id: string, qty: number) {
    return api.put(`/api/cart/${id}`, { qty }).then(() => {
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
    });
  }

  function remove(id: string) {
    return api
      .delete(`/api/cart/${id}`)
      .then(() => setItems((prev) => prev.filter((i) => i.id !== id)));
  }

  return { items, setItems, addToCart, updateQty, remove };
}
