"use client";

import api from "@/lib/api/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const STATUS = ["pending", "confirmed", "cancelled"];

const STATUS_STYLE: Record<string, string> = {
  pending: "bg-yellow-50 text-yellow-700",
  confirmed: "bg-green-50 text-green-800",
  cancelled: "bg-red-50 text-red-600",
};

export default function OrderStatusDropdown({
  order,
  onUpdated,
}: {
  order: any;
  onUpdated: (orderId: string, status: string) => void;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function changeStatus(newStatus: string) {
    if (newStatus === order.status) return;

    try {
      setLoading(true);

      await api.put(`/admin/orders/${order.id}/status`, {
        status: newStatus,
      });

      onUpdated(order.id, newStatus);
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <select
      value={order.status}
      disabled={loading}
      onChange={(e) => changeStatus(e.target.value)}
      className={`border rounded-lg px-3 py-2 text-sm font-semibold ${
        STATUS_STYLE[order.status] || "bg-gray-50 text-gray-700"
      }`}
    >
      {STATUS.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
