"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import TourFilter from "@/components/tour/TourFilter";
import TourCard from "@/components/tour/TourCard";

export default function ToursPage() {
  const API = process.env.NEXT_PUBLIC_API_URL;
  const [tours, setTours] = useState<any[]>([]);
  const [filters, setFilters] = useState<any>({});
  const [page, setPage] = useState(1);
  const pageSize = 6;

  // ================================
  // FETCH TOURS
  // ================================
  useEffect(() => {
    if (!API) return console.error("❌ Missing NEXT_PUBLIC_API_URL");

    fetch(`${API}/tours`)
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data.items ?? [];
        setTours(list);
      })
      .catch((err) => console.error("❌ Error fetching tours:", err));
  }, [API]);

  // ================================
  // FILTER LOGIC
  // ================================
  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      // ======================
      // 1. FILTER LOCATION
      // ======================
      if (
        filters.location &&
        !tour.location.toLowerCase().includes(filters.location.toLowerCase())
      ) {
        return false;
      }

      // ======================
      // 2. FILTER MAX PRICE
      // ======================
      if (filters.maxPrice && tour.price > filters.maxPrice) {
        return false;
      }

      // ======================
      // 3. FILTER BY DAYS (N)
      // ======================
      if (filters.days) {
        const tourDays = Number(tour.duration.split("N")[0]); // tách số ngày
        if (tourDays !== filters.days) return false;
      }

      return true;
    });
  }, [tours, filters]);

  // ================================
  // PAGINATION
  // ================================
  const totalPages = Math.ceil(filteredTours.length / pageSize);
  const paginatedTours = filteredTours.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative h-[260px] w-full overflow-hidden">
        <Image
          src="/images/tours-banner.jpg"
          fill
          alt="Tours Banner"
          className="object-cover brightness-[0.65]"
        />

        <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold drop-shadow">
              Tất Cả Tour Du Lịch
            </h1>
            <p className="text-lg mt-2 opacity-90">
              Khám phá hàng trăm hành trình tuyệt vời dành cho bạn
            </p>
          </div>
        </div>
      </section>

      {/* LIST + FILTER */}
      <div className="py-10 px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* LEFT FILTER */}
          <div className="md:col-span-1">
            <TourFilter onChange={setFilters} />
          </div>

          {/* RIGHT LIST */}
          <div className="md:col-span-3 space-y-6">
            <h2 className="text-2xl font-semibold">
              Tìm thấy {filteredTours.length} tour
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>

            {paginatedTours.length === 0 && (
              <p className="text-center text-gray-500 py-10">
                Không tìm thấy tour phù hợp với bộ lọc.
              </p>
            )}

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-6">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
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
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
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
    </div>
  );
}
