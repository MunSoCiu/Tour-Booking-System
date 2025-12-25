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
    chartData?.months?.map((month: string, index: number) => ({
      month: "Th " + month,
      revenue: chartData.revenues[index],
    })) ?? [];

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Thống kê doanh thu
        </h2>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" stroke="#6b7280" />
          <YAxis
            stroke="#6b7280"
            tickFormatter={(v) => v.toLocaleString("vi-VN")}
          />
          <Tooltip
            formatter={(value) => value.toLocaleString("vi-VN") + " đ"}
            labelFormatter={(label) => `${label}`}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#3B82F6"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
