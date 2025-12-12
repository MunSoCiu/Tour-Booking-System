"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";
import StatCard from "@/components/admin/StatCard";
import LineChartCard from "@/components/admin/LineChartCard";
import TopToursCard from "@/components/admin/TopToursCard";

import {
  fetchAdminStats,
  fetchRevenueChart,
  fetchTopTours,
} from "@/lib/api/admin";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [chart, setChart] = useState<any>(null);
  const [topTours, setTopTours] = useState<any>(null);

  useEffect(() => {
    async function load() {
      try {
        const [s, c, t] = await Promise.all([
          fetchAdminStats(),
          fetchRevenueChart(),
          fetchTopTours(),
        ]);
        setStats(s);
        setChart(c);
        setTopTours(t);
      } catch (err) {
        console.error("Dashboard load error:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Đang tải dữ liệu Dashboard...
      </div>
    );
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <h1 className="text-2xl font-semibold">Bảng điều khiển tổng quan</h1>
          <p className="text-gray-600 mt-1">
            Chào mừng trở lại, cùng xem thống kê hôm nay nhé!
          </p>

          <div className="mt-6">
            <StatCard stats={stats} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2">
              <LineChartCard chartData={chart} />
            </div>

            <TopToursCard tours={topTours} />
          </div>
        </div>
      </div>
    </div>
  );
}
