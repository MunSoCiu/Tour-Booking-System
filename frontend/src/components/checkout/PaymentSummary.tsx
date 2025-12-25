import { formatPrice } from "@/lib/utils/formatPrice";
import { Lock } from "lucide-react";

export default function PaymentSummary({
  items,
  serviceFee,
  onPay,
}: {
  items: { name: string; price: number }[];
  serviceFee: number;
  onPay: () => void;
}) {
  const total = items.reduce((sum, i) => sum + i.price, 0) + serviceFee;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border h-max">
      <h2 className="text-lg font-semibold mb-4">Tóm tắt đơn hàng</h2>

      <div className="space-y-2 text-gray-700 text-sm">
        {items.map((item, i) => (
          <div key={i} className="flex justify-between">
            <span>{item.name}</span>
            <span>{formatPrice(item.price)}</span>
          </div>
        ))}

        <div className="flex justify-between">
          <span>Phí dịch vụ</span>
          <span>{formatPrice(serviceFee)}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t flex justify-between text-xl font-bold">
        <span>Tổng cộng</span>
        <span className="text-blue-600">{formatPrice(total)}</span>
      </div>

      <button
        onClick={onPay}
        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2"
      >
        <Lock className="w-4 h-4" />
        Hoàn tất thanh toán
      </button>

      <p className="text-xs text-gray-500 text-center mt-2">
        Giao dịch an toàn và bảo mật.
      </p>
    </div>
  );
}
