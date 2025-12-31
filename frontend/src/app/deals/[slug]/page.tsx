"use client";

import { use, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, ChevronRight } from "lucide-react";
import PhotoGallery from "@/components/tour/PhotoGallery";
import PriceBox from "@/components/tour/PriceBox";
import TourAccordion from "@/components/tour/TourAccordion";
import { formatPrice } from "@/lib/utils/formatPrice";

export default function DealDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const API = process.env.NEXT_PUBLIC_API_URL ?? "";
  const [tour, setTour] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(2);

  /* ============================
        FETCH TOUR
  ============================ */
  useEffect(() => {
    if (!API || !slug) return;

    fetch(`${API}/tours/slug/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setTour(data);
        setLoading(false);
      })
      .catch(() => {
        setTour(null);
        setLoading(false);
      });
  }, [API, slug]);

  /* ============================
        PRICE CALCULATION
  ============================ */
  const discounted = useMemo(() => {
    if (!tour || !tour.discount) return null;

    const newPrice = tour.price - (tour.price * tour.discount) / 100;

    return {
      oldPrice: Number(tour.price),
      newPrice: Math.round(newPrice),
      discount: tour.discount,
    };
  }, [tour]);

  if (loading)
    return <div className="py-20 text-center text-gray-500">Đang tải...</div>;
  if (!tour)
    return (
      <div className="py-20 text-center text-gray-500">
        Không tìm thấy tour ưu đãi.
      </div>
    );

  /* ============================
        SAMPLE ITINERARY
  ============================ */
  const itinerary = [
    {
      day: "Ngày 1",
      title: "Khởi hành",
      desc:
        (tour.description?.substring(0, 200) ?? "") +
        (tour.description?.length > 200 ? "..." : ""),
    },
    {
      day: "Ngày 2",
      title: "Tham quan",
      desc: "Nội dung lịch trình ngày 2...",
    },
    {
      day: "Ngày 3",
      title: "Kết thúc",
      desc: "Kết thúc hành trình, trả khách.",
    },
  ];

  return (
    <div className="w-full bg-gray-50 pb-20">
      {/* ========== BREADCRUMB ========== */}
      <div className="max-w-6xl mx-auto px-4 py-5 text-sm text-gray-500 flex gap-2 items-center">
        <Link href="/" className="hover:underline">
          Trang chủ
        </Link>
        <ChevronRight size={16} />
        <Link href="/deals" className="hover:underline">
          Ưu Đãi
        </Link>
        <ChevronRight size={16} />
        <span className="text-gray-700">{tour.title}</span>
      </div>

      {/* ========== TOUR TITLE ========== */}
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

      {/* ========== GALLERY + PRICE BOX ========== */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 px-4 mt-6">
        <div className="md:col-span-2">
          <PhotoGallery images={[tour.image]} title={tour.title} />
        </div>

        {/* PRICE SECTION */}
        <div className="bg-white shadow-lg p-5 rounded-xl border">
          <div className="text-center mb-5">
            <span className="text-red-600 font-bold text-lg">
              Giảm {tour.discount}% 🔥
            </span>

            <div className="mt-2">
              <span className="line-through text-gray-500 text-sm">
                {formatPrice(discounted?.oldPrice ?? 0)} đ
              </span>
              <div className="text-3xl font-bold text-blue-600 mt-1">
                {formatPrice(discounted?.newPrice ?? 0)} đ
              </div>
            </div>
          </div>

          <PriceBox
<<<<<<< HEAD
            tour={tour}
=======
            tour={{ ...tour, price: discounted?.newPrice }}
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
            date={date}
            setDate={setDate}
            guests={guests}
            setGuests={setGuests}
            apiUrl={API}
          />
        </div>
      </div>

      {/* ========== DESCRIPTION ========== */}
      <div className="max-w-6xl mx-auto px-4 mt-10">
        <h2 className="text-xl font-semibold">Mô tả tour</h2>
        <p className="text-gray-700 leading-relaxed mt-2">{tour.description}</p>

        {/* ========== ITINERARY ========== */}
        <h2 className="text-xl font-semibold mt-10">Lịch trình chi tiết</h2>
        <div className="space-y-4 mt-4">
          {itinerary.map((it, i) => (
            <TourAccordion
              key={i}
              tour={{ title: `${it.day}: ${it.title}`, description: it.desc }}
              index={i}
              open={null}
              setOpen={() => {}}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
