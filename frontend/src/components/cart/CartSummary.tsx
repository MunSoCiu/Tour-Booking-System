export default function CartSummary({
  items,
  serviceFee,
  onPay,
}: {
  items: { name: string; price: number }[];
  serviceFee: number;
  onPay: () => void;
}) {
  const total = items.reduce((sum, item) => sum + item.price, 0) + serviceFee;

  return (
    <div className="bg-white border rounded-2xl p-6 sticky top-24">
      <h2 className="text-xl font-semibold mb-4">Tóm tắt đơn hàng</h2>

      <div className="space-y-2 text-sm">
        {items.map((i, idx) => (
          <div key={idx} className="flex justify-between">
            <span>{i.name}</span>
            <span>{i.price.toLocaleString()} ₫</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-3">
        <span>Phí dịch vụ</span>
        <span>{serviceFee.toLocaleString()} ₫</span>
      </div>

      <div className="flex justify-between mt-4 pt-4 border-t font-bold">
        <span>Tổng cộng</span>
        <span className="text-blue-600 text-lg">
          {total.toLocaleString()} ₫
        </span>
      </div>

      <button
        onClick={onPay}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
      >
        Tiến hành thanh toán
      </button>

      <p className="text-xs text-gray-500 mt-2 text-center">
        Bạn sẽ được chuyển đến trang thanh toán an toàn.
      </p>
    </div>
  );
}
