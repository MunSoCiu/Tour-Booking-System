"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function FAQ({ question }: { question: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="bg-gray-100 rounded-lg px-4 py-3 cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="flex justify-between items-center">
        <p>{question}</p>
        <ChevronDown
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </div>

      {open && (
        <p className="mt-2 text-gray-600 text-sm">
          Nội dung câu trả lời mẫu. Bạn có thể thay bằng nội dung thật từ
          backend.
        </p>
      )}
    </div>
  );
}
