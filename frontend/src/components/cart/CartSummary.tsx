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
    <div className="bg-white border rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">Tóm tắt đơn hàng</h2>

      {items.map((i, idx) => (
        <div key={idx} className="flex justify-between text-sm">
          <span>{i.name}</span>
          <span>{i.price.toLocaleString()} ₫</span>
        </div>
      ))}

      <div className="flex justify-between mt-2">
        <span>Phí dịch vụ</span>
        <span>{serviceFee.toLocaleString()} ₫</span>
      </div>

      <div className="flex justify-between mt-4 font-bold">
        <span>Tổng cộng</span>
        <span className="text-blue-600">{total.toLocaleString()} ₫</span>
      </div>

      <button
        onClick={onPay}
        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg"
      >
        Thanh toán
      </button>
    </div>
  );
}
