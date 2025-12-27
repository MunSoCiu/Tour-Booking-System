"use client";

const FILTERS = [
  { label: "Tất cả", value: "all" },
  { label: "Thành công", value: "success" },
  { label: "Chờ xử lý", value: "pending" },
  { label: "Thất bại", value: "failed" },
];

export default function PaymentFilter({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex gap-3 flex-wrap">
      {FILTERS.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={`px-4 py-2 rounded-lg text-sm border transition
            ${
              value === f.value
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white hover:bg-gray-100"
            }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
