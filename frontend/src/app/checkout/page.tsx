"use client";

import { useEffect, useState } from "react";
import ContactInfo from "@/components/checkout/ContactInfo";
import PaymentMethod from "@/components/checkout/PaymentMethod";
import PaymentSummary from "@/components/checkout/PaymentSummary";

export default function CheckoutPage() {
  const API = process.env.NEXT_PUBLIC_API_URL;

  // =============================
  // Cart data
  // =============================
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // =============================
  // Contact Info
  // =============================
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleContactChange = (field: string, value: string) => {
    setContact((prev) => ({ ...prev, [field]: value }));
  };

  // =============================
  // Payment Method
  // =============================
  const [paymentMethod, setPaymentMethod] = useState("card");

  // =============================
  // Load Cart
  // =============================
  useEffect(() => {
    fetch(`${API}/api/cart`)
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data.items ?? [];
        setItems(list);
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [API]);

  // Summary data for PaymentSummary
  const summaryItems = items.map((item) => ({
    name: `${item.title} (${item.quantity} khách)`,
    price: item.price * item.quantity,
  }));

  const serviceFee = 50000;

  // =============================
  // Handle Payment
  // =============================
  const handlePayment = async () => {
    if (!contact.name || !contact.email || !contact.phone) {
      alert("Vui lòng nhập đầy đủ thông tin liên hệ.");
      return;
    }

    const res = await fetch(`${API}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contact,
        paymentMethod,
        items,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert("Thanh toán thất bại. Vui lòng thử lại.");
      return;
    }

    // Thanh toán thành công → chuyển trang
    window.location.href = `/orders/${data.id}`;
  };

  // =============================
  // Render UI
  // =============================
  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Đang tải dữ liệu…
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Giỏ hàng của bạn đang trống.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* LEFT COLUMN */}
      <div className="md:col-span-2 space-y-6">
        {/* CONTACT */}
        <ContactInfo
          name={contact.name}
          email={contact.email}
          phone={contact.phone}
          onChange={handleContactChange}
        />

        {/* PAYMENT METHOD */}
        <PaymentMethod value={paymentMethod} onChange={setPaymentMethod} />
      </div>

      {/* RIGHT COLUMN */}
      <PaymentSummary
        items={summaryItems}
        serviceFee={serviceFee}
        onPay={handlePayment}
      />
    </div>
  );
}
