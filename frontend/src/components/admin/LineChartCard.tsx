"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", value: 200 },
  { month: "Feb", value: 240 },
  { month: "Mar", value: 300 },
  { month: "Apr", value: 350 },
  { month: "May", value: 420 },
  { month: "Jun", value: 500 },
  { month: "Jul", value: 590 },
  { month: "Aug", value: 700 },
];

export default function LineChartCard() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border h-[360px]">
      <h3 className="font-semibold mb-4">Thống kê doanh thu</h3>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#2563eb"
            strokeWidth={3}
            dot
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
