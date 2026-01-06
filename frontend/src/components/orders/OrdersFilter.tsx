"use client";

const TABS = [
  { label: "Tất cả", value: "" },
  { label: "Chờ thanh toán", value: "pending" },
  { label: "Đã hoàn thành", value: "success" },
  { label: "Đã hủy", value: "cancelled" },
];

export default function OrdersFilter({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex gap-3 flex-wrap">
      {TABS.map((t) => (
        <button
          key={t.value}
          onClick={() => onChange(t.value)}
          className={`px-4 py-2 rounded-lg text-sm border transition
          ${
            value === t.value
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
