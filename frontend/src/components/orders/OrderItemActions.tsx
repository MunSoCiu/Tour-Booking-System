"use client";

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
  /* =====================
     PENDING
  ===================== */
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

  /* =====================
     CANCELLED
  ===================== */
  if (status === "cancelled") {
    const handleRetry = async () => {
      const ok = confirm(
        "Bạn có muốn thanh toán lại đơn hàng này không?\n\nĐơn sẽ được chuyển về trạng thái CHỜ THANH TOÁN."
      );

      if (!ok) return;

      try {
        await onRetryPay();
        onPay(); // chuyển sang trang thanh toán
      } catch (err) {
        alert("Không thể thanh toán lại đơn hàng");
      }
    };

    return (
      <div className="flex flex-col items-end gap-2">
        <button
          onClick={handleRetry}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg"
        >
          Thanh toán lại
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

  /* =====================
     SUCCESS
  ===================== */
  if (status === "success") {
    return (
      <button className="bg-gray-100 px-4 py-2 rounded-lg cursor-default">
        Đã hoàn thành
      </button>
    );
  }

  return null;
}
