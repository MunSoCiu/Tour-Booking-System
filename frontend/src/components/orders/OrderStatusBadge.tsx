export default function OrderStatusBadge({ status }: { status: string }) {
  const styles: any = {
    "Đã xác nhận": "bg-green-100 text-green-600",
    "Chờ thanh toán": "bg-yellow-100 text-yellow-600",
    "Đã hoàn thành": "bg-gray-100 text-gray-600",
    "Đã hủy": "bg-red-100 text-red-600",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}
