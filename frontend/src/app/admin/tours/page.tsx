"use client";

import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Package,
  DollarSign,
  Calendar,
  Download,
  Filter,
} from "lucide-react";
import { formatPrice } from "@/lib/utils/format";

export default function AdminDashboardPage() {
  const [timeRange, setTimeRange] = useState("7days");

  const stats = [
    {
      title: "Tổng doanh thu",
      value: "2,15 Tỷ",
      change: "+5.2%",
      trend: "up",
      icon: DollarSign,
      color: "blue",
    },
    {
      title: "Tổng tour đã đặt",
      value: "1,230",
      change: "+2.1%",
      trend: "up",
      icon: Package,
      color: "green",
    },
    {
      title: "Người dùng mới",
      value: "89",
      change: "+10%",
      trend: "up",
      icon: Users,
      color: "purple",
    },
    {
      title: "Tour đang hoạt động",
      value: "150",
      change: "-1.5%",
      trend: "down",
      icon: Calendar,
      color: "orange",
    },
  ];

  const topTours = [
    { name: "Vịnh Hạ Long", bookings: 320, revenue: "96,000,000" },
    { name: "Đà Nẵng - Hội An", bookings: 298, revenue: "89,400,000" },
    { name: "Phú Quốc", bookings: 215, revenue: "64,500,000" },
    { name: "Sapa", bookings: 180, revenue: "54,000,000" },
    { name: "Miền Tây", bookings: 152, revenue: "45,600,000" },
  ];

  const recentBookings = [
    {
      id: "#8A4B2C",
      customer: "Nguyễn Văn A",
      tour: "Khám Phá Vịnh Hạ Long",
      date: "2024-11-25",
      guests: 2,
      total: 5990000,
      status: "confirmed",
    },
    {
      id: "#9B1D5E",
      customer: "Trần Thị B",
      tour: "Tour Đà Nẵng - Hội An",
      date: "2024-11-26",
      guests: 4,
      total: 8600000,
      status: "pending",
    },
    {
      id: "#3F7E9A",
      customer: "Lê Văn C",
      tour: "Phú Quốc 3N2D",
      date: "2024-11-27",
      guests: 2,
      total: 6500000,
      status: "confirmed",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
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
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Bảng điều khiển tổng quan
            </h1>
            <p className="text-gray-600">
              Chào mừng trở lại, cùng xem hôm nay có gì mới nhé!
            </p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="7days">7 ngày qua</option>
              <option value="30days">30 ngày qua</option>
              <option value="90days">90 ngày qua</option>
              <option value="1year">1 năm qua</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              <Download className="w-4 h-4" />
              Tải báo cáo
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}
                >
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-medium ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  {stat.change}
                </div>
              </div>
              <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Chart Placeholder */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Thống kê doanh thu</h2>
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <Filter className="w-4 h-4" />
                Lọc
              </button>
            </div>
            <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center text-gray-500">
                <TrendingUp className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>Biểu đồ doanh thu sẽ được hiển thị ở đây</p>
                <p className="text-sm mt-2">
                  Sử dụng Recharts hoặc Chart.js để tạo biểu đồ
                </p>
              </div>
            </div>
          </div>

          {/* Top Tours */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Top Tour phổ biến</h2>
            <div className="space-y-4">
              {topTours.map((tour, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{tour.name}</p>
                      <p className="text-sm text-gray-500">
                        {tour.bookings} lượt đặt
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {tour.revenue}đ
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Đơn hàng gần đây</h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              Xem tất cả →
            </button>
          </div>

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
                    Tổng giá
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-blue-600">
                        {booking.id}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {booking.customer}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {booking.tour}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {booking.date}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {booking.guests}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {formatPrice(booking.total)}
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
