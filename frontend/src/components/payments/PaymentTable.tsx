import PaymentStatusBadge from "./PaymentStatusBadge";

const METHOD_LABEL: Record<string, string> = {
  momo: "MoMo",
  vnpay: "VNPay",
  bank: "Chuyển khoản",
  "bank:VCB": "Chuyển khoản VCB",
  "bank:TCB": "Chuyển khoản Techcombank",
  "bank:BIDV": "Chuyển khoản BIDV",
};

export default function PaymentTable({ items }: { items: any[] }) {
  return (
    <div className="bg-white rounded-xl shadow border overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-gray-600 text-sm">
          <tr>
            <th className="p-4">MÃ GD</th>
            <th className="p-4">KHÁCH HÀNG</th>
            <th className="p-4">CHUYẾN ĐI</th>
            <th className="p-4">NGÀY</th>
            <th className="p-4">SỐ TIỀN</th>
            <th className="p-4">PHƯƠNG THỨC</th>
            <th className="p-4">TRẠNG THÁI</th>
          </tr>
        </thead>

        <tbody className="text-sm text-gray-800">
          {items.map((p) => (
            <tr key={p.id} className="border-t hover:bg-gray-50">
              <td className="p-4 font-mono">{p.id.slice(0, 8)}</td>

              <td className="p-4 font-medium">{p.user?.fullName || "—"}</td>

              <td className="p-4 max-w-[260px] truncate">
                {p.order?.items?.[0]?.tourTitle || "—"}
              </td>

              <td className="p-4 text-gray-500">
                {new Date(p.createdAt).toLocaleString("vi-VN")}
              </td>

              <td className="p-4 font-semibold text-blue-600">
                {p.amount.toLocaleString("vi-VN")} ₫
              </td>

              <td className="p-4">{METHOD_LABEL[p.method] ?? "—"}</td>

              <td className="p-4">
                <PaymentStatusBadge status={p.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
