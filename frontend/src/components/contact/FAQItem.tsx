"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="bg-gray-100 rounded-lg px-4 py-3 cursor-pointer select-none"
      onClick={() => setOpen(!open)}
    >
      <div className="flex justify-between items-center">
        <p className="font-medium">{question}</p>
        <ChevronDown
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>

      {open && (
        <p className="mt-2 text-gray-600 text-sm leading-relaxed">{answer}</p>
      )}
    </div>
  );
}
