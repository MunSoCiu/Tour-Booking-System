<<<<<<< HEAD
import { STATUS_MAP, STATUS_STYLE } from "@/lib/utils/orderStatus";

export default function OrderStatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${STATUS_STYLE[status]}`}
    >
      {STATUS_MAP[status]}
=======
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
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
    </span>
  );
}
