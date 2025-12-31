<<<<<<< HEAD
"use client";

import { useState } from "react";

export default function OrderItemActions({
  status,
  onCancel,
  onPay,
  onDelete,
  onRetryPay,
}: {
  status: "pending" | "success" | "cancelled";
  onCancel: () => void;
  onPay: () => void;
  onDelete: () => void;
  onRetryPay: () => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);

  /* ===================== PENDING ===================== */
  if (status === "pending") {
    return (
      <div className="flex flex-col items-end gap-2">
        <button
          onClick={onPay}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Thanh toán
        </button>

        <button
          onClick={onCancel}
          className="bg-yellow-500 text-white px-9 py-2 rounded-lg"
        >
          Hủy đơn
        </button>
      </div>
    );
  }

  /* ===================== CANCELLED ===================== */
  if (status === "cancelled") {
    const handleRetry = async () => {
      const ok = confirm(
        "Bạn có muốn thanh toán lại đơn hàng này không?\n\nĐơn sẽ được chuyển về trạng thái CHỜ THANH TOÁN."
      );
      if (!ok) return;

      try {
        setLoading(true);
        await onRetryPay(); // chỉ gọi callback
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="flex flex-col items-end gap-2">
        <button
          onClick={handleRetry}
          disabled={loading}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
        >
          {loading ? "Đang xử lý..." : "Thanh toán lại"}
        </button>

        <button
          onClick={onDelete}
          className="bg-red-500 text-white px-10 py-2 rounded-lg"
        >
          Xóa đơn
        </button>
      </div>
    );
  }

  /* ===================== SUCCESS ===================== */
  if (status === "success") {
    return (
      <button className="bg-gray-100 px-4 py-2 rounded-lg cursor-default">
        Đã hoàn thành
      </button>
    );
  }

  return null;
=======
export default function OrderItemActions({ status }: { status: string }) {
  return (
    <div className="flex flex-col items-end gap-3">
      {status === "Đã xác nhận" && (
        <>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Xem Chi Tiết
          </button>
          <p className="text-gray-500 text-sm">Hỗ trợ</p>
        </>
      )}

      {status === "Chờ thanh toán" && (
        <>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Thanh Toán
          </button>
          <button className="text-red-500 text-sm hover:underline">
            Hủy Đơn
          </button>
        </>
      )}

      {status === "Đã hoàn thành" && (
        <>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Viết đánh giá
          </button>
          <button className="text-gray-600 text-sm hover:underline">
            Đặt lại
          </button>
        </>
      )}
    </div>
  );
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
}
