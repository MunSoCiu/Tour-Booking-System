"use client";

import { useEffect, useMemo, useState } from "react";
import TourFilter from "@/components/tour/TourFilter";
import TourCard from "@/components/tour/TourCard";

export default function TourListPage() {
  const API = process.env.NEXT_PUBLIC_API_URL;

  const [tours, setTours] = useState<any[]>([]);
  const [filters, setFilters] = useState<any>({});
  const [page, setPage] = useState(1);
  const pageSize = 6;

  // ================================
  // FETCH TOURS FROM API
  // ================================
  useEffect(() => {
    if (!API) return;

    const params = new URLSearchParams();

    if (filters.location) params.append("location", filters.location);
    if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
    if (filters.days) params.append("days", filters.days);

    params.append("page", "1"); // backend lấy full
    params.append("limit", "200"); // đủ 50 tour

    fetch(`${API}/tours?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        const items = data?.items ?? [];
        setTours(items);
        setPage(1); // reset khi filter đổi
      })
      .catch((err) => console.error("❌ Fetch error:", err));
  }, [API, filters]);

  // ================================
  // LOCAL FILTER (FE FILTER)
  // ================================
  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      // 1. LOCATION
      if (
        filters.location &&
        !tour.location.toLowerCase().includes(filters.location.toLowerCase())
      ) {
        return false;
      }

      // 2. MAX PRICE
      if (filters.maxPrice && tour.price > filters.maxPrice) {
        return false;
      }

      if (filters.days) {
        const tourDays = Number(tour.duration.split("N")[0]);
        if (tourDays !== filters.days) return false;
      }

      return true;
    });
  }, [tours, filters]);

  // ================================
  // PAGINATION
  // ================================
  const totalPages = Math.ceil(filteredTours.length / pageSize);

  const paginatedTours = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredTours.slice(start, start + pageSize);
  }, [filteredTours, page]);

  return (
    <div className="w-full py-10 px-4 md:px-8 lg:px-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {/* LEFT SIDEBAR FILTER */}
        <div className="md:col-span-1">
          <TourFilter onChange={setFilters} />
        </div>

        {/* RIGHT LIST */}
        <div className="md:col-span-3 space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Danh sách tour</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>

          {paginatedTours.length === 0 && (
            <p className="text-gray-500 text-center py-10">
              Không tìm thấy tour phù hợp.
            </p>
          )}

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-3 py-1 border rounded-lg disabled:opacity-40"
              >
                Trước
              </button>

              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-1 border rounded-lg ${
                    page === i + 1
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="px-3 py-1 border rounded-lg disabled:opacity-40"
              >
                Sau
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
