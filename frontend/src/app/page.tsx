"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Search, Calendar, Users, MapPin } from "lucide-react";
import DestinationCard from "@/components/home/DestinationCard";
import DealCard from "@/components/home/DealCard";
import TestimonialCard from "@/components/home/TestimonialCard";
import { apiGet } from "@/lib/api";

export default function HomePage() {
  const [tours, setTours] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const tourData = await apiGet("/tours");
        const testData = await apiGet("/testimonials");

        setTours(tourData);
        setTestimonials(testData);
      } catch (err) {
        console.error("API Error:", err);
      }
    }

    loadData();
  }, []);

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative h-[520px] w-full overflow-hidden">
        <Image
          src="/images/hero-bg.jpg"
          alt="Travel Hero Background"
          fill
          className="object-cover brightness-[0.65] z-0"
          priority
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
          <h1 className="text-white font-bold text-4xl md:text-5xl leading-snug drop-shadow-lg">
            Khám Phá Thế Giới, Tìm Kiếm <br /> Cuộc Phiêu Lưu Tiếp Theo
          </h1>

          <p className="text-white mt-3 text-lg opacity-90 drop-shadow">
            Đặt tour du lịch dễ dàng và nhanh chóng với những ưu đãi tốt nhất.
          </p>

          {/* SEARCH BAR */}
          <div className="mt-8 bg-white w-full max-w-4xl rounded-xl shadow-lg p-4 grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="flex items-center border rounded-lg px-3 py-2">
              <MapPin className="text-gray-500 mr-2 w-5 h-5" />
              <input
                placeholder="Bạn muốn đi đâu?"
                className="w-full outline-none"
              />
            </div>

            <div className="flex items-center border rounded-lg px-3 py-2">
              <Calendar className="text-gray-500 mr-2 w-5 h-5" />
              <input type="date" className="w-full outline-none" />
            </div>

            <div className="flex items-center border rounded-lg px-3 py-2">
              <Users className="text-gray-500 mr-2 w-5 h-5" />
              <input
                placeholder="Số lượng khách"
                className="w-full outline-none"
              />
            </div>

            <button className="bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2">
              <Search className="w-5 h-5" />
              Tìm Kiếm
            </button>
          </div>
        </div>
      </section>

      {/* POPULAR DESTINATIONS */}
      <section className="py-16 px-4">
        <h2 className="text-center text-2xl font-semibold mb-10">
          Điểm Đến Phổ Biến
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {tours.slice(0, 4).map((tour: any) => (
            <DestinationCard
              key={tour.id}
              title={tour.title}
              image={tour.image}
            />
          ))}
        </div>
      </section>

      {/* SPECIAL DEALS */}
      <section className="py-16 bg-gray-50 px-4">
        <h2 className="text-center text-2xl font-semibold mb-10">
          Ưu Đãi Đặc Biệt
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {tours.slice(0, 3).map((tour: any) => (
            <DealCard
              key={tour.id}
              tag="-10%"
              title={tour.title}
              oldPrice={`${tour.price + 1000000}đ`}
              price={`${tour.price}đ`}
              desc={tour.description}
              image={tour.image}
            />
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 px-4">
        <h2 className="text-center text-2xl font-semibold mb-10">
          Khách Hàng Nói Gì Về Chúng Tôi
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((t: any) => (
            <TestimonialCard
              key={t.id}
              id={t.id.toString()}
              name={t.name}
              role={t.role}
              text={t.text}
              rating={t.rating}
              avatar={t.avatar}
              date={t.date}
              tourName={t.tourName}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
