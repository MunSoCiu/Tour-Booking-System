"use client";

import PaymentSummary from "@/components/checkout/PaymentSummary";
import PaymentMethod from "@/components/checkout/PaymentMethod";
import ContactInfo from "@/components/checkout/ContactInfo";

export default function CheckoutPage() {
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Title */}
      <div className="max-w-6xl mx-auto mb-6">
        <h1 className="text-3xl font-bold">Thanh Toán</h1>
        <p className="text-gray-600 mt-1">
          Vui lòng hoàn tất thông tin bên dưới để đặt tour của bạn.
        </p>
      </div>

      {/* MAIN GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT SIDE: FORM */}
        <div className="lg:col-span-2 space-y-6">
          <ContactInfo />
          <PaymentMethod />
        </div>

        {/* RIGHT SIDE: SUMMARY */}
        <PaymentSummary />
      </div>
    </div>
  );
}
