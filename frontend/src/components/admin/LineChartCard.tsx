"use client";

import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function LineChartCard({ chartData }) {
  const data =
    chartData && chartData.months
      ? chartData.months.map((month: string, index: number) => ({
          month,
          revenue: chartData.revenues[index],
        }))
      : [];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-2">Revenue Analytics</h2>

      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" stroke="#4f46e5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
