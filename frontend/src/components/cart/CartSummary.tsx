import { formatPrice } from "@/lib/utils/formatPrice";
import Link from "next/link";

export default function CartSummary({
  items,
  serviceFee,
}: {
  items: { name: string; price: number }[];
  serviceFee: number;
}) {
  const total = items.reduce((sum, item) => sum + item.price, 0) + serviceFee;

  return (
    <div className="bg-white shadow-sm border rounded-xl p-6 h-max">
      <h2 className="text-xl font-semibold mb-4">Tóm tắt đơn hàng</h2>

      <div className="space-y-2 text-gray-700 text-sm">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between">
            <span>{item.name}</span>
            <span>{formatPrice(item.price)}</span>
          </div>
        ))}

        <div className="flex justify-between">
          <span>Phí dịch vụ</span>
          <span>{formatPrice(serviceFee)}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t flex justify-between text-lg font-bold">
        <span>Tổng cộng</span>
        <span className="text-blue-600">{formatPrice(total)}</span>
      </div>

      <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition">
        Tiến hành thanh toán
      </button>

      <p className="text-xs text-gray-500 text-center mt-2">
        Bạn sẽ được chuyển đến trang thanh toán an toàn.
      </p>
    </div>
  );
}
