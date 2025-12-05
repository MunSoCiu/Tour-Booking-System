import OrderStatusBadge from "./OrderStatusBadge";
import OrderItemActions from "./OrderItemActions";
import Image from "next/image";

const orders = [
  {
    img: "/images/halong.jpg",
    title: "Khám Phá Vịnh Hạ Long – Du thuyền 5 sao",
    code: "#8A4B2C",
    date: "25/12/2024",
    guests: "2 người lớn",
    price: "5.990.000đ",
    status: "Đã xác nhận",
  },
  {
    img: "/images/hoian.jpg",
    title: "Tour Phố Cổ Hội An & Làng Gốm Thanh Hà",
    code: "#9B1D5E",
    date: "15/01/2025",
    guests: "1 người lớn, 1 trẻ em",
    price: "2.150.000đ",
    status: "Chờ thanh toán",
  },
  {
    img: "/images/sapa.jpg",
    title: "Trekking Sapa – Chinh phục Fansipan",
    code: "#3F7E9A",
    date: "10/09/2023",
    guests: "4 người lớn",
    price: "12.400.000đ",
    status: "Đã hoàn thành",
  },
];

export default function OrdersList() {
  return (
    <>
      {orders.map((o, i) => (
        <div
          key={i}
          className="bg-white shadow-sm border rounded-xl p-5 flex gap-5 items-start"
        >
          <Image
            src={o.img}
            width={150}
            height={100}
            alt={o.title}
            className="rounded-lg object-cover"
          />

          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-lg">{o.title}</h3>
              <OrderStatusBadge status={o.status} />
            </div>

            <p className="text-sm text-gray-500 mt-1">Mã đơn hàng: {o.code}</p>

            <div className="grid grid-cols-3 mt-4 text-sm text-gray-700">
              <div>
                <p className="text-gray-500">Ngày đi</p>
                <p className="font-medium">{o.date}</p>
              </div>

              <div>
                <p className="text-gray-500">Số lượng</p>
                <p className="font-medium">{o.guests}</p>
              </div>

              <div>
                <p className="text-gray-500">Tổng giá</p>
                <p className="font-medium text-blue-600">{o.price}</p>
              </div>
            </div>
          </div>

          <OrderItemActions status={o.status} />
        </div>
      ))}
    </>
  );
}
