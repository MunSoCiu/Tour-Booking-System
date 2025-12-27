"use client";

function StatusBadge({ status }: { status: string }) {
  const map: any = {
    pending: "bg-yellow-100 text-yellow-700",
    success: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        map[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status.toUpperCase()}
    </span>
  );
}

export default function OrderDetailModal({
  order,
  onClose,
}: {
  order: any;
  onClose: () => void;
}) {
  const item = order.items[0];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl">
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <h3 className="text-xl font-semibold">Chi tiết đơn hàng</h3>

            <p className="text-sm text-gray-500">Mã đơn: {order.code}</p>
          </div>

          <StatusBadge status={order.status} />
        </div>

        {/* CONTENT */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          {/* LEFT */}
          <div className="space-y-3">
            <Info label="Khách hàng" value={order.user.fullName} />
            <Info label="Email" value={order.user.email} />
            <Info label="Tên tour" value={item.tourTitle} />
            <Info label="Số lượng" value={`${item.qty} người`} />
          </div>

          {/* RIGHT */}
          <div className="space-y-3">
            <Info label="Giá gốc" value={`${item.price.toLocaleString()} đ`} />

            {item.discount > 0 && (
              <Info label="Ưu đãi" value={`-${item.discount}%`} highlight />
            )}

            <div className="pt-4 border-t">
              <p className="text-gray-500 text-sm">Tổng thanh toán</p>
              <p className="text-3xl font-bold text-blue-600">
                {(item.finalPrice * item.qty).toLocaleString()} đ
              </p>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg border hover:bg-gray-50"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================
        SMALL COMPONENT
========================= */
function Info({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <p className="text-gray-500 text-sm uppercase tracking-wide">{label}</p>

      <p className={`font-semibold ${highlight ? "text-green-600" : ""}`}>
        {value}
      </p>
    </div>
  );
}
