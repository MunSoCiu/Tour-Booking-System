<<<<<<< HEAD
import { useEffect, useState } from "react";
import { fetchMyOrders, cancelOrder } from "@/lib/api/orders";
import Image from "next/image";
import { useRouter } from "next/navigation";
import OrderStatusBadge from "./OrderStatusBadge";
import OrderItemActions from "./OrderItemActions";
import { formatPrice } from "@/lib/utils/formatPrice";
import { retryOrderPayment } from "@/lib/api/orders";

export default function OrdersList({
  status,
  search,
  page,
}: {
  status: string;
  search: string;
  page: number;
}) {
  const [data, setData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    fetchMyOrders({ status, search, page }).then(setData);
  }, [status, search, page]);

  if (!data) return <div>Đang tải...</div>;

  function handleCancel(orderId: string) {
    if (!confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?")) return;

    cancelOrder(orderId).then(() => {
      setData({
        ...data,
        items: data.items.map((o: any) =>
          o.id === orderId ? { ...o, status: "cancelled" } : o
        ),
      });
    });
  }

  async function retryPayment(orderId: string) {
    await retryOrderPayment(orderId);

    setData((prev: any) => ({
      ...prev,
      items: prev.items.map((o: any) =>
        o.id === orderId ? { ...o, status: "pending" } : o
      ),
    }));
  }

  function handlePay(orderId: string) {
    router.push(`/payment?orderId=${orderId}`);
  }

  function handleDelete(orderId: string) {
    if (!confirm("Bạn có chắc chắn muốn xóa đơn hàng này không?")) return;

    fetch(`/orders/${orderId}`, {
      method: "DELETE",
      credentials: "include",
    }).then(() => {
      setData({
        ...data,
        items: data.items.filter((o: any) => o.id !== orderId),
      });
    });
  }

  return (
    <>
      {data.items.map((o: any) => {
        const item = o.items[0];

        return (
          <div
            key={o.id}
            className="bg-white border rounded-2xl p-6 grid grid-cols-[120px_1fr_auto] gap-6 items-center"
          >
            {/* IMAGE */}
            <Image
              src={item.tourImage || "/images/default.jpg"}
              width={120}
              height={90}
              alt={item.tourTitle}
              className="rounded-xl object-cover border"
            />

            {/* INFO */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {item.tourTitle}
              </h3>

              <p className="text-base text-gray-500 mt-1">
                Mã đơn: <span className="font-medium">{o.code}</span>
              </p>

              <p className="text-sm text-gray-500">
                Ngày đặt:{" "}
                <span className="font-medium">
                  {new Date(o.createdAt).toLocaleDateString("vi-VN")}
                </span>
              </p>

              <div className="grid grid-cols-3 mt-4 text-sm gap-6">
                <div>
                  <p className="text-gray-500">Số lượng</p>
                  <p className="font-medium">{item.qty}</p>
                </div>

                <div>
                  <p className="text-gray-500">Giá gốc</p>
                  <p className="line-through text-gray-400">
                    {formatPrice(item.price * item.qty)}
                  </p>
                </div>

                {item.discount > 0 && (
                  <div>
                    <p className="text-gray-500">Ưu đãi</p>
                    <p className="text-green-600 font-semibold">
                      -{item.discount}%
                    </p>
                  </div>
                )}

                <div>
                  <p className="text-gray-500">Tổng</p>
                  <p className="text-blue-600 font-semibold text-lg">
                    {formatPrice(o.total)}
                  </p>
                </div>
              </div>
            </div>

            {/* STATUS + ACTIONS */}
            <div className="flex flex-col items-end justify-center gap-3 min-w-[140px]">
              <OrderStatusBadge status={o.status} />

              <OrderItemActions
                status={o.status}
                onCancel={() => handleCancel(o.id)}
                onPay={() => handlePay(o.id)}
                onDelete={() => handleDelete(o.id)}
                onRetryPay={() => retryPayment(o.id)}
              />
            </div>
          </div>
        );
      })}
=======
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
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
    </>
  );
}
