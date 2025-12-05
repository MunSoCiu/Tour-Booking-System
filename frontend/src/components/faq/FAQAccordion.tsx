"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQAccordion({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded-lg bg-white shadow-sm">
      <button
        className="flex justify-between w-full p-4 text-left font-medium"
        onClick={() => setOpen(!open)}
      >
        {question}
        <ChevronDown
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="px-4 pb-4 text-gray-600 leading-relaxed">{answer}</div>
      )}
    </div>
  );
}
