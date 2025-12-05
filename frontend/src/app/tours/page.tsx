"use client";

import TourFilter from "@/components/tour/TourFilter";
import TourCard from "@/components/tour/TourCard";
import Pagination from "@/components/common/Pagination";

export default function ToursPage() {
  const tours = [
    {
      id: 1,
      image: "/images/tours/tour1.jpg",
      title: "Tour Phan Thiết 3N2Đ – Resort 4 sao",
      days: "3 ngày 2 đêm",
      location: "Phan Thiết",
      rating: 4.8,
      reviews: 120,
      price: 2500000,
      badge: "Khuyến mãi",
    },
    {
      id: 2,
      image: "/images/sapa.jpg",
      title: "Khám phá Sapa – Nóc nhà Đông Dương",
      days: "4 ngày 3 đêm",
      location: "Sapa",
      rating: 5.0,
      reviews: 98,
      price: 4200000,
      badge: "Tour mới",
    },
    {
      id: 3,
      image: "/images/danang.jpg",
      title: "Đà Nẵng – Hội An – Bà Nà Hills",
      days: "3 ngày 2 đêm",
      location: "Đà Nẵng",
      rating: 4.2,
      reviews: 215,
      price: 3800000,
    },

    {
      id: 4,
      image: "/images/halong.jpg",
      title: "Du thuyền Vịnh Hạ Long 5 sao",
      days: "2 ngày 1 đêm",
      location: "Hạ Long",
      rating: 4.9,
      reviews: 302,
      price: 2950000,
    },
    {
      id: 5,
      image: "/images/tours/tour2.jpg",
      title: "Miền Tây sông nước: Cần Thơ – Châu Đốc",
      days: "3 ngày 2 đêm",
      location: "Cần Thơ",
      rating: 4.8,
      reviews: 88,
      price: 2100000,
    },
    {
      id: 6,
      image: "/images/tours/tour3.jpg",
      title: "City Tour Hà Nội – Ngàn năm văn hiến",
      days: "1 Ngày",
      location: "Hà Nội",
      rating: 4.7,
      reviews: 150,
      price: 850000,
    },
  ];

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-600">
        Trang chủ / Danh sách Tour
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold">
          Khám phá các tour du lịch hấp dẫn
        </h1>
      </div>

      {/* MAIN GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8 px-4">
        {/* FILTER SIDEBAR */}
        <TourFilter />

        {/* TOUR LIST */}
        <div className="lg:col-span-3">
          <div className="flex justify-between mb-4">
            <p className="text-gray-600">
              Tìm thấy <strong>72 tours</strong> phù hợp
            </p>

            <select className="border rounded-lg px-4 py-2 text-sm">
              <option>Phổ biến nhất</option>
              <option>Giá thấp đến cao</option>
              <option>Giá cao đến thấp</option>
              <option>Đánh giá tốt nhất</option>
            </select>
          </div>

          {/* GRID TOUR CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>

          {/* PAGINATION */}
          <div className="mt-10 flex justify-center">
            <Pagination />
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="border-t mt-16 py-10 text-center text-gray-600 text-sm">
        <div className="flex justify-center gap-6 mb-4">
          <a href="#">Giới thiệu</a>
          <a href="#">Blog du lịch</a>
          <a href="#">Cơ hội nghề nghiệp</a>
          <a href="#">Trung tâm hỗ trợ</a>
          <a href="#">Chính sách bảo mật</a>
        </div>
        <p>© 2024 TravelViet. All rights reserved.</p>
      </footer>
    </div>
  );
}
