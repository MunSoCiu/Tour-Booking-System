"use client";

import { useState } from "react";
import api from "@/lib/api/client";
import { useAuth } from "@/lib/hooks/useAuth";

export default function ChangePasswordForm() {
  const { user } = useAuth();
  const [oldPassword, setOld] = useState("");
  const [newPassword, setNew] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!user) return alert("Bạn chưa đăng nhập");

    try {
      setLoading(true);

      await api.put(`/users/${user.id}/password`, { oldPassword, newPassword });

      alert("Đổi mật khẩu thành công");
      setOld("");
      setNew("");
    } catch (e: any) {
      alert(e?.response?.data?.message || "Đổi mật khẩu thất bại");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white border rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-4">Đổi mật khẩu</h3>

      <Input label="Mật khẩu cũ" value={oldPassword} onChange={setOld} />
      <Input label="Mật khẩu mới" value={newPassword} onChange={setNew} />

      <button
        onClick={submit}
        disabled={loading}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
      >
        {loading ? "Đang xử lý..." : "Cập nhật"}
      </button>
    </div>
  );
}

function Input({ label, value, onChange }: any) {
  return (
    <div className="mb-3">
      <label className="text-sm text-gray-500">{label}</label>
      <input
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-lg px-3 py-2 mt-1"
      />
    </div>
  );
}
