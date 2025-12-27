"use client";

import { useState } from "react";
import SearchOrders from "@/components/orders/SearchOrders";
import OrdersFilter from "@/components/orders/OrdersFilter";
import OrdersList from "@/components/orders/OrdersList";

export default function MyOrdersPage() {
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="max-w-6xl mx-auto px-4 pt-10">
        <h1 className="text-3xl font-bold">Quản lý đơn hàng</h1>
      </div>

      <div className="max-w-6xl mx-auto mt-6 px-4 space-y-6">
        <SearchOrders value={search} onChange={setSearch} />
        <OrdersFilter
          value={status}
          onChange={(v) => {
            setStatus(v);
            setPage(1); // reset page khi filter
          }}
        />

        <OrdersList status={status} search={search} page={page} />

        {/* =====================
            PAGINATION
        ===================== */}
        <div className="flex justify-center gap-3 pt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 rounded-lg border disabled:opacity-40"
          >
            ← Trang trước
          </button>

          <span className="px-4 py-2 font-medium">Trang {page}</span>

          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 rounded-lg border"
          >
            Trang sau →
          </button>
        </div>
      </div>
    </div>
  );
}
