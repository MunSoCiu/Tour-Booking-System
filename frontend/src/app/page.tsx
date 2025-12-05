"use client";

import Image from "next/image";
import { Search, Calendar, Users, MapPin } from "lucide-react";
import DestinationCard from "@/components/home/DestinationCard";
import DealCard from "@/components/home/DealCard";
import TestimonialCard from "@/components/home/TestimonialCard";

export default function HomePage() {
  return (
    <div className="w-full">
      {/* =============================== */}
      {/* HERO SECTION */}
      {/* =============================== */}
      <section className="relative h-[520px] w-full overflow-hidden">
        <Image
          src="/images/hero-bg.jpg"
          alt="Travel Hero Background"
          fill
          className="object-cover brightness-[0.65] z-0"
          priority
        />

        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
          <h1 className="text-white font-bold text-4xl md:text-5xl leading-snug drop-shadow-lg">
            Khám Phá Thế Giới, Tìm Kiếm <br /> Cuộc Phiêu Lưu Tiếp Theo
          </h1>

          <p className="text-white mt-3 text-lg opacity-90 drop-shadow">
            Đặt tour du lịch dễ dàng và nhanh chóng với những ưu đãi tốt nhất.
          </p>

          {/* SEARCH BAR */}
          <div className="mt-8 bg-white w-full max-w-4xl rounded-xl shadow-lg p-4 grid grid-cols-1 md:grid-cols-4 gap-3">
            {/* DESTINATION INPUT */}
            <div className="flex items-center border rounded-lg px-3 py-2">
              <MapPin className="text-gray-500 mr-2 w-5 h-5" />
              <input
                placeholder="Bạn muốn đi đâu?"
                className="w-full outline-none"
              />
            </div>

            {/* DATE INPUT */}
            <div className="flex items-center border rounded-lg px-3 py-2">
              <Calendar className="text-gray-500 mr-2 w-5 h-5" />
              <input type="date" className="w-full outline-none" />
            </div>

            {/* NUMBER OF PEOPLE */}
            <div className="flex items-center border rounded-lg px-3 py-2">
              <Users className="text-gray-500 mr-2 w-5 h-5" />
              <input
                placeholder="Số lượng khách"
                className="w-full outline-none"
              />
            </div>

            {/* SEARCH BUTTON */}
            <button className="bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2">
              <Search className="w-5 h-5" />
              Tìm Kiếm
            </button>
          </div>
        </div>
      </section>

      {/* =============================== */}
      {/* POPULAR DESTINATIONS */}
      {/* =============================== */}
      <section className="py-16 px-4">
        <h2 className="text-center text-2xl font-semibold mb-10">
          Điểm Đến Phổ Biến
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <DestinationCard title="Vịnh Hạ Long" image="/images/halong.jpg" />
          <DestinationCard title="Đà Nẵng" image="/images/danang.jpg" />
          <DestinationCard title="Sapa" image="/images/sapa.jpg" />
          <DestinationCard title="Phú Quốc" image="/images/phuquoc.jpg" />
        </div>
      </section>

      {/* =============================== */}
      {/* SPECIAL DEALS */}
      {/* =============================== */}
      <section className="py-16 bg-gray-50 px-4">
        <h2 className="text-center text-2xl font-semibold mb-10">
          Ưu Đãi Đặc Biệt
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <DealCard
            tag="-20%"
            title="Tour Khám Phá Châu Á 5N4Đ"
            oldPrice="5.000.000đ"
            price="4.000.000đ"
            desc="Trải nghiệm văn hóa đặc sắc và ẩm thực phong phú."
            image="/images/asia-tour.jpg"
          />

          <DealCard
            tag="-15%"
            title="Hành Trình Lãng Mạn Châu Âu"
            oldPrice="15.000.000đ"
            price="12.750.000đ"
            desc="Khám phá vẻ đẹp cổ kính của Paris, Rome và Venice."
            image="/images/europe-tour.jpg"
          />

          <DealCard
            tag="Mới"
            title="Phiêu Lưu Sa Mạc Huyền Bí"
            price="8.500.000đ"
            desc="Trải nghiệm độc đáo tại vùng sa mạc rộng lớn."
            image="/images/desert-tour.jpg"
          />
        </div>
      </section>

      {/* =============================== */}
      {/* TESTIMONIALS */}
      {/* =============================== */}
      <section className="py-16 px-4">
        <h2 className="text-center text-2xl font-semibold mb-10">
          Khách Hàng Nói Gì Về Chúng Tôi
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <TestimonialCard
            id="1"
            name="An Nguyễn"
            role="Khách hàng"
            text="Chuyến đi tuyệt vời! Dịch vụ chuyên nghiệp, hướng dẫn viên thân thiện."
            rating={4}
            avatar="/images/avatar1.jpg"
            date="10/02/2024"
            tourName="Tour Vịnh Hạ Long 2N1Đ"
          />

          <TestimonialCard
            id="2"
            name="Bình Trần"
            role="Khách hàng"
            text="Mọi thứ được sắp xếp rất chu đáo. Giá hợp lý, chất lượng cao."
            rating={4}
            avatar="/images/avatar2.jpg"
            date="05/01/2024"
            tourName="Tour Đà Lạt 3N2Đ"
          />

          <TestimonialCard
            id="3"
            name="Chí Lê"
            role="Khách hàng"
            text="Giá cả hợp lý, chất lượng vượt trội. Rất đáng để trải nghiệm."
            rating={5}
            avatar="/images/avatar2.jpg"
            date="22/12/2023"
            tourName="Tour Phú Quốc 4N3Đ"
          />
        </div>
      </section>
    </div>
  );
}
