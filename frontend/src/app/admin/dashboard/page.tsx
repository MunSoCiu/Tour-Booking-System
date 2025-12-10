"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";
import StatCard from "@/components/admin/StatCard";
import LineChartCard from "@/components/admin/LineChartCard";
import TopToursCard from "@/components/admin/TopToursCard";

export default function DashboardPage() {
  const API = process.env.NEXT_PUBLIC_API_URL;

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState<any>(null);
  const [chart, setChart] = useState<any>(null);
  const [topTours, setTopTours] = useState<any>(null);

  // ================================
  // FETCH DASHBOARD DATA
  // ================================
  const fetchDashboardData = async () => {
    try {
      const [statsRes, chartRes, topRes] = await Promise.all([
        fetch(`${API}/admin/stats`),
        fetch(`${API}/admin/stats/revenue-chart`),
        fetch(`${API}/admin/stats/top-tours`),
      ]);

      const statsData = await statsRes.json();
      const chartData = await chartRes.json();
      const topData = await topRes.json();

      setStats(statsData);
      setChart(chartData);
      setTopTours(topData);
    } catch (error) {
      console.error("Failed to load dashboard:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading || !stats) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Đang tải dữ liệu Dashboard...
      </div>
    );
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* LEFT SIDEBAR */}
      <Sidebar />

      {/* MAIN AREA */}
      <div className="flex-1">
        <Navbar />

        <div className="p-6">
          {/* TITLE */}
          <h1 className="text-2xl font-semibold">Bảng điều khiển tổng quan</h1>
          <p className="text-gray-600 mt-1">
            Chào mừng trở lại, cùng xem thống kê hôm nay nhé!
          </p>

          {/* STAT CARDS – Version đúng */}
          <div className="mt-6">
            <StatCard stats={stats} />
          </div>

          {/* MAIN CHART AREA */}
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
