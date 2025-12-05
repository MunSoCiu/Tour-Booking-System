"use client";

import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";

export default function CartPage() {
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Title */}
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold">Giỏ Hàng Của Bạn</h1>
        <p className="text-gray-600 mt-1">
          Bạn có 2 tour trong giỏ hàng. Vui lòng kiểm tra lại thông tin trước
          khi thanh toán.
        </p>
      </div>

      {/* Content Grid */}
      <div className="max-w-6xl mx-auto mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CART ITEMS */}
        <div className="lg:col-span-2 space-y-4">
          <CartItem
            image="/images/eu1.jpg"
            title="Tour Châu Âu 5N4Đ: Khám Phá Paris – Brussels – Amsterdam"
            date="15/09/2024"
            guests="2 người lớn"
            price={51980000}
            quantity={2}
          />

          <CartItem
            image="/images/japan1.jpg"
            title="Tour Khám Phá Nhật Bản 6N5Đ: Tokyo – Kyoto – Osaka"
            date="22/10/2024"
            guests="1 người lớn"
            price={32500000}
            quantity={1}
          />
        </div>

        {/* SUMMARY SIDEBAR */}
        <CartSummary
          items={[
            { name: "Tour Châu Âu (2 khách)", price: 51980000 },
            { name: "Tour Nhật Bản (1 khách)", price: 32500000 },
          ]}
          serviceFee={500000}
        />
      </div>
    </div>
  );
}
