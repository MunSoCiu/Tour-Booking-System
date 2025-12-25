"use client";

import { useState } from "react";
import api from "@/lib/api/client";

export default function TourModal({
  onClose,
  refresh,
}: {
  onClose: () => void;
  refresh: () => void;
}) {
  const [form, setForm] = useState({
    title: "",
    price: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    try {
      setLoading(true);

      await api.post("/tours", {
        title: form.title,
        price: Number(form.price),
        image: form.image,
      });

      refresh(); // Reload table
      onClose(); // Close modal
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Error creating tour");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-[450px] shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Thêm tour mới</h2>

        <div className="space-y-3">
          <input
            className="w-full border p-3 rounded-lg"
            placeholder="Tên tour"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            className="w-full border p-3 rounded-lg"
            placeholder="Giá"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          <input
            className="w-full border p-3 rounded-lg"
            placeholder="Ảnh (URL)"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button className="px-4 py-2" onClick={onClose}>
            Hủy
          </button>

          <button
            disabled={loading}
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Đang lưu..." : "Lưu"}
          </button>
        </div>
      </div>
    </div>
  );
}
