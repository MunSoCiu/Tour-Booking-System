"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api/client";
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";
import Image from "next/image";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-6">
          <h1 className="text-2xl font-semibold mb-6">Quản lý người dùng</h1>

          <div className="bg-white p-4 rounded-xl shadow">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="p-3">Tên</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Vai trò</th>
                  <th className="p-3 text-right">Hành động</th>
                </tr>
              </thead>

              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 flex items-center gap-3">
                      <Image
                        src={u.avatar || "/avatars/default.jpg"}
                        width={32}
                        height={32}
                        className="rounded-full"
                        alt=""
                      />
                      {u.fullName}
                    </td>

                    <td className="p-3">{u.email}</td>

                    <td className="p-3 capitalize">{u.role}</td>

                    <td className="p-3 text-right">
                      <button className="text-blue-600 mr-4">Sửa</button>
                      <button className="text-red-600">Khoá</button>
                    </td>
                  </tr>
                ))}

                {users.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-3 text-center text-gray-400">
                      Không có người dùng
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
