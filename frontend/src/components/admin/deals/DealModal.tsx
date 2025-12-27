"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api/client";

export default function DealModal({
  tour,
  onClose,
  onSaved,
}: {
  tour: any;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<{
    dealType: string;
    discount: number;
    dealEnd: string;
  }>({
    dealType: "",
    discount: 10,
    dealEnd: "",
  });

  useEffect(() => {
    if (tour) {
      setForm({
        dealType: tour.dealType || "",
        discount: tour.discount ?? 10,
        dealEnd: tour.dealEnd?.slice(0, 10) || "",
      });
    }
  }, [tour]);

  async function saveDeal() {
    await api.put(`/admin/tours/${tour.id}/deal`, {
      dealType: form.dealType,
      discount: form.discount,
      dealEnd: form.dealEnd || null,
    });

    onSaved();
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[420px] p-6 rounded-xl shadow-xl">
        <h2 className="text-xl font-semibold mb-4">
          Ưu đãi cho tour: {tour.title}
        </h2>

        <div className="space-y-3">
          <input
            className="w-full border p-3 rounded-lg"
            placeholder="Tên ưu đãi (VD: Summer Sale)"
            value={form.dealType}
            onChange={(e) => setForm({ ...form, dealType: e.target.value })}
          />

          <input
            type="number"
            min={1}
            max={90}
            className="w-full border p-3 rounded-lg"
            placeholder="Giảm (%)"
            value={form.discount}
            onChange={(e) =>
              setForm({ ...form, discount: Number(e.target.value) })
            }
          />

          <input
            type="date"
            className="w-full border p-3 rounded-lg"
            value={form.dealEnd}
            onChange={(e) => setForm({ ...form, dealEnd: e.target.value })}
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose}>Huỷ</button>
          <button
            onClick={saveDeal}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Lưu ưu đãi
          </button>
        </div>
      </div>
    </div>
  );
}
