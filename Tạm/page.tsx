"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Users, MapPin, Eye, X, FileText } from "lucide-react";
import { formatPrice, formatDate } from "@/lib/utils/format";

export default function MyBookingsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);

  const bookings = [
    {
      id: "#8A4B2C",
      tourTitle: "Khám Phá Vịnh Hạ Long - Du thuyền 5 sao",
      tourId: "tour-1",
      image: "/images/halong.jpg",
      date: "25/12/2024",
      guests: 2,
      total: 5990000,
      status: "confirmed",
      bookingDate: "2024-11-15",
    },
    {
      id: "#9B1D5E",
      tourTitle: "Tour Phố Cổ Hội An & Làng Gốm Thanh Hà",
      tourId: "tour-2",
      image: "/images/hoian.jpg",
      date: "15/01/2025",
      guests: 1,
      children: 1,
      total: 2150000,
      status: "pending",
      bookingDate: "2024-11-20",
    },
    {
      id: "#3F7E9A",
      tourTitle: "Trekking Sapa - Chinh phục Fansipan",
      tourId: "tour-3",
      image: "/images/sapa.jpg",
      date: "10/09/2023",
      guests: 4,
      total: 12400000,
      status: "completed",
      bookingDate: "2023-08-10",
    },
    {
      id: "#JK012",
      tourTitle: "Du lịch Phú Quốc 3N2D",
      tourId: "tour-4",
      image: "/images/phuquoc.jpg",
      date: "01/12/2022",
      guests: 2,
      total: 6500000,
      status: "cancelled",
      bookingDate: "2022-11-15",
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
        return "Chờ thanh toán";
      case "completed":
        return "Hoàn thành";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === "all") return true;
    return booking.status === activeTab;
  });

  const tabs = [
    { id: "all", label: "Tất cả", count: bookings.length },
    {
      id: "pending",
      label: "Chờ thanh toán",
      count: bookings.filter((b) => b.status === "pending").length,
    },
    {
      id: "confirmed",
      label: "Đã xác nhận",
      count: bookings.filter((b) => b.status === "confirmed").length,
    },
    {
      id: "completed",
      label: "Hoàn thành",
      count: bookings.filter((b) => b.status === "completed").length,
    },
    {
      id: "cancelled",
      label: "Đã hủy",
      count: bookings.filter((b) => b.status === "cancelled").length,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Quản Lý Đơn Hàng Của Bạn</h1>
          <p className="text-gray-600">
            Theo dõi và quản lý tất cả các chuyến đi của bạn
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="border-b border-gray-200 overflow-x-auto">
            <div className="flex min-w-max">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 font-medium whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab.label}
                  {tab.count > 0 && (
                    <span
                      className={`ml-2 px-2 py-1 text-xs rounded-full ${
                        activeTab === tab.id
                          ? "bg-blue-100 text-blue-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Không có đơn hàng nào
            </h3>
            <p className="text-gray-600 mb-6">
              Bạn chưa có đơn hàng nào trong danh mục này
            </p>
            <Link
              href="/tours"
              className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Khám phá Tours
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Image */}
                  <div className="relative w-full md:w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={booking.image}
                      alt={booking.tourTitle}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold">
                            {booking.tourTitle}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              booking.status
                            )}`}
                          >
                            {getStatusText(booking.status)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          Mã đơn hàng:{" "}
                          <span className="font-semibold">{booking.id}</span>
                        </p>
                        <p className="text-sm text-gray-600">
                          Đặt ngày: {formatDate(booking.bookingDate)}
                        </p>
                      </div>
                      <div className="text-left md:text-right">
                        <p className="text-2xl font-bold text-blue-600">
                          {formatPrice(booking.total)}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Ngày đi: {booking.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>
                          {booking.guests} người lớn
                          {booking.children
                            ? `, ${booking.children} trẻ em`
                            : ""}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={`/bookings/${booking.id}`}
                        className="flex items-center gap-2 px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        Xem chi tiết
                      </Link>

                      {booking.status === "pending" && (
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                          Thanh Toán
                        </button>
                      )}

                      {booking.status === "confirmed" && (
                        <>
                          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                            Viết đánh giá
                          </button>
                          <button className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                            <X className="w-4 h-4" />
                            Hủy đơn
                          </button>
                        </>
                      )}

                      {booking.status === "completed" && (
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                          Đặt lại
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {filteredBookings.length > 0 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              Trước
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
              1
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              2
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              3
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Sau
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
