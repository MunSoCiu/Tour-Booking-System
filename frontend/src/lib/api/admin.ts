export async function fetchAdminStats() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/stats`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch admin stats");
  return res.json();
}

export async function fetchRevenueChart() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/stats/revenue-chart`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error("Failed to fetch revenue chart");
  return res.json();
}

export async function fetchTopTours() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/stats/top-tours`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error("Failed to fetch top tours");
  return res.json();
}
