import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function StatCard({
  title,
  value,
  change,
  trend,
}: {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
}) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border">
      <p className="text-gray-600 text-sm">{title}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>

      <div
        className={`flex items-center gap-1 mt-2 font-medium ${
          trend === "up" ? "text-green-600" : "text-red-500"
        }`}
      >
        {trend === "up" ? <ArrowUpRight /> : <ArrowDownRight />}
        {change}
      </div>
    </div>
  );
}
