"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import PromotionCard from "@/components/deals/PromotionCard";

export default function DealsPage() {
  const API = process.env.NEXT_PUBLIC_API_URL;
  const [tours, setTours] = useState([]);
  const [filter, setFilter] = useState("all");

  /* ============= LOAD DEAL TOURS ============= */
  const loadDeals = () => {
    if (!API) return;

    let url = `${API}/tours`;

    if (filter !== "all") {
      url += `?dealType=${filter}`;
    }

    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data.items ?? [];
        setTours(list.filter((t) => t.discount > 0));
      });
  };

  useEffect(() => {
    loadDeals();
  }, [filter]);

  /* LABELS FOR FILTER BUTTONS */
  const filters = [
    { key: "all", label: "Tất Cả" },
    { key: "seasonal", label: "Tour theo mùa" },
    { key: "flash", label: "Flash Sale" },
    { key: "vip", label: "Khách hàng thân thiết" },
    { key: "early", label: "Đặt sớm" },
    { key: "gold", label: "Gói vàng" },
    { key: "silver", label: "Gói bạc" },
    { key: "diamond", label: "Gói kim cương" },
  ];

  return (
    <div className="w-full">
      {/* HERO */}
      <section className="relative h-[360px] w-full">
        <Image
          src="/images/deals.jpg"
          alt="Deals Hero"
          fill
          className="object-cover brightness-75"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white font-bold text-4xl md:text-5xl drop-shadow-lg">
            Săn Ưu Đãi Vàng, Du Lịch Thả Ga
          </h1>
          <p className="text-white mt-3 text-lg opacity-90 max-w-2xl">
            Khám phá các chương trình khuyến mãi hấp dẫn nhất.
          </p>
        </div>
      </section>

      {/* FILTERS */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Tất Cả Khuyến Mãi</h2>

          <div className="flex gap-3 flex-wrap">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-4 py-2 rounded-full border transition ${
                  filter === f.key
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-gray-100 hover:bg-gray-200 border-gray-300"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* DEAL GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((t) => (
            <PromotionCard
              key={t.id}
              tag={`-${t.discount}%`}
              tagColor="bg-red-600"
              title={t.title}
              desc={t.description}
              valid={`${t.dealStart?.substring(0, 10)} → ${t.dealEnd?.substring(
                0,
                10
              )}`}
              oldPrice={t.price + "đ"}
              price={Math.round(t.price - (t.price * t.discount) / 100) + "đ"}
              image={t.image}
              slug={t.slug}
            />
          ))}

          {tours.length === 0 && (
            <div className="col-span-3 text-center text-gray-500 py-10">
              Không có ưu đãi nào trong mục này.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
