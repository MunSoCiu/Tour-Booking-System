"use client";

import { useEffect, useState } from "react";
import StatCard from "@/components/admin/StatCard";
import Image from "next/image";
import { fetchAdminUsers, fetchAdminUserStats } from "@/lib/api/admin";
import api from "@/lib/api/client";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    Promise.all([fetchAdminUsers(), fetchAdminUserStats()]).then(([u, s]) => {
      setUsers(Array.isArray(u?.items) ? u.items : []);
      setStats(s);
    });
  }, []);

  if (!stats) return <div>Đang tải...</div>;

  return (
    <>
      <h1 className="text-2xl font-semibold">Quản lý người dùng</h1>

      {/* STAT */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"></div>

      {/* TABLE */}
      <div className="bg-white mt-8 rounded-xl shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="p-4 text-left">Người dùng</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Vai trò</th>
              <th className="p-4 text-right">Hành động</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b hover:bg-gray-50">
                <td className="p-4 flex items-center gap-3">
                  <Image
                    src={u.avatar || "/avatars/default.jpg"}
                    width={36}
                    height={36}
                    className="rounded-full"
                    alt=""
                  />
                  <span className="font-medium">{u.fullName}</span>
                </td>

                <td className="p-4">{u.email}</td>

                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      u.role === "admin"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="p-4 text-right space-x-3">
                  {/* CHỈ USER MỚI ĐƯỢC ĐỔI ROLE */}
                  {u.role === "user" ? (
                    <button
                      onClick={() => toggleRole(u.id, u.role)}
                      className="text-blue-600 hover:underline"
                    >
                      Nâng quyền
                    </button>
                  ) : (
                    <span className="text-gray-400 text-sm cursor-not-allowed">
                      Không thể đổi
                    </span>
                  )}

                  {/* KHOÁ / MỞ USER */}
                  <button
                    onClick={() => toggleStatus(u.id, u.status)}
                    className="text-red-600 hover:underline"
                  >
                    {u.status === "active" ? "Khoá" : "Mở"}
                  </button>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan={4} className="p-6 text-center text-gray-400">
                  Không có người dùng
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );

  async function toggleStatus(id: string, status: string) {
    await api.put(`/admin/users/${id}/status`, {
      status: status === "active" ? "banned" : "active",
    });
    reload();
  }

  async function toggleRole(id: string, role: string) {
    if (role !== "user") {
      alert("Không thể thay đổi role của admin");
      return;
    }

    await api.put(`/admin/users/${id}/role`, {
      role: "admin",
    });

    reload();
  }

  function reload() {
    fetchAdminUsers().then((u) =>
      setUsers(Array.isArray(u?.items) ? u.items : [])
    );
  }
}
