"use client";

import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import FAQ from "@/components/contact/FAQ";

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen pb-20">
      {/* TITLE */}
      <div className="text-center mt-10 px-4">
        <h1 className="text-4xl font-bold">Liên hệ với chúng tôi</h1>
        <p className="text-gray-600 mt-2">
          Chúng tôi luôn sẵn sàng lắng nghe bạn. Vui lòng chọn một trong các
          phương thức liên hệ dưới đây.
        </p>
      </div>

      {/* FORM + INFO GRID */}
      <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6 px-4">
        {/* LEFT: FORM */}
        <ContactForm />

        {/* RIGHT: CONTACT INFO */}
        <ContactInfo />
      </div>

      {/* FAQ SECTION */}
      <div className="max-w-4xl mx-auto mt-16 px-4">
        <h2 className="text-center text-2xl font-bold">
          Câu hỏi thường gặp (FAQ)
        </h2>

        <div className="mt-8 space-y-3">
          <FAQ question="Làm thế nào để đặt tour?" />
          <FAQ question="Chính sách hủy tour như thế nào?" />
          <FAQ question="Tôi có thể thanh toán bằng những hình thức nào?" />
          <FAQ question="Làm sao để liên hệ hỗ trợ khi đang trong chuyến đi?" />
        </div>
      </div>
    </div>
  );
}
