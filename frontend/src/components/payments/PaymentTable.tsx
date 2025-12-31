import PaymentStatusBadge from "./PaymentStatusBadge";
<<<<<<< HEAD

const METHOD_LABEL: Record<string, string> = {
  momo: "MoMo",
  vnpay: "VNPay",
  "bank:VCB": "Chuyển khoản VCB",
  "bank:TCB": "Chuyển khoản Techcombank",
  "bank:BIDV": "Chuyển khoản BIDV",
};

export default function PaymentTable({ items }: { items: any[] }) {
=======
import { MoreHorizontal } from "lucide-react";

const data = [
  {
    id: "TXN_1A2B3C",
    orderId: "ORD_XYZ789",
    customer: "Nguyễn Văn A",
    date: "2023-10-27 10:30",
    amount: "2,500,000đ",
    method: "Thẻ tín dụng",
    status: "Thành công",
  },
  {
    id: "TXN_4D5E6F",
    orderId: "ORD_PQR456",
    customer: "Trần Thị B",
    date: "2023-10-27 09:45",
    amount: "1,200,000đ",
    method: "Ví MoMo",
    status: "Chờ xử lý",
  },
  {
    id: "TXN_7G8H9I",
    orderId: "ORD_LMN123",
    customer: "Lê Văn C",
    date: "2023-10-26 15:12",
    amount: "5,800,000đ",
    method: "Chuyển khoản",
    status: "Thất bại",
  },
  {
    id: "TXN_J1K2L3",
    orderId: "ORD_IJK012",
    customer: "Phạm Thị D",
    date: "2023-10-25 11:05",
    amount: "3,150,000đ",
    method: "Thẻ tín dụng",
    status: "Đã hoàn tiền",
  },
  {
    id: "TXN_M4N5O6",
    orderId: "ORD_GHI345",
    customer: "Hoàng Văn E",
    date: "2023-10-25 08:20",
    amount: "950,000đ",
    method: "Ví MoMo",
    status: "Thành công",
  },
];

export default function PaymentTable() {
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
  return (
    <div className="bg-white rounded-xl shadow border overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-gray-600 text-sm">
          <tr>
<<<<<<< HEAD
            <th className="p-4">MÃ GD</th>
            <th className="p-4">KHÁCH HÀNG</th>
            <th className="p-4">CHUYẾN ĐI</th>
            <th className="p-4">NGÀY</th>
            <th className="p-4">SỐ TIỀN</th>
            <th className="p-4">PHƯƠNG THỨC</th>
            <th className="p-4">TRẠNG THÁI</th>
=======
            <th className="p-4">MÃ GIAO DỊCH</th>
            <th className="p-4">MÃ ĐƠN HÀNG</th>
            <th className="p-4">KHÁCH HÀNG</th>
            <th className="p-4">NGÀY TẠO</th>
            <th className="p-4">SỐ TIỀN</th>
            <th className="p-4">PHƯƠNG THỨC</th>
            <th className="p-4">TRẠNG THÁI</th>
            <th className="p-4 text-right"></th>
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
          </tr>
        </thead>

        <tbody className="text-sm text-gray-800">
<<<<<<< HEAD
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
=======
          {data.map((row, i) => (
            <tr key={i} className="border-t hover:bg-gray-50">
              <td className="p-4">{row.id}</td>
              <td className="p-4 font-medium text-blue-600">{row.orderId}</td>
              <td className="p-4">{row.customer}</td>
              <td className="p-4">{row.date}</td>
              <td className="p-4 font-semibold">{row.amount}</td>
              <td className="p-4">{row.method}</td>
              <td className="p-4">
                <PaymentStatusBadge status={row.status} />
              </td>
              <td className="p-4 text-right">
                <MoreHorizontal className="w-5 h-5 text-gray-500 cursor-pointer" />
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
