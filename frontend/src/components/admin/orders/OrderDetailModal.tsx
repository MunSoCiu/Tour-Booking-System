"use client";

function Info({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string | number;
  highlight?: boolean;
}) {
  return (
    <div>
      <p className="text-gray-500 text-xs uppercase">{label}</p>
      <p className={`font-semibold ${highlight ? "text-green-600" : ""}`}>
        {value}
      </p>
    </div>
  );
}

function renderPaymentMethod(method?: string) {
  if (!method) return "—";
  const map: Record<string, string> = {
    momo: "MoMo",
    vnpay: "VNPay",
    bank: "Chuyển khoản",
  };
  return map[method] ?? method;
}

export default function OrderDetailModal({
  order,
  onClose,
}: {
  order: any;
  onClose: () => void;
}) {
  const item = order.items?.[0];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl">
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <h3 className="text-xl font-semibold">Chi tiết đơn hàng</h3>
            <p className="text-sm text-gray-500">Mã đơn: {order.code}</p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs bg-gray-100">
            {order.status}
          </span>
        </div>

        {/* PAYMENT INFO */}
        {order.paymentId && (
          <div className="px-6 py-4 border-b bg-gray-50 text-sm grid grid-cols-2 gap-4">
            <Info label="Mã giao dịch" value={order.paymentId} />
            <Info
              label="Phương thức"
              value={renderPaymentMethod(order.paymentMethod)}
            />
            <Info
              label="Trạng thái TT"
              value={order.paymentStatus}
              highlight={order.paymentStatus === "success"}
            />
            <Info
              label="Ngày thanh toán"
              value={
                order.paymentDate
                  ? new Date(order.paymentDate).toLocaleString("vi-VN")
                  : "—"
              }
            />
          </div>
        )}

        {/* CONTENT */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-3">
            <Info label="Khách hàng" value={order.customer ?? "—"} />
            <Info label="Email" value={order.email ?? "—"} />
            <Info label="Tên tour" value={item?.tourTitle ?? "—"} />
            <Info label="Số lượng" value={`${item?.qty ?? "—"} người`} />
          </div>

          <div className="space-y-3">
            <Info
              label="Giá gốc"
              value={item ? `${item.price.toLocaleString()} đ` : "—"}
            />

            {item?.discount > 0 && (
              <Info label="Ưu đãi" value={`-${item.discount}%`} highlight />
            )}

            <div className="pt-4 border-t">
              <p className="text-gray-500 text-sm">Tổng thanh toán</p>
              <p className="text-3xl font-bold text-blue-600">
                {order.total?.toLocaleString()} đ
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
