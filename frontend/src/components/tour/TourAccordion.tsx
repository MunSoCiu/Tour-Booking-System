"use client";

import { ChevronDown, MapPin, Clock, DollarSign } from "lucide-react";
import { formatPrice } from "@/lib/utils/formatPrice";

export default function TourAccordion({
  tour = {},
  index,
  open,
  setOpen,
}: {
  tour: any;
  index: number;
  open: number | null;
  setOpen: (n: number | null) => void;
}) {
  const isOpen = open === index;

  return (
    <div className="border rounded-xl bg-white overflow-hidden shadow-sm">
      {/* HEADER */}
      <button
        onClick={() => setOpen(isOpen ? null : index)}
        className="flex justify-between items-center w-full px-4 py-4 text-left hover:bg-gray-50 transition"
      >
        <div>
          <p className="font-semibold text-gray-800">
            {tour.title ?? "Tour không xác định"}
          </p>
          <p className="text-sm text-gray-500">{tour.location ?? "-"}</p>
        </div>

        <ChevronDown
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* CONTENT */}
      {isOpen && (
        <div className="px-4 pb-4 text-gray-700 space-y-3">
          <p>{tour.description ?? "Không có mô tả"}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>{tour.location ?? "Không rõ"}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>{tour.duration ?? "Không rõ"}</span>
            </div>

            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-blue-600" />
              <span>
                {tour.price ? formatPrice(tour.price) + "đ" : "Liên hệ"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
