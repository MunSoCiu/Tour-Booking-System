"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Eye,
  Check,
  X,
  Download,
  Calendar,
} from "lucide-react";
import { formatPrice, formatDate } from "@/lib/utils/format";

export default function AdminBookingsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [dateRange, setDateRange] = useState("all");

  const bookings = [
    {
      id: "#8A4B2C",
      tourTitle: "Khám Phá Vịnh Hạ Long - Du thuyền 5 sao",
      customer: {
        name: "Nguyễn Văn A",
        email: "nva@email.com",
        phone: "0909123456",
      },
      date: "2024-12-25",
      guests: 2,
      children: 0,
      total: 5990000,
      paymentMethod: "credit_card",
      status: "confirmed",
      bookingDate: "2024-11-15",
    },
    {
      id: "#9B1D5E",
      tourTitle: "Tour Phố Cổ Hội An & Làng Gốm Thanh Hà",
      customer: {
        name: "Trần Thị B",
        email: "ttb@email.com",
        phone: "0918234567",
      },
      date: "2025-01-15",
      guests: 1,
      children: 1,
      total: 2150000,
      paymentMethod: "bank_transfer",
      status: "pending",
      bookingDate: "2024-11-20",
    },
    {
      id: "#3F7E9A",
      tourTitle: "Trekking Sapa - Chinh phục Fansipan",
      customer: {
        name: "Lê Văn C",
        email: "lvc@email.com",
        phone: "0927345678",
      },
      date: "2023-09-10",
      guests: 4,
      children: 0,
      total: 12400000,
      paymentMethod: "wallet",
      status: "completed",
      bookingDate: "2023-08-10",
    },
    {
      id: "#JK012",
      tourTitle: "Du lịch Phú Quốc 3N2D",
      customer: {
        name: "Phạm Thị D",
        email: "ptd@email.com",
        phone: "0936456789",
      },
      date: "2022-12-01",
      guests: 2,
      children: 1,
      total: 6500000,
      paymentMethod: "credit_card",
      status: "cancelled",
      bookingDate: "2022-11-15",
    },
    {
      id: "#LMN456",
      tourTitle: "City Tour Hà Nội - Ngàn năm văn hiến",
      customer: {
        name: "Hoàng Văn E",
        email: "hve@email.com",
        phone: "0945567890",
      },
      date: "2024-12-10",
      guests: 3,
      children: 2,
      total: 4250000,
      paymentMethod: "bank_transfer",
      status: "confirmed",
      bookingDate: "2024-11-18",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Đã xác nhận";
      case "pending":
        return "Chờ xử lý";
      case "completed":
        return "Hoàn thành";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case "credit_card":
        return "Thẻ tín dụng";
      case "bank_transfer":
        return "Chuyển khoản";
      case "wallet":
        return "Ví MoMo";
      default:
        return method;
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.tourTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || booking.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleStatusUpdate = (bookingId: string, newStatus: string) => {
    if (
      confirm(
        `Bạn có chắc chắn muốn cập nhật trạng thái đơn hàng ${bookingId}?`
      )
    ) {
      alert(`Đã cập nhật trạng thái đơn hàng ${bookingId} thành ${newStatus}`);
    }
  };

  const handleExport = () => {
    alert("Đang xuất báo cáo... Tính năng sẽ được triển khai sớm.");
  };

  const stats = [
    {
      label: "Tổng đơn hàng",
      value: bookings.length,
      color: "blue",
    },
    {
      label: "Chờ xử lý",
      value: bookings.filter((b) => b.status === "pending").length,
      color: "yellow",
    },
    {
      label: "Đã xác nhận",
      value: bookings.filter((b) => b.status === "confirmed").length,
      color: "green",
    },
    {
      label: "Đã hủy",
      value: bookings.filter((b) => b.status === "cancelled").length,
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
              Quản lý Đơn hàng
            </h1>
            <p className="text-gray-600">
              Theo dõi và quản lý tất cả các đơn đặt tour
            </p>
          </div>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors mt-4 md:mt-0"
          >
            <Download className="w-5 h-5" />
            Xuất báo cáo
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Tìm theo mã đơn, tên khách hàng, tour..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="pending">Chờ xử lý</option>
                <option value="confirmed">Đã xác nhận</option>
                <option value="completed">Hoàn thành</option>
                <option value="cancelled">Đã hủy</option>
              </select>
            </div>
            <div>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả thời gian</option>
                <option value="today">Hôm nay</option>
                <option value="week">Tuần này</option>
                <option value="month">Tháng này</option>
                <option value="year">Năm này</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mã đơn hàng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Khách hàng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tour
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày đi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Số khách
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tổng tiền
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thanh toán
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
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-blue-600">
                        {booking.id}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatDate(booking.bookingDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {booking.customer.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {booking.customer.email}
                      </div>
                      <div className="text-xs text-gray-500">
                        {booking.customer.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {booking.tourTitle}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-sm text-gray-900">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {formatDate(booking.date)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {booking.guests} người lớn
                        {booking.children > 0 && (
                          <>, {booking.children} trẻ em</>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {formatPrice(booking.total)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {getPaymentMethodText(booking.paymentMethod)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {getStatusText(booking.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            alert(`Xem chi tiết đơn hàng ${booking.id}`)
                          }
                          className="text-blue-600 hover:text-blue-900"
                          title="Xem chi tiết"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        {booking.status === "pending" && (
                          <button
                            onClick={() =>
                              handleStatusUpdate(booking.id, "confirmed")
                            }
                            className="text-green-600 hover:text-green-900"
                            title="Xác nhận"
                          >
                            <Check className="w-5 h-5" />
                          </button>
                        )}
                        {(booking.status === "pending" ||
                          booking.status === "confirmed") && (
                          <button
                            onClick={() =>
                              handleStatusUpdate(booking.id, "cancelled")
                            }
                            className="text-red-600 hover:text-red-900"
                            title="Hủy"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        )}
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
              <span className="font-medium">{filteredBookings.length}</span> của{" "}
              <span className="font-medium">{filteredBookings.length}</span> kết
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
                2
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
