"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Edit,
  Trash2,
  Lock,
  Unlock,
  UserPlus,
} from "lucide-react";
import { formatDate } from "@/lib/utils/format";

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const users = [
    {
      id: "1",
      fullName: "Nguyễn Văn A",
      email: "nva@email.com",
      phone: "0909123456",
      role: "customer",
      status: "active",
      totalBookings: 5,
      totalSpent: 25000000,
      joinDate: "2023-01-15",
      lastActive: "2024-11-25",
    },
    {
      id: "2",
      fullName: "Trần Thị B",
      email: "ttb@email.com",
      phone: "0918234567",
      role: "customer",
      status: "active",
      totalBookings: 12,
      totalSpent: 48000000,
      joinDate: "2022-06-20",
      lastActive: "2024-11-24",
    },
    {
      id: "3",
      fullName: "Lê Văn C",
      email: "lvc@email.com",
      phone: "0927345678",
      role: "tour_guide",
      status: "active",
      totalBookings: 0,
      totalSpent: 0,
      joinDate: "2023-03-10",
      lastActive: "2024-11-25",
    },
    {
      id: "4",
      fullName: "Phạm Thị D",
      email: "ptd@email.com",
      phone: "0936456789",
      role: "admin",
      status: "active",
      totalBookings: 0,
      totalSpent: 0,
      joinDate: "2021-08-05",
      lastActive: "2024-11-25",
    },
    {
      id: "5",
      fullName: "Hoàng Văn E",
      email: "hve@email.com",
      phone: "0945567890",
      role: "customer",
      status: "inactive",
      totalBookings: 2,
      totalSpent: 8500000,
      joinDate: "2024-01-12",
      lastActive: "2024-05-20",
    },
    {
      id: "6",
      fullName: "Vũ Thị F",
      email: "vtf@email.com",
      phone: "0954678901",
      role: "customer",
      status: "blocked",
      totalBookings: 1,
      totalSpent: 3200000,
      joinDate: "2023-11-08",
      lastActive: "2024-02-14",
    },
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800";
      case "tour_guide":
        return "bg-blue-100 text-blue-800";
      case "customer":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case "admin":
        return "Quản trị viên";
      case "tour_guide":
        return "Hướng dẫn viên";
      case "customer":
        return "Khách hàng";
      default:
        return role;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "blocked":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Hoạt động";
      case "inactive":
        return "Không hoạt động";
      case "blocked":
        return "Đã khóa";
      default:
        return status;
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery);
    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesStatus =
      filterStatus === "all" || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleEdit = (userId: string) => {
    alert(`Chỉnh sửa người dùng ID: ${userId}`);
  };

  const handleDelete = (userId: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      alert(`Đã xóa người dùng ID: ${userId}`);
    }
  };

  const handleToggleStatus = (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === "blocked" ? "active" : "blocked";
    if (
      confirm(
        `Bạn có chắc chắn muốn ${
          newStatus === "blocked" ? "khóa" : "mở khóa"
        } người dùng này?`
      )
    ) {
      alert(
        `Đã ${
          newStatus === "blocked" ? "khóa" : "mở khóa"
        } người dùng ID: ${userId}`
      );
    }
  };

  const stats = [
    {
      label: "Tổng người dùng",
      value: users.length,
      color: "blue",
    },
    {
      label: "Khách hàng",
      value: users.filter((u) => u.role === "customer").length,
      color: "green",
    },
    {
      label: "Hướng dẫn viên",
      value: users.filter((u) => u.role === "tour_guide").length,
      color: "blue",
    },
    {
      label: "Đã khóa",
      value: users.filter((u) => u.status === "blocked").length,
      color: "red",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Quản lý Người dùng
            </h1>
            <p className="text-gray-600">
              Quản lý tất cả người dùng trong hệ thống
            </p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors mt-4 md:mt-0">
            <UserPlus className="w-5 h-5" />
            Thêm người dùng
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className={`text-3xl font-bold text-${stat.color}-600`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Tìm theo tên, email, số điện thoại..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả vai trò</option>
                <option value="admin">Quản trị viên</option>
                <option value="tour_guide">Hướng dẫn viên</option>
                <option value="customer">Khách hàng</option>
              </select>
            </div>
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="active">Hoạt động</option>
                <option value="inactive">Không hoạt động</option>
                <option value="blocked">Đã khóa</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Người dùng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Liên hệ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vai trò
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Số đơn
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tổng chi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày tham gia
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                          {user.fullName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {user.fullName}
                          </div>
                          <div className="text-xs text-gray-500">
                            ID: {user.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{user.email}</div>
                      <div className="text-xs text-gray-500">{user.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColor(
                          user.role
                        )}`}
                      >
                        {getRoleText(user.role)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {user.totalBookings}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {user.totalSpent.toLocaleString("vi-VN")}đ
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDate(user.joinDate)}
                      </div>
                      <div className="text-xs text-gray-500">
                        Hoạt động: {formatDate(user.lastActive)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          user.status
                        )}`}
                      >
                        {getStatusText(user.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(user.id)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Chỉnh sửa"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() =>
                            handleToggleStatus(user.id, user.status)
                          }
                          className={
                            user.status === "blocked"
                              ? "text-green-600 hover:text-green-900"
                              : "text-orange-600 hover:text-orange-900"
                          }
                          title={user.status === "blocked" ? "Mở khóa" : "Khóa"}
                        >
                          {user.status === "blocked" ? (
                            <Unlock className="w-5 h-5" />
                          ) : (
                            <Lock className="w-5 h-5" />
                          )}
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Xóa"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="text-sm text-gray-700">
              Hiển thị <span className="font-medium">1</span> -{" "}
              <span className="font-medium">{filteredUsers.length}</span> của{" "}
              <span className="font-medium">{filteredUsers.length}</span> kết
              quả
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50">
                Trước
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                1
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
                Sau
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
