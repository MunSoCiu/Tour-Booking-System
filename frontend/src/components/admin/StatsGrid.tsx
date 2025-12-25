"use client";
export default function StatsGrid({ stats }) {
  if (!stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card label="Users" value={stats.totalUsers} />
      <Card label="Tours" value={stats.totalTours} />
      <Card label="Orders" value={stats.totalOrders} />
      <Card label="Revenue" value={stats.totalRevenue.toLocaleString()} />
    </div>
  );
}

function Card({ label, value }) {
  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <p className="text-gray-500">{label}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="p-4 bg-white shadow rounded-lg animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
      <div className="h-6 bg-gray-300 rounded w-1/2"></div>
    </div>
  );
}
