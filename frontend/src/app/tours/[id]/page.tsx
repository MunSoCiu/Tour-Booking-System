"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Users,
  Star,
  MapPin,
  Clock,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Heart,
  Share2,
} from "lucide-react";
import { formatPrice } from "@/lib/utils/format";

export default function TourDetailPage({ params }: { params: { id: string } }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [guests, setGuests] = useState(2);
  const [children, setChildren] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedDay, setExpandedDay] = useState<number | null>(1);

  const tour = {
    id: params.id,
    title: "Tour Châu Âu 5N4D: Khám Phá Paris - Brussels - Amsterdam",
    images: [
      "/images/paris1.jpg",
      "/images/paris2.jpg",
      "/images/brussels.jpg",
      "/images/amsterdam.jpg",
    ],
    price: 25990000,
    originalPrice: 30000000,
    rating: 4.8,
    reviewCount: 125,
    duration: "5 ngày 4 đêm",
    location: "Pháp - Bỉ - Hà Lan",
    maxGuests: 20,
    description:
      "Hành trình 5 ngày 4 đêm sẽ đưa bạn qua ba thành phố mang tính biểu tượng của Châu Âu. Paris hoài lệ, Brussels có kỹnh và Amsterdam tự do. Tận hưởng vẻ đẹp của tháp Eiffel, khám phá những con kênh thơ mộng, và chiêm ngưỡng các công trúc kiến trúc độc đáo. Đây không chỉ là một chuyến đi, mà là một trải nghiệm văn hóa sâu sắc.",
    included: [
      "Vé máy bay khứ hồi quốc tế",
      "Khách sạn 3-4 sao tiêu chuẩn",
      "Xe du lịch đời mới theo chương trình",
      "Vé tham quan các điểm trong lịch trình",
      "Bảo hiểm du lịch quốc tế",
    ],
    excluded: [
      "Chi phí làm visa (nếu có)",
      "Chi phí cá nhân: giặt là, điện thoại, ăn uống ngoài lịch trình",
      "Tiền típ cho hướng dẫn viên và tài xế",
    ],
    itinerary: [
      {
        day: 1,
        title: "Chào Paris - Kinh đô ánh sáng",
        activities: [
          "Dón sân bay Charles de Gaulle, xe và hướng dẫn viên đón khách vào khách sạn",
          "Bắt đầu hành khám phá với khu Hoàn Miễn và Paris Champs-Élysées",
          "Tham quan tháp Eiffel, biểu tượng của Paris. Du khuyến trên sống Seine ngắm phong cảnh bờ bỗ",
          "Ăn tối tại nhà hàng địa phương với các món ăn Pháp truyền thống",
        ],
      },
      {
        day: 2,
        title: "Paris - Nghệ thuật và Lịch sử",
        activities: [
          "Sáng: Tham quan Bảo tàng Louvre, khám phá những tác phẩm nghệ thuật kiệt tác",
          "Chiều: Tham quan Nhà thờ Đức Bà Paris, di sản văn hóa thế giới",
          "Tối: An tại khu Montmartre, khám phá cuộc sống nghệ sĩ thường cư",
        ],
      },
      {
        day: 3,
        title: "Brussels - Trái tim Châu Âu",
        activities: [
          "Khởi hành đến Brussels, thủ đô của Bỉ",
          "Tham quan Grand Place, Quảng trường nổi tiếng với kiến trúc Gothic và Baroque",
          "Chiêm ngưỡng tượng Manneken Pis, biểu tượng độc đáo của Brussels",
          "Thưởng thức chocolate Bỉ nổi tiếng và các món ăn địa phương",
        ],
      },
    ],
  };

  const reviews = [
    {
      id: "1",
      name: "Minh Anh",
      rating: 5,
      date: "15/09/2024",
      comment:
        "Chuyến đi tuyệt vời! Lịch trình hợp lý, hướng dẫn viên nhiệt tình. Khách sạn và đồ ăn rất tốt. Sẽ giới thiệu cho bạn bè.",
      avatar: "MA",
    },
    {
      id: "2",
      name: "Quốc Hưng",
      rating: 4,
      date: "20/08/2024",
      comment:
        "Mọi thứ đều tốt, chỉ tiếc là thời gian ở Amsterdam hơi ít. Hướng dẫn viên ấm hiểu và rất vui tính.",
      avatar: "QH",
    },
  ];

  const handleBooking = () => {
    const bookingData = {
      tourId: tour.id,
      tourTitle: tour.title,
      date: selectedDate,
      guests,
      children,
      price: tour.price,
    };
    localStorage.setItem("pendingBooking", JSON.stringify(bookingData));
    window.location.href = "/bookings/checkout";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Image Gallery */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-4 gap-4 h-[400px]">
            <div className="col-span-2 row-span-2 relative rounded-lg overflow-hidden">
              <Image
                src={tour.images[0]}
                alt={tour.title}
                fill
                className="object-cover"
              />
            </div>
            {tour.images.slice(1, 4).map((image, index) => (
              <div key={index} className="relative rounded-lg overflow-hidden">
                <Image src={image} alt="" fill className="object-cover" />
              </div>
            ))}
            <button className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              Xem tất cả ảnh
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{tour.title}</h1>
                  <div className="flex items-center gap-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{tour.rating}</span>
                      <span>({tour.reviewCount} đánh giá)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-5 h-5" />
                      <span>{tour.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span>{tour.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-400" />
                  <span>Tối đa {tour.maxGuests} người</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-md">
              <div className="border-b border-gray-200">
                <div className="flex">
                  {["overview", "itinerary", "included", "reviews"].map(
                    (tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-4 font-medium ${
                          activeTab === tab
                            ? "border-b-2 border-blue-500 text-blue-600"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        {tab === "overview" && "Tổng quan"}
                        {tab === "itinerary" && "Lịch trình chi tiết"}
                        {tab === "included" && "Dịch vụ"}
                        {tab === "reviews" && "Đánh giá"}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="p-6">
                {activeTab === "overview" && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Mô tả tour</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {tour.description}
                    </p>
                  </div>
                )}

                {activeTab === "itinerary" && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold mb-4">
                      Lịch trình chi tiết
                    </h3>
                    {tour.itinerary.map((day) => (
                      <div
                        key={day.day}
                        className="border border-gray-200 rounded-lg"
                      >
                        <button
                          onClick={() =>
                            setExpandedDay(
                              expandedDay === day.day ? null : day.day
                            )
                          }
                          className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                              {day.day}
                            </div>
                            <span className="font-semibold">{day.title}</span>
                          </div>
                          {expandedDay === day.day ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </button>
                        {expandedDay === day.day && (
                          <div className="px-4 pb-4">
                            <ul className="space-y-2 ml-12">
                              {day.activities.map((activity, index) => (
                                <li key={index} className="flex gap-2">
                                  <span className="text-blue-500 mt-1">•</span>
                                  <span className="text-gray-700">
                                    {activity}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "included" && (
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-lg mb-3 text-green-600">
                        Bao gồm
                      </h4>
                      <ul className="space-y-2">
                        {tour.included.map((item, index) => (
                          <li key={index} className="flex gap-2">
                            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-3 text-red-600">
                        Không bao gồm
                      </h4>
                      <ul className="space-y-2">
                        {tour.excluded.map((item, index) => (
                          <li key={index} className="flex gap-2">
                            <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold">
                        Đánh giá từ khách hàng
                      </h3>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">
                          {tour.rating}
                        </div>
                        <div className="flex text-yellow-400 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                        <div className="text-sm text-gray-600">
                          {tour.reviewCount} đánh giá
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <div
                          key={review.id}
                          className="border-b border-gray-200 pb-4"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                              {review.avatar}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-semibold">{review.name}</h4>
                                <span className="text-sm text-gray-500">
                                  {review.date}
                                </span>
                              </div>
                              <div className="flex text-yellow-400 mb-2">
                                {[...Array(review.rating)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className="w-4 h-4 fill-current"
                                  />
                                ))}
                              </div>
                              <p className="text-gray-700">{review.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <div className="mb-6">
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-3xl font-bold text-blue-600">
                    {formatPrice(tour.price)}
                  </span>
                  <span className="text-gray-500 line-through text-lg mb-1">
                    {formatPrice(tour.originalPrice)}
                  </span>
                </div>
                <p className="text-sm text-gray-600">/ khách</p>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ngày khởi hành
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số lượng khách
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} người lớn
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trẻ em (0-12 tuổi)
                  </label>
                  <select
                    value={children}
                    onChange={(e) => setChildren(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {[...Array(6)].map((_, i) => (
                      <option key={i} value={i}>
                        {i} trẻ em
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">
                    {formatPrice(tour.price)} x {guests} khách
                  </span>
                  <span className="font-semibold">
                    {formatPrice(tour.price * guests)}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Phí dịch vụ</span>
                  <span className="font-semibold">{formatPrice(500000)}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="font-semibold text-lg">Tổng cộng</span>
                    <span className="font-bold text-xl text-blue-600">
                      {formatPrice(tour.price * guests + 500000)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleBooking}
                disabled={!selectedDate}
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Đặt tour ngay
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Bạn sẽ không bị trừ tiền cho đến khi hoàn tất thanh toán
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
