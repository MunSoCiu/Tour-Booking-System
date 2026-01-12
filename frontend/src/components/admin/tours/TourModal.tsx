"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api/client";

export default function TourModal({
  tour,
  onClose,
  refresh,
}: {
  tour?: any;
  onClose: () => void;
  refresh: () => void;
}) {
  const [form, setForm] = useState({
    title: "",
    price: "",
    image: "",
  });

  const [mode, setMode] = useState<"url" | "upload">("url");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (tour) {
      setForm({
        title: tour.title ?? "",
        price: tour.price?.toString() ?? "",
        image: tour.image ?? "",
      });
      setMode(tour.image?.startsWith("http") ? "url" : "upload");
    }
  }, [tour]);

  async function handleSubmit() {
    try {
      setLoading(true);

      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("price", form.price);

      if (mode === "upload" && file) {
        fd.append("image", file);
      }

      if (mode === "url") {
        fd.append("image", form.image);
      }

      if (tour) {
        await api.put(`/admin/tours/${tour.id}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/admin/tours", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      refresh();
      onClose();
    } catch (err: any) {
      alert(err.response?.data?.message || "Lỗi lưu tour");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-[480px] shadow-xl">
        <h2 className="text-xl font-semibold mb-4">
          {tour ? "Chỉnh sửa tour" : "Thêm tour"}
        </h2>

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

          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={mode === "url"}
                onChange={() => setMode("url")}
              />
              Link ảnh
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={mode === "upload"}
                onChange={() => setMode("upload")}
              />
              Upload ảnh
            </label>
          </div>

          {mode === "url" && (
            <input
              className="w-full border p-3 rounded-lg"
              placeholder="https://..."
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />
          )}

          {mode === "upload" && (
            <input
              type="file"
              accept="C:\MunCompany/Tour-Booking-System/backend/uploads/tours/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          )}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose}>Hủy</button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            {loading ? "Đang lưu..." : "Lưu"}
          </button>
        </div>
      </div>
    </div>
  );
}
