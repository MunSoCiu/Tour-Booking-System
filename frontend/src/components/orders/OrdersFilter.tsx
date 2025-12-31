"use client";

<<<<<<< HEAD
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
=======
import { useState } from "react";

const TABS = [
  "Tất cả",
  "Chờ thanh toán",
  "Đã xác nhận",
  "Đã hoàn thành",
  "Đã hủy",
];

export default function OrdersFilter() {
  const [active, setActive] = useState("Tất cả");

  return (
    <div className="flex gap-3 flex-wrap">
      {TABS.map((tab) => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={`px-4 py-2 rounded-lg text-sm border transition 
          ${
            active === tab
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white hover:bg-gray-100"
          }`}
        >
<<<<<<< HEAD
          {t.label}
=======
          {tab}
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
        </button>
      ))}
    </div>
  );
}
