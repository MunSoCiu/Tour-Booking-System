"use client";

import { useEffect, useState } from "react";
import PaymentFilter from "@/components/payments/PaymentFilter";
import PaymentTable from "@/components/payments/PaymentTable";
import PaymentSearch from "@/components/payments/PaymentSearch";
import Pagination from "@/components/payments/Pagination";
import { fetchMyPayments } from "@/lib/api/payments";

export default function AdminPaymentsPage() {
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [data, setData] = useState<any>(null);
  const limit = 10;

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    fetchMyPayments({ status, search, page, limit }).then(setData);
  }, [status, search, page]);

  /* ================= RESET PAGE ================= */
  useEffect(() => {
    setPage(1);
  }, [status, search]);

  if (!data) {
    return <div className="p-10 text-gray-500">Đang tải dữ liệu…</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-6 pt-10">
        <h1 className="text-3xl font-bold">Lịch sử giao dịch</h1>
        <p className="text-gray-500 mt-1">
          Theo dõi các giao dịch thanh toán của bạn
        </p>
      </div>

      {/* SEARCH + FILTER */}
      <div className="max-w-7xl mx-auto px-6 mt-6 space-y-4">
        <PaymentSearch value={search} onChange={setSearch} />
        <PaymentFilter value={status} onChange={setStatus} />
      </div>

      {/* TABLE */}
      <div className="max-w-7xl mx-auto px-6 mt-6">
        <PaymentTable items={data.items} />
      </div>

      {/* PAGINATION */}
      <div className="max-w-7xl mx-auto px-6 mt-6 flex items-center justify-between">
        <span className="text-sm text-gray-500">
          Trang {data.page} / {Math.ceil(data.total / limit)}
        </span>

        <Pagination
          page={page}
          total={data.total}
          limit={limit}
          onChange={setPage}
        />
      </div>
    </div>
  );
}
