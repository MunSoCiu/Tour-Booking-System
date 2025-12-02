"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { formatPrice, formatDate } from "@/lib/utils/format";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      tourId: "tour-1",
      tourTitle: "Tour Châu Âu (2 khách)",
      image: "/images/europe-tour.jpg",
      date: "15/09/2024",
      guests: 2,
      children: 1,
      price: 25990000,
    },
    {
      id: "2",
      tourId: "tour-2",
      tourTitle: "Tour Nhật Bản (1 khách)",
      image: "/images/japan-tour.jpg",
      date: "22/10/2024",
      guests: 1,
      children: 0,
      price: 32500000,
    },
  ]);

  const updateQuantity = (
    id: string,
    type: "guests" | "children",
    delta: number
  ) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === id) {
          const newValue = Math.max(
            type === "guests" ? 1 : 0,
            item[type] + delta
          );
          return { ...item, [type]: newValue };
        }
        return item;
      })
    );
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.guests,
    0
  );
  const serviceFee = 500000 * cartItems.length;
  const total = subtotal + serviceFee;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Giỏ hàng của bạn đang trống
          </h2>
          <p className="text-gray-600 mb-6">
            Khám phá các tour du lịch tuyệt vời và thêm vào giỏ hàng!
          </p>
          <Link
            href="/tours"
            className="inline-block bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Xem Tours
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Giỏ Hàng Của Bạn</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <p className="text-gray-600">
              Bạn có{" "}
              <span className="font-semibold">{cartItems.length} tour</span>{" "}
              trong giỏ hàng. Vui lòng kiểm tra lại thông tin trước khi thanh
              toán.
            </p>

            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex gap-4">
                  {/* Image */}
                  <div className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.tourTitle}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">
                          {item.tourTitle}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Ngày đi: {item.date}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-6 mt-4">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-600">Số lượng:</span>
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, "guests", -1)
                            }
                            className="p-2 hover:bg-gray-50"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 font-medium">
                            {item.guests}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, "guests", 1)}
                            className="p-2 hover:bg-gray-50"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {item.children > 0 && (
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-600">Trẻ em:</span>
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, "children", -1)
                              }
                              className="p-2 hover:bg-gray-50"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 font-medium">
                              {item.children}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, "children", 1)
                              }
                              className="p-2 hover:bg-gray-50"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Price */}
                    <div className="flex justify-between items-center mt-4 pt-4 border-t">
                      <span className="text-gray-600">
                        {formatPrice(item.price)} x {item.guests} khách
                      </span>
                      <span className="text-xl font-bold text-blue-600">
                        {formatPrice(item.price * item.guests)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="text-xl font-semibold mb-6">Tóm tắt đơn hàng</h2>

              <div className="space-y-3 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.tourTitle.split("(")[0].trim()}
                    </span>
                    <span className="font-medium">
                      {formatPrice(item.price * item.guests)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tạm tính</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phí dịch vụ</span>
                  <span className="font-semibold">
                    {formatPrice(serviceFee)}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">Tổng cộng</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href="/bookings/checkout"
                className="block w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium text-center mt-6"
              >
                Tiến hành thanh toán
              </Link>

              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  💡 <strong>Lưu ý:</strong> Giá tour có thể thay đổi tùy theo
                  ngày khởi hành và số lượng khách.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
