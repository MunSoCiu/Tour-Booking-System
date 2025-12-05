function StatusBadge({ status }: { status: string }) {
  const colors: any = {
    "Hoàn thành": "bg-green-100 text-green-600",
    "Đã xác nhận": "bg-blue-100 text-blue-600",
    "Đã hủy": "bg-red-100 text-red-600",
  };
  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${colors[status]}`}
    >
      {status}
    </span>
  );
}

export default function TripHistory() {
  const trips = [
    {
      title: "Khám phá Vịnh Hạ Long 2N1Đ",
      date: "15/08/2023",
      guests: 2,
      status: "Hoàn thành",
    },
    {
      title: "Tour Đà Nẵng – Hội An",
      date: "20/05/2023",
      guests: 4,
      status: "Hoàn thành",
    },
    {
      title: "Chinh phục Fansipan",
      date: "10/01/2024",
      guests: 1,
      status: "Đã xác nhận",
    },
    {
      title: "Du lịch Phú Quốc 3N2Đ",
      date: "01/12/2022",
      guests: 2,
      status: "Đã hủy",
    },
  ];

  return (
    <div className="bg-white border shadow-sm rounded-xl p-6">
      <h3 className="text-xl font-semibold">Lịch sử chuyến đi của bạn</h3>
      <p className="text-gray-500 text-sm">
        Xem lại các chuyến đi đã đặt và quản lý đơn hàng.
      </p>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="py-2">TÊN TOUR</th>
              <th className="py-2">NGÀY ĐI</th>
              <th className="py-2">SỐ KHÁCH</th>
              <th className="py-2">TRẠNG THÁI</th>
              <th className="py-2">HÀNH ĐỘNG</th>
            </tr>
          </thead>

          <tbody>
            {trips.map((t, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="py-3">{t.title}</td>
                <td className="py-3">{t.date}</td>
                <td className="py-3">{t.guests}</td>
                <td className="py-3">
                  <StatusBadge status={t.status} />
                </td>
                <td className="py-3 text-blue-600 cursor-pointer hover:underline">
                  Xem chi tiết
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
