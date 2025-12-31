export default function PaymentStatusBadge({ status }: { status: string }) {
<<<<<<< HEAD
  const map: Record<string, { label: string; cls: string }> = {
    success: { label: "Thành công", cls: "bg-green-100 text-green-600" },
    pending: { label: "Chờ xử lý", cls: "bg-yellow-100 text-yellow-600" },
    failed: { label: "Thất bại", cls: "bg-red-100 text-red-600" },
  };

  const s = map[status];

  if (!s) return <span className="px-3 py-1 text-sm">—</span>;

  return (
    <span className={`px-3 py-1 rounded-full text-sm ${s.cls}`}>{s.label}</span>
=======
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
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
  );
}
