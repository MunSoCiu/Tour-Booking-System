import { STATUS_MAP, STATUS_STYLE } from "@/lib/utils/orderStatus";

export default function OrderStatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${STATUS_STYLE[status]}`}
    >
      {STATUS_MAP[status]}
    </span>
  );
}
