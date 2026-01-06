import api from "@/lib/api/client";

export async function fetchMyOrders(params: any) {
  const res = await api.get("/orders/my", { params });
  return {
    items: res.data,
  };
}

export async function retryOrderPayment(orderId: string) {
  const res = await api.post(`/orders/${orderId}/retry-payment`);
  return res.data;
}

export async function cancelOrder(orderId: string) {
  await api.put(`/orders/${orderId}/cancel`);
}
