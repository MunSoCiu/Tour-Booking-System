"use client";

import { useEffect, useMemo, useState } from "react";
import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, ChevronRight } from "lucide-react";
import PhotoGallery from "@/components/tour/PhotoGallery";
import PriceBox from "@/components/tour/PriceBox";
import TourAccordion from "@/components/tour/TourAccordion";
import { formatPrice } from "@/lib/utils/formatPrice";

export default function TourDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const API = process.env.NEXT_PUBLIC_API_URL ?? "";
  const { slug } = use(params);

  const [tour, setTour] = useState<any | null>(null);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<
    "overview" | "itinerary" | "service" | "reviews"
  >("overview");

  const [date, setDate] = useState<string>("");
  const [guests, setGuests] = useState<number>(2);

  /* ============================
        FETCH TOUR BY SLUG
  ============================ */
  useEffect(() => {
    if (!API || !slug) return;

    fetch(`${API}/tours/slug/${slug}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then((data) => setTour(data))
      .catch(() => setTour(null));
  }, [API, slug]);

  /* ============================
        FETCH TESTIMONIALS
  ============================ */
  useEffect(() => {
    if (!API || !tour) return;

    fetch(`${API}/testimonials`)
      .then((r) => r.json())
      .then((data) => {
        setTestimonials(data.filter((t: any) => t.tourName === tour.title));
      });
  }, [API, tour]);

  /* ============================
        IMAGE GALLERY
  ============================ */
  const images = useMemo(() => {
    if (!tour) return [];
    return tour.images ?? [tour.image];
  }, [tour]);

  /* ============================
        LOADING / NOT FOUND
  ============================ */
  if (tour === null) {
    return (
      <div className="py-20 text-center text-gray-500">
        Không tìm thấy tour.
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="py-20 text-center text-gray-500">Đang tải tour...</div>
    );
  }

  /* ============================
        ITINERARY (DỮ LIỆU THẬT)
  ============================ */
  const itinerary = Array.isArray(tour.itinerary) ? tour.itinerary : [];

  return (
    <div className="w-full bg-gray-50 pb-20">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 py-5 text-sm text-gray-500 flex gap-2 items-center">
        <Link href="/" className="hover:underline">
          Trang chủ
        </Link>
        <ChevronRight size={16} />
        <Link href="/tours" className="hover:underline">
          Tour
        </Link>
        <ChevronRight size={16} />
        <span className="text-gray-700">{tour.title}</span>
      </div>

      {/* Title */}
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold">{tour.title}</h1>

        <div className="mt-2 flex items-center gap-3 text-gray-600">
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <span>4.8</span>
            <span className="text-gray-500">(125 đánh giá)</span>
          </div>

          <div className="flex items-center gap-1">
            <MapPin className="w-5 h-5 text-blue-600" />
            <span>{tour.location}</span>
          </div>
        </div>
      </div>

      {/* Gallery + Price Box */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 px-4 mt-6">
        <div className="md:col-span-2">
          <PhotoGallery images={images} title={tour.title} />
        </div>

        <PriceBox
          tour={tour}
          date={date}
          setDate={setDate}
          guests={guests}
          setGuests={setGuests}
          apiUrl={API}
        />
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto mt-10 px-4 border-b flex gap-8 text-gray-700 font-medium">
        {["overview", "itinerary", "service", "reviews"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`pb-3 ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600"
                : ""
            }`}
          >
            {
              {
                overview: "Tổng quan",
                itinerary: "Lịch trình chi tiết",
                service: "Dịch vụ",
                reviews: `Đánh giá (${testimonials.length})`,
              }[tab]
            }
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-4 mt-8 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-6">
          {/* OVERVIEW */}
          {activeTab === "overview" && (
            <>
              <h2 className="text-xl font-semibold">Mô tả tour</h2>
              <p className="text-gray-700 leading-relaxed">
                {tour.description}
              </p>
            </>
          )}

          {/* ITINERARY — DỮ LIỆU THẬT */}
          {activeTab === "itinerary" && (
            <>
              <h2 className="text-xl font-semibold">Lịch trình chi tiết</h2>

              {itinerary.length === 0 ? (
                <p className="text-gray-500">Chưa có lịch trình.</p>
              ) : (
                <div className="space-y-4">
                  {itinerary.map((it: any, i: number) => (
                    <TourAccordion
                      key={i}
                      tour={{
                        title: `${it.day}: ${it.title}`,
                        description: it.desc,
                      }}
                      index={i}
                      open={null}
                      setOpen={() => {}}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {/* SERVICE */}
          {activeTab === "service" && (
            <>
              <h2 className="text-xl font-semibold">
                Dịch vụ bao gồm & không bao gồm
              </h2>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-green-600 mb-2">Bao gồm</h3>
                  <ul className="text-gray-700 space-y-1">
                    <li>✔ Vé máy bay</li>
                    <li>✔ Khách sạn 3–4 sao</li>
                    <li>✔ Ăn uống theo chương trình</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-red-600 mb-2">
                    Không bao gồm
                  </h3>
                  <ul className="text-gray-700 space-y-1">
                    <li>✘ Phí visa</li>
                    <li>✘ Chi tiêu cá nhân</li>
                  </ul>
                </div>
              </div>
            </>
          )}

          {/* REVIEWS */}
          {activeTab === "reviews" && (
            <>
              <h2 className="text-xl font-semibold">Đánh giá từ khách hàng</h2>

              {testimonials.length === 0 && (
                <p className="text-gray-500">Chưa có đánh giá.</p>
              )}

              <div className="space-y-4">
                {testimonials.map((t) => (
                  <div key={t.id} className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="font-medium">{t.name}</span>
                      <span className="text-gray-500">{t.rating}/5</span>
                    </div>
                    <p className="mt-2 text-gray-700">{t.text}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
