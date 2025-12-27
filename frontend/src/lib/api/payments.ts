import api from "@/lib/api/client";

export async function fetchMyPayments(params?: {
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}) {
  const res = await api.get("/payments/my", { params });
  return res.data;
}

export async function createMomoPayment(payload: {
  orderId: string;
  amount: number;
  orderInfo: string;
}) {
  const res = await api.post("/payments/momo", payload);
  return res.data; // { payUrl }
}

export async function createVnpayPayment(payload: {
  orderId: string;
  amount: number;
  ipAddr: string;
}) {
  const res = await api.post("/payments/vnpay", payload);
  return res.data; // { url }
}
