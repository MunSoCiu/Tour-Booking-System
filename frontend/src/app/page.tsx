"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import TourCard from "@/components/TourCard";

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(1);

  const popularDestinations = [
    { id: "1", name: "Vịnh Hạ Long", image: "/images/halon.jpg" },
    { id: "2", name: "Đà Nẵng", image: "/images/danan.jpg" },
    { id: "3", name: "Sapa", image: "/images/sap.jpg" },
    { id: "4", name: "Phú Quốc", image: "/images/phuquo.jpg" },
  ];

  const featuredTours = [
    {
      id: "1",
      title: "Tour Khám Phá Châu Á 5N4D",
      image: "/images/asia-tou.jpg",
      price: 4000000,
      originalPrice: 5000000,
      duration: "5 ngày 4 đêm",
      maxGuests: 20,
      rating: 4.8,
      reviewCount: 120,
      discount: 20,
      badge: "-20%",
    },
    {
      id: "2",
      title: "Hành Trình Lãng Mạn Châu Âu",
      image: "/images/europe-tou.jpg",
      price: 12750000,
      originalPrice: 15000000,
      duration: "7 ngày",
      maxGuests: 15,
      rating: 4.9,
      reviewCount: 98,
      discount: 15,
      badge: "-15%",
    },
    {
      id: "3",
      title: "Phiêu Lưu Sa Mạc Huyền Bí",
      image: "/images/desert-tor.jpg",
      price: 8500000,
      originalPrice: 9000000,
      duration: "4 ngày 3 đêm",
      maxGuests: 10,
      rating: 4.7,
      reviewCount: 85,
      badge: "HOT",
    },
  ];

  const testimonials = [
    {
      id: "1",
      name: "An Nguyễn",
      avatar: "/images/avatar.jpg",
      rating: 5,
      text: "Chuyến đi tuyệt vời! Cách tổ chức chuyên nghiệp, hướng dẫn viên nhiệt tình. Cảnh đẹp, mọi người thân thiện. Khách sạn và đồ ăn tốt.",
    },
    {
      id: "2",
      name: "Bình Trần",
      avatar: "/images/avatar.jpg",
      rating: 5,
      text: "Mọi thứ được sắp xếp rất chu đáo. Giá cả hợp lí, dịch vụ tốt, nhân viên tận tâm.",
    },
  ];

  const handleSearch = () => {
    if (!searchQuery) return;
    router.push(
      `/tours?destination=${searchQuery}&date=${date}&guests=${guests}`
    );
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[500px] bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Khám Phá Thế Giới, Tìm Kiếm
            <br />
            Cuộc Phiêu Lưu Tiếp Theo
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Đặt tour du lịch dễ dàng và nhanh chóng với những ưu đãi tốt nhất.
          </p>

          {/* Search Box */}
          <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Bạn muốn đi đâu"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="relative">
                <Users className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  min={1}
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  placeholder="Số lượng khách"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={handleSearch}
                className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                Tìm Kiếm
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Điểm Đến Phổ Biến
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {popularDestinations.map((dest) => (
              <Link key={dest.id} href={`/tours?destination=${dest.id}`}>
                <div className="relative h-48 rounded-lg overflow-hidden group cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <h3 className="absolute bottom-4 left-4 text-white font-semibold text-xl z-20">
                    {dest.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Ưu Đãi Đặc Biệt
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredTours.map((tour) => (
              <TourCard key={tour.id} {...tour} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/tours"
              className="inline-block bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Xem Tất Cả Tours
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Khách Hàng Nói Gì Về Chúng Tôi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-gray-50 p-6 rounded-lg flex flex-col md:flex-row gap-4"
              >
                <div className="flex-shrink-0 w-16 h-16 relative rounded-full overflow-hidden">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <div className="flex mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.text}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
