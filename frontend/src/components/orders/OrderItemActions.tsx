export default function OrderItemActions({ status }: { status: string }) {
  return (
    <div className="flex flex-col items-end gap-3">
      {status === "Đã xác nhận" && (
        <>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Xem Chi Tiết
          </button>
          <p className="text-gray-500 text-sm">Hỗ trợ</p>
        </>
      )}

      {status === "Chờ thanh toán" && (
        <>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Thanh Toán
          </button>
          <button className="text-red-500 text-sm hover:underline">
            Hủy Đơn
          </button>
        </>
      )}

      {status === "Đã hoàn thành" && (
        <>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Viết đánh giá
          </button>
          <button className="text-gray-600 text-sm hover:underline">
            Đặt lại
          </button>
        </>
      )}
    </div>
  );
}
