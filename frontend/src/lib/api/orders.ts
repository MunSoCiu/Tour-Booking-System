import api from "@/lib/api/client";

export async function fetchMyOrders(params?: {
  status?: string;
  search?: string;
  page?: number;
}) {
  const res = await api.get("/orders/my", { params });
  return res.data;
}

export async function retryOrderPayment(orderId: string) {
  const res = await api.post(`/orders/${orderId}/retry-payment`);
  return res.data;
}

export async function cancelOrder(orderId: string) {
  await api.put(`/orders/${orderId}/cancel`);
}
