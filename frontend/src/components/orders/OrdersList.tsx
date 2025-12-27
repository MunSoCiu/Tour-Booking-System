import { useEffect, useState } from "react";
import { fetchMyOrders, cancelOrder } from "@/lib/api/orders";
import Image from "next/image";
import { useRouter } from "next/navigation";
import OrderStatusBadge from "./OrderStatusBadge";
import OrderItemActions from "./OrderItemActions";
import { formatPrice } from "@/lib/utils/formatPrice";

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

  function handlePay(orderId: string) {
    router.push(`/payment?orderId=${orderId}`);
  }

  async function retryPayment(orderId: string) {
    await fetch(`/orders/${orderId}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ status: "pending" }),
    });

    setData((prev: any) => ({
      ...prev,
      items: prev.items.map((o: any) =>
        o.id === orderId ? { ...o, status: "pending" } : o
      ),
    }));
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
    </>
  );
}
