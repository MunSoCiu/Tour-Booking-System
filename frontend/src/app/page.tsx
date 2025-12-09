"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

import { Search, Calendar, Users, MapPin } from "lucide-react";

import DestinationCard from "@/components/home/DestinationCard";
import DealCard from "@/components/home/DealCard";
import TestimonialCard from "@/components/home/TestimonialCard";
import { formatPrice } from "@/lib/utils/formatPrice";

export default function HomePage() {
  const API = process.env.NEXT_PUBLIC_API_URL;

  const [tours, setTours] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);

  // Search states
  const [searchTxt, setSearchTxt] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("");

  // Testimonial slider
  const [slide, setSlide] = useState(0);

  /* ---------------------------
        FETCH TOURS
  --------------------------- */
  useEffect(() => {
    if (!API) return;

    fetch(`${API}/tours`)
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.items ?? [];
        setTours(list);
      });
  }, [API]);

  /* ---------------------------
        FETCH TESTIMONIALS
  --------------------------- */
  useEffect(() => {
    if (!API) return;

    fetch(`${API}/testimonials`)
      .then((res) => res.json())
      .then((data) => setTestimonials(Array.isArray(data) ? data : []));
  }, [API]);

  /* ---------------------------
        AUTO SLIDER
  --------------------------- */
  const totalSlides = Math.ceil(testimonials.length / 3);

  useEffect(() => {
    if (totalSlides <= 1) return;

    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);

    return () => clearInterval(timer);
  }, [totalSlides]);

  /* ---------------------------
        HANDLE SEARCH
  --------------------------- */
  const handleSearch = () => {
    const params = new URLSearchParams();

    if (searchTxt) params.append("search", searchTxt);
    if (date) params.append("date", date);
    if (guests) params.append("guests", guests);

    window.location.href = `/tours?${params.toString()}`;
  };

  return (
    <div className="w-full">
      {/* ---------------------- HERO ---------------------- */}
      <section className="relative h-[520px] w-full">
        <Image
          src="/images/hero-bg.jpg"
          alt="Hero"
          fill
          className="object-cover brightness-[0.65]"
          priority
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white font-bold text-4xl md:text-5xl leading-snug drop-shadow-lg">
            Khám Phá Thế Giới, Tìm Kiếm <br />
            Cuộc Phiêu Lưu Tiếp Theo
          </h1>

          <p className="text-white mt-3 text-lg opacity-90">
            Đặt tour du lịch dễ dàng và nhanh chóng với những ưu đãi tốt nhất.
          </p>

          {/* Search bar */}
          <div className="mt-8 bg-white w-full max-w-4xl rounded-xl shadow-lg p-4 grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="flex items-center border rounded-lg px-3 py-2">
              <MapPin className="text-gray-500 mr-2 w-5 h-5" />
              <input
                value={searchTxt}
                onChange={(e) => setSearchTxt(e.target.value)}
                placeholder="Bạn muốn đi đâu?"
                className="w-full outline-none"
              />
            </div>

            <div className="flex items-center border rounded-lg px-3 py-2">
              <Calendar className="text-gray-500 mr-2 w-5 h-5" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full outline-none"
              />
            </div>

            <div className="flex items-center border rounded-lg px-3 py-2">
              <Users className="text-gray-500 mr-2 w-5 h-5" />
              <input
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                placeholder="Số lượng khách"
                className="w-full outline-none"
              />
            </div>

            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" /> Tìm Kiếm
            </button>
          </div>
        </div>
      </section>

      {/* ---------------------- POPULAR DESTINATIONS ---------------------- */}
      <section className="py-16 px-4">
        <h2 className="text-center text-2xl font-semibold mb-10">
          Điểm Đến Phổ Biến
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {tours.slice(0, 12).map((tour) => (
            <DestinationCard
              key={tour.id}
              title={tour.title}
              image={tour.image}
            />
          ))}
        </div>
      </section>

      {/* ---------------------- SPECIAL DEALS ---------------------- */}
      <section className="py-16 bg-gray-50 px-4">
        <h2 className="text-center text-2xl font-semibold mb-10">
          Ưu Đãi Đặc Biệt
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {tours
            .filter((t) => t.discount && t.discountPrice)
            .slice(0, 6)
            .map((tour) => (
              <DealCard
                key={tour.id}
                title={tour.title}
                desc={tour.description}
                image={tour.image}
                slug={tour.slug}
                price={tour.discountPrice}
                oldPrice={tour.price}
                discount={tour.discount}
              />
            ))}
        </div>
        <div className="text-center mt-6">
          <Link
            href="/deals"
            className="px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Xem thêm
          </Link>
        </div>
      </section>

      {/* ---------------------- TESTIMONIALS SLIDER ---------------------- */}
      <section className="py-16 px-4">
        <h2 className="text-center text-2xl font-semibold mb-10">
          Khách Hàng Nói Gì Về Chúng Tôi
        </h2>

        <div className="overflow-hidden max-w-6xl mx-auto relative">
          <div
            className="flex transition-all duration-700"
            style={{ transform: `translateX(-${slide * 100}%)` }}
          >
            {Array.from({ length: totalSlides }).map((_, s) => (
              <div
                key={s}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 min-w-full"
              >
                {testimonials.slice(s * 3, s * 3 + 3).map((t) => (
                  <TestimonialCard key={t.id} {...t} />
                ))}
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                className={`w-3 h-3 rounded-full ${
                  slide === i ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
