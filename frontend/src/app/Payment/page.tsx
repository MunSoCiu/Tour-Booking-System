"use client";

import PaymentFilter from "@/components/payments/PaymentFilter";
import PaymentTable from "@/components/payments/PaymentTable";
import PaymentSearch from "@/components/payments/PaymentSearch";
import Pagination from "@/components/payments/Pagination";

export default function PaymentHistoryPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* TITLE */}
      <div className="max-w-7xl mx-auto px-6 pt-10">
        <h1 className="text-3xl font-bold">Lịch sử Giao dịch Thanh toán</h1>
        <p className="text-gray-500 mt-1">
          Theo dõi và quản lý tất cả các giao dịch trên hệ thống.
        </p>
      </div>

      {/* SEARCH + FILTER */}
      <div className="max-w-7xl mx-auto px-6 mt-8 flex flex-col gap-4">
        <PaymentSearch />
        <PaymentFilter />
      </div>

      {/* TABLE */}
      <div className="max-w-7xl mx-auto px-6 mt-8">
        <PaymentTable />
      </div>

      {/* PAGINATION */}
      <div className="max-w-7xl mx-auto px-6 mt-6 flex justify-between text-sm text-gray-600">
        <span>Hiển thị 1–5 của 100</span>
        <Pagination />
      </div>
    </div>
  );
}
