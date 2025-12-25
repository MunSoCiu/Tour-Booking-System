"use client";

import { useEffect, useState } from "react";
import { fetchMyOrders, cancelOrder } from "@/lib/api/orders";
import Image from "next/image";
import OrderStatusBadge from "./OrderStatusBadge";
import OrderItemActions from "./OrderItemActions";
import { formatPrice } from "@/lib/utils/formatPrice";

export default function OrdersList() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetchMyOrders().then(setOrders);
  }, []);

  return (
    <>
      {orders.map((o) => (
        <div
          key={o.id}
          className="bg-white shadow-sm border rounded-xl p-5 flex gap-5"
        >
          <Image
            src={o.items?.[0]?.tour?.image || "/images/default.jpg"}
            width={150}
            height={100}
            alt=""
            className="rounded-lg"
          />

          <div className="flex-1">
            <div className="flex justify-between">
              <h3 className="font-semibold text-lg">
                {o.items?.[0]?.tour?.title}
              </h3>
              <OrderStatusBadge status={o.status} />
            </div>

            <p className="text-sm text-gray-500 mt-1">Mã đơn: {o.code}</p>

            <div className="grid grid-cols-3 mt-4 text-sm">
              <div>
                <p className="text-gray-500">Số lượng</p>
                <p>{o.items[0].qty}</p>
              </div>
              <div>
                <p className="text-gray-500">Tổng</p>
                <p className="text-blue-600 font-medium">
                  {formatPrice(o.total)}
                </p>
              </div>
            </div>
          </div>

          <OrderItemActions
            status={o.status}
            onCancel={() =>
              cancelOrder(o.id).then(() =>
                setOrders((prev) =>
                  prev.map((x) =>
                    x.id === o.id ? { ...x, status: "cancelled" } : x
                  )
                )
              )
            }
          />
        </div>
      ))}
    </>
  );
}
