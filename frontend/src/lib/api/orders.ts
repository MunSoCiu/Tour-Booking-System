import api from "./client";

export async function fetchMyOrders() {
  const res = await api.get("/orders/my");
  return res.data;
}

export async function cancelOrder(id: string) {
  return api.put(`/orders/${id}/cancel`);
}
