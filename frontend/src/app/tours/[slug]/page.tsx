"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MapPin, Clock, DollarSign, Star } from "lucide-react";
import TourAccordion from "@/components/tour/TourAccordion";
import { formatPrice } from "@/lib/utils/formatPrice";

export default function TourDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const API = process.env.NEXT_PUBLIC_API_URL;
  const [tour, setTour] = useState<any>(null);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [open, setOpen] = useState<number | null>(0);

  // ================================
  // FETCH TOUR BY SLUG
  // ================================
  useEffect(() => {
    if (!API) return;

    fetch(`${API}/tours/${params.slug}`)
      .then((res) => (res.ok ? res.json() : notFound()))
      .then((data) => setTour(data))
      .catch(() => notFound());
  }, [API, params.slug]);

  // ================================
  // FETCH TESTIMONIALS ONLY WHEN TOUR LOADED
  // ================================
  useEffect(() => {
    if (!API || !tour) return;

    fetch(`${API}/testimonials`)
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) return;

        // Lọc đánh giá đúng tour
        const list = data.filter((t) => t.tourName === tour.title);
        setTestimonials(list);
      });
  }, [API, tour]);

  // ================================
  // LOADING STATE
  // ================================
  if (!tour) {
    return (
      <div className="text-center py-16 text-gray-500">
        Đang tải thông tin tour...
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* HERO IMAGE */}
      <div className="relative w-full h-[420px]">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          className="object-cover brightness-[0.75]"
          priority
        />
        <div className="absolute bottom-8 left-8 text-white drop-shadow-lg">
          <h1 className="text-4xl font-bold">{tour.title}</h1>
          <p className="mt-2 text-lg flex items-center gap-2">
            <MapPin className="w-5 h-5" /> {tour.location}
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* LEFT */}
        <div className="md:col-span-2 space-y-6">
          {/* INFO BOX */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border rounded-xl p-5 bg-white shadow-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span>{tour.location}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span>{tour.duration}</span>
            </div>

            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-600 text-lg">
                {formatPrice(tour.price)}đ
              </span>
            </div>
          </div>

          {/* ACCORDION */}
          <div className="space-y-4">
            <TourAccordion
              tour={{
                title: "Mô tả tour",
                description: tour.description,
              }}
              index={0}
              open={open}
              setOpen={setOpen}
            />

            <TourAccordion
              tour={{
                title: "Lịch trình",
                description: tour.schedule || "Lịch trình đang cập nhật.",
              }}
              index={1}
              open={open}
              setOpen={setOpen}
            />

            <TourAccordion
              tour={{
                title: "Bao gồm & Không bao gồm",
                description: tour.includes || "Thông tin đang cập nhật.",
              }}
              index={2}
              open={open}
              setOpen={setOpen}
            />
          </div>

          {/* TESTIMONIALS */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Đánh giá khách hàng</h2>

            {testimonials.length === 0 && (
              <p className="text-gray-500">
                Chưa có đánh giá nào cho tour này.
              </p>
            )}

            <div className="space-y-4">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="border p-4 rounded-xl bg-white shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-medium">{t.name}</span>
                    <span className="text-gray-500">{t.rating}/5</span>
                  </div>

                  <p className="mt-2 text-gray-700">{t.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="md:col-span-1 space-y-4 sticky top-24 h-max">
          <div className="border rounded-xl p-5 bg-white shadow-sm">
            <h3 className="font-semibold text-lg">Giá Tour</h3>
            <p className="text-blue-600 text-3xl font-bold mt-2">
              {formatPrice(tour.price)}đ
            </p>

            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium mt-5 hover:bg-blue-700">
              Đặt tour ngay
            </button>

            <button className="w-full border py-3 rounded-lg mt-3 text-gray-700 hover:bg-gray-100">
              Thêm vào giỏ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
