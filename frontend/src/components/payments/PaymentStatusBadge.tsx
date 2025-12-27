export default function PaymentStatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    success: { label: "Thành công", cls: "bg-green-100 text-green-600" },
    pending: { label: "Chờ xử lý", cls: "bg-yellow-100 text-yellow-600" },
    failed: { label: "Thất bại", cls: "bg-red-100 text-red-600" },
  };

  const s = map[status];

  if (!s) return <span className="px-3 py-1 text-sm">—</span>;

  return (
    <span className={`px-3 py-1 rounded-full text-sm ${s.cls}`}>{s.label}</span>
  );
}
