export default function OrderItemActions({
  status,
  onCancel,
}: {
  status: string;
  onCancel: () => void;
}) {
  return (
    <div className="flex flex-col items-end gap-3">
      {status === "pending" && (
        <>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Thanh Toán
          </button>
          <button
            onClick={onCancel}
            className="text-red-500 text-sm hover:underline"
          >
            Hủy Đơn
          </button>
        </>
      )}

      {status === "success" && (
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Xem Chi Tiết
        </button>
      )}
    </div>
  );
}
