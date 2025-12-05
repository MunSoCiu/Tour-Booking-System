"use client";

import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";
import StatCard from "@/components/admin/StatCard";
import LineChartCard from "@/components/admin/LineChartCard";
import TopToursCard from "@/components/admin/TopToursCard";

export default function DashboardPage() {
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
            Chào mừng trở lại, cùng xem hôm nay có gì mới nhé!
          </p>

          {/* STAT CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <StatCard
              title="Tổng doanh thu"
              value="2,15 Tỷ"
              change="+5.2%"
              trend="up"
            />

            <StatCard
              title="Tổng tour đã đặt"
              value="1,230"
              change="+2.1%"
              trend="up"
            />

            <StatCard
              title="Người dùng mới"
              value="89"
              change="+10%"
              trend="up"
            />

            <StatCard
              title="Tour đang hoạt động"
              value="150"
              change="-1.5%"
              trend="down"
            />
          </div>

          {/* MAIN CHART AREA */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2">
              <LineChartCard />
            </div>

            <TopToursCard />
          </div>
        </div>
      </div>
    </div>
  );
}
