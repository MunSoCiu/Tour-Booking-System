"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import TourCard from "@/components/TourCard";

interface Tour {
  id: string;
  title: string;
  image: string;
  price: number;
  originalPrice?: number;
  duration: string;
  maxGuests: number;
  rating: number;
  reviewCount: number;
  discount?: number;
  badge?: string;
}

export default function ToursPage() {
  const [filters, setFilters] = useState({
    destination: "",
    minPrice: "",
    maxPrice: "",
    duration: "",
    guests: "",
  });

  const [sortBy, setSortBy] = useState("popularity");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const tours: Tour[] = [
    {
      id: "1",
      title: "Tour Khám Phá Châu Á 5N4D",
      image: "/images/asia-tour.jpg",
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
      image: "/images/europe-tour.jpg",
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
      image: "/images/desert-tour.jpg",
      price: 8500000,
      duration: "4 ngày 3 đêm",
      maxGuests: 10,
      rating: 4.7,
      reviewCount: 85,
      badge: "HOT",
    },
    {
      id: "4",
      title: "Giảm Giá Tour Vịnh Hạ Long",
      image: "/images/halong-tour.jpg",
      price: 2800000,
      originalPrice: 3500000,
      duration: "2 ngày 1 đêm",
      maxGuests: 30,
      rating: 4.9,
      reviewCount: 302,
      discount: 20,
      badge: "-20%",
    },
    {
      id: "5",
      title: "Flash Sale Cuối Tuần: Vì Vũ Đà Nẵng",
      image: "/images/danang-tour.jpg",
      price: 2999000,
      originalPrice: 4000000,
      duration: "3 ngày 2 đêm",
      maxGuests: 25,
      rating: 4.9,
      reviewCount: 215,
      discount: 25,
      badge: "DEAL MUA HẺ",
    },
    {
      id: "6",
      title: "Ưu Đãi Đặt Sớm Tour Sa Mạc",
      image: "/images/desert2-tour.jpg",
      price: 7500000,
      originalPrice: 9000000,
      duration: "5 ngày",
      maxGuests: 12,
      rating: 4.7,
      reviewCount: 150,
      badge: "ƯU ĐÃI VIP",
    },
  ];

  // Apply filters
  const filteredTours = useMemo(() => {
    let result = [...tours];

    if (filters.destination)
      result = result.filter((t) =>
        t.title.toLowerCase().includes(filters.destination.toLowerCase())
      );

    if (filters.minPrice)
      result = result.filter((t) => t.price >= Number(filters.minPrice));
    if (filters.maxPrice)
      result = result.filter((t) => t.price <= Number(filters.maxPrice));

    if (filters.duration) {
      result = result.filter((t) => {
        const days = parseInt(t.duration);
        if (filters.duration === "1-3") return days >= 1 && days <= 3;
        if (filters.duration === "4-7") return days >= 4 && days <= 7;
        if (filters.duration === "8+") return days >= 8;
        return true;
      });
    }

    if (filters.guests)
      result = result.filter((t) => t.maxGuests >= Number(filters.guests));

    // Apply sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [filters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredTours.length / itemsPerPage);
  const paginatedTours = filteredTours.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Khám phá các tour du lịch hấp dẫn
          </h1>
          <p className="text-gray-600">
            Tìm thấy{" "}
            <span className="font-semibold">{filteredTours.length} tours</span>{" "}
            phù hợp
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div
            className={`lg:w-64 ${showFilters ? "block" : "hidden lg:block"}`}
          >
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Bộ lọc</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden text-gray-500"
                >
                  ×
                </button>
              </div>

              {/* Destination */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Điểm đến
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Nhập thành phố..."
                    value={filters.destination}
                    onChange={(e) =>
                      setFilters({ ...filters, destination: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Price */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ngân sách
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Từ"
                    value={filters.minPrice}
                    onChange={(e) =>
                      setFilters({ ...filters, minPrice: e.target.value })
                    }
                    className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    placeholder="Đến"
                    value={filters.maxPrice}
                    onChange={(e) =>
                      setFilters({ ...filters, maxPrice: e.target.value })
                    }
                    className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Duration */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loại tour
                </label>
                <select
                  value={filters.duration}
                  onChange={(e) =>
                    setFilters({ ...filters, duration: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Tất cả</option>
                  <option value="1-3">1-3 ngày</option>
                  <option value="4-7">4-7 ngày</option>
                  <option value="8+">8+ ngày</option>
                </select>
              </div>

              {/* Guests */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số lượng khách
                </label>
                <input
                  type="number"
                  min="1"
                  placeholder="2"
                  value={filters.guests}
                  onChange={(e) =>
                    setFilters({ ...filters, guests: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                onClick={() =>
                  setFilters({
                    destination: "",
                    minPrice: "",
                    maxPrice: "",
                    duration: "",
                    guests: "",
                  })
                }
                className="w-full mb-2 py-2 text-blue-600 hover:bg-blue-50 rounded-lg text-sm"
              >
                Xoá bộ lọc
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex items-center justify-between">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 text-gray-700"
              >
                <SlidersHorizontal className="w-5 h-5" /> Bộ lọc
              </button>

              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Sắp xếp:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="popularity">Phổ biến nhất</option>
                    <option value="price-low">Giá thấp đến cao</option>
                    <option value="price-high">Giá cao đến thấp</option>
                    <option value="rating">Đánh giá cao nhất</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Tours Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedTours.map((tour) => (
                <TourCard key={tour.id} {...tour} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ‹
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === i + 1
                      ? "bg-blue-500 text-white"
                      : "border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
