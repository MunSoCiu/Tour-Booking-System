"use client";

<<<<<<< HEAD
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
=======
import { useState } from "react";

const FILTERS = ["Tất cả", "Thành công", "Chờ xử lý", "Thất bại"];

export default function PaymentFilter() {
  const [active, setActive] = useState("Tất cả");

  return (
    <div className="flex gap-3 flex-wrap">
      {FILTERS.map((tag) => (
        <button
          key={tag}
          onClick={() => setActive(tag)}
          className={`px-4 py-2 rounded-lg text-sm border transition 
          ${
            active === tag
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          {tag}
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
        </button>
      ))}
    </div>
  );
}
