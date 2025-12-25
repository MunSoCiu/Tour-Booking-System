const API = process.env.NEXT_PUBLIC_API_URL;

/* ================= AUTH HEADER ================= */

function authHeader() {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/* ================= DASHBOARD ================= */

export async function fetchAdminStats() {
  const res = await fetch(`${API}/admin/stats`, {
    cache: "no-store",
    headers: authHeader(),
  });
  if (!res.ok) throw new Error("fetchAdminStats failed");
  return res.json();
}

export async function fetchRevenueChart() {
  const res = await fetch(`${API}/admin/stats/revenue-chart`, {
    cache: "no-store",
    headers: authHeader(),
  });
  if (!res.ok) throw new Error("fetchRevenueChart failed");
  return res.json();
}

export async function fetchTopTours() {
  const res = await fetch(`${API}/admin/stats/top-tours`, {
    cache: "no-store",
    headers: authHeader(),
  });
  if (!res.ok) throw new Error("fetchTopTours failed");
  return res.json();
}

/* ================= USERS ================= */

export async function fetchAdminUsers() {
  const res = await fetch(`${API}/admin/users`, {
    cache: "no-store",
    headers: authHeader(),
  });
  if (!res.ok) throw new Error("fetchAdminUsers failed");
  return res.json();
}

export async function fetchAdminUserStats() {
  const res = await fetch(`${API}/admin/users/stats`, {
    cache: "no-store",
    headers: authHeader(),
  });
  if (!res.ok) throw new Error("fetchAdminUserStats failed");
  return res.json();
}

/* ================= ORDERS ================= */

export async function fetchAdminOrders() {
  const res = await fetch(`${API}/admin/orders`, {
    cache: "no-store",
    headers: authHeader(),
  });
  if (!res.ok) throw new Error("fetchAdminOrders failed");
  return res.json();
}

export async function fetchAdminOrderStats() {
  const res = await fetch(`${API}/admin/orders/stats`, {
    cache: "no-store",
    headers: authHeader(),
  });
  if (!res.ok) throw new Error("fetchAdminOrderStats failed");
  return res.json();
}
