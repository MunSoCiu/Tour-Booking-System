export default function PaymentStatusBadge({ status }: { status: string }) {
  const styles: any = {
    "Thành công": "bg-green-100 text-green-600",
    "Chờ xử lý": "bg-yellow-100 text-yellow-600",
    "Thất bại": "bg-red-100 text-red-600",
    "Đã hoàn tiền": "bg-blue-100 text-blue-600",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm ${styles[status]}`}>
      {status}
    </span>
  );
}
