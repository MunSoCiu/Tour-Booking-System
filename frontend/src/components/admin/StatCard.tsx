"use client";

import { Users, Plane, ShoppingBag, DollarSign } from "lucide-react";

export default function StatCard({ stats }: { stats: any }) {
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

  const cards = [
    {
      label: "Người dùng",
      value: stats.totalUsers,
      icon: <Users className="w-6 h-6 text-blue-600" />,
      bg: "bg-blue-50",
    },
    {
      label: "Tour đang hoạt động",
      value: stats.totalTours,
      icon: <Plane className="w-6 h-6 text-green-600" />,
      bg: "bg-green-50",
    },
    {
      label: "Tổng đơn hàng",
      value: stats.totalOrders,
      icon: <ShoppingBag className="w-6 h-6 text-orange-500" />,
      bg: "bg-orange-50",
    },
    {
      label: "Doanh thu",
      value: (stats?.totalRevenue ?? 0).toLocaleString("vi-VN") + " đ",
      icon: <DollarSign className="w-6 h-6 text-purple-600" />,
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {cards.map((c, i) => (
        <Card key={i} label={c.label} value={c.value} icon={c.icon} bg={c.bg} />
      ))}
    </div>
  );
}

function Card({
  label,
  value,
  icon,
  bg,
}: {
  label: string;
  value: any;
  icon: any;
  bg: string;
}) {
  return (
    <div className="p-5 bg-white shadow rounded-xl flex items-center gap-4 border border-gray-100 hover:shadow-md transition">
      <div className={`${bg} p-3 rounded-lg flex items-center justify-center`}>
        {icon}
      </div>

      <div>
        <p className="text-gray-500 text-sm">{label}</p>
        <h2 className="text-2xl font-bold mt-1">{value}</h2>
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="p-4 bg-white shadow rounded-xl animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
      <div className="h-6 bg-gray-300 rounded w-1/2"></div>
    </div>
  );
}
