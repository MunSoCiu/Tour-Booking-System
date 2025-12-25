"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api/client";
import { useAuth } from "@/lib/hooks/useAuth";

export default function ProfileEditForm({ onDone }: { onDone: () => void }) {
  const { user, refreshProfile } = useAuth();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    birthDate: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        fullName: user.fullName || "",
        phone: user.phone || "",
        address: user.address || "",
        birthDate: user.birthDate?.slice(0, 10) || "",
      });
    }
  }, [user]);

  async function submit() {
    if (!user) return;

    await api.put(`/users/${user.id}`, form);

    await refreshProfile();

    onDone();
  }

  return (
    <div className="bg-white border rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-4">Chỉnh sửa thông tin</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Họ và tên"
          value={form.fullName}
          onChange={(v) => setForm({ ...form, fullName: v })}
        />
        <Input
          label="Số điện thoại"
          value={form.phone}
          onChange={(v) => setForm({ ...form, phone: v })}
        />
        <Input
          label="Ngày sinh"
          type="date"
          value={form.birthDate}
          onChange={(v) => setForm({ ...form, birthDate: v })}
        />
        <Input
          label="Địa chỉ"
          value={form.address}
          onChange={(v) => setForm({ ...form, address: v })}
        />
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={submit}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Lưu
        </button>
        <button onClick={onDone} className="border px-4 py-2 rounded-lg">
          Hủy
        </button>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text" }: any) {
  return (
    <div>
      <label className="text-sm text-gray-500">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-lg px-3 py-2 mt-1"
      />
    </div>
  );
}
