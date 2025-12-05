"use client";

import { ChevronDown } from "lucide-react";

export default function TourAccordion({
  title,
  content,
  index,
  open,
  setOpen,
}: {
  title: string;
  content: string;
  index: number;
  open: number | null;
  setOpen: (n: number | null) => void;
}) {
  const active = open === index;

  return (
    <div className="border rounded-xl overflow-hidden bg-white">
      <button
        onClick={() => setOpen(active ? null : index)}
        className="flex justify-between w-full px-4 py-4 font-medium text-left"
      >
        {title}
        <ChevronDown
          className={`transition-transform ${active ? "rotate-180" : ""}`}
        />
      </button>

      {active && (
        <div className="px-4 pb-4 text-gray-700 leading-relaxed">{content}</div>
      )}
    </div>
  );
}
