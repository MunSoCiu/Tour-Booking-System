"use client";

import OrdersFilter from "@/components/orders/OrdersFilter";
import OrdersList from "@/components/orders/OrdersList";
import SearchOrders from "@/components/orders/SearchOrders";
import Pagination from "@/components/orders/Pagination";

export default function MyOrdersPage() {
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* TITLE */}
      <div className="max-w-6xl mx-auto px-4 pt-10">
        <h1 className="text-3xl font-bold">Quản Lý Đơn Hàng Của Bạn</h1>
      </div>

      {/* SEARCH */}
      <div className="max-w-6xl mx-auto mt-6 px-4">
        <SearchOrders />
      </div>

      {/* FILTER TABS */}
      <div className="max-w-6xl mx-auto mt-6 px-4">
        <OrdersFilter />
      </div>

      {/* ORDERS LIST */}
      <div className="max-w-6xl mx-auto mt-8 px-4 space-y-6">
        <OrdersList />
      </div>

      {/* PAGINATION */}
      <div className="max-w-6xl mx-auto mt-12 flex justify-center">
        <Pagination />
      </div>
    </div>
  );
}
