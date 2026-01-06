"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import Image from "next/image";
import api from "@/lib/api/client";
import { useRef, useState } from "react";

export default function ProfileDetails({ onEdit }: { onEdit: () => void }) {
  const { user } = useAuth();

  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  if (!user) return null;

  async function uploadAvatar(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);

      const res = await api.put(`/users/${user.id}/avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const newUser = { ...user, avatar: res.data.avatar };
      localStorage.setItem("user", JSON.stringify(newUser));
      window.location.reload();
    } catch (err: any) {
      alert(err.response?.data?.message || "Upload avatar thất bại");
    } finally {
      setUploading(false);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    console.log("FILE:", file);
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Chỉ được upload ảnh");
      return;
    }

    uploadAvatar(file);
  }

  return (
    <div className="bg-white border shadow-sm rounded-xl p-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">Thông tin cá nhân</h3>
          <p className="text-gray-500 text-sm">
            Quản lý thông tin hồ sơ của bạn
          </p>
        </div>

        <button
          onClick={onEdit}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
        >
          ✏️ Chỉnh sửa
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Field label="Họ và tên" value={user.fullName} />
        <Field label="Email" value={user.email} />
        <Field label="Vai trò" value={user.role} />
        <Field label="Ngày sinh" value={formatDate(user.birthDate)} />
        <Field label="Số điện thoại" value={user.phone || "—"} />
        <Field label="Địa chỉ" value={user.address || "—"} />
      </div>
    </div>
  );
}

function Field({ label, value }: any) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium mt-1">{value}</p>
    </div>
  );
}

function formatDate(d?: string) {
  return d ? new Date(d).toLocaleDateString("vi-VN") : "—";
}
