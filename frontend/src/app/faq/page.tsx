"use client";

import FAQSidebar from "@/components/faq/FAQSidebar";
import FAQAccordion from "@/components/faq/FAQAccordion";
import { Search, MessageCircle, Send } from "lucide-react";

export default function FAQPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* HERO SECTION */}
      <div className="text-center py-14 bg-white border-b">
        <h1 className="text-3xl md:text-4xl font-bold">
          Chúng tôi có thể giúp gì cho bạn?
        </h1>
        <p className="text-gray-600 mt-2">
          Tìm kiếm câu trả lời cho các câu hỏi thường gặp về dịch vụ của chúng
          tôi.
        </p>

        {/* SEARCH BAR */}
        <div className="max-w-xl mx-auto mt-6">
          <div className="flex items-center bg-gray-100 px-4 py-3 rounded-xl">
            <Search className="text-gray-500 w-5 h-5 mr-2" />
            <input
              placeholder="Tìm kiếm câu hỏi của bạn..."
              className="bg-transparent outline-none w-full"
            />
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto py-12 grid grid-cols-1 md:grid-cols-4 gap-10 px-4">
        {/* LEFT SIDEBAR */}
        <FAQSidebar />

        {/* RIGHT CONTENT */}
        <div className="md:col-span-3">
          <h2 className="text-xl font-semibold mb-6">Đặt & Đặt chỗ Tour</h2>

          <div className="space-y-4">
            <FAQAccordion
              question="Làm thế nào để tôi đặt một tour?"
              answer="Để đặt tour, bạn chỉ cần chọn điểm đến và ngày đi mong muốn, sau đó nhấp vào nút 'Đặt ngay'. Hệ thống sẽ hướng dẫn bạn qua các bước tiếp theo để hoàn tất thanh toán và xác nhận."
            />

            <FAQAccordion
              question="Tôi có thể đặt tour cho nhóm lớn không?"
              answer="Có, chúng tôi hỗ trợ đặt tour cho nhóm từ 10 người trở lên với nhiều ưu đãi hấp dẫn. Liên hệ đội ngũ tư vấn nếu bạn cần hỗ trợ."
            />

            <FAQAccordion
              question="Làm sao để biết tour của tôi đã được xác nhận?"
              answer="Sau khi thanh toán thành công, hệ thống sẽ gửi email và thông báo xác nhận chi tiết tour cho bạn."
            />

            <FAQAccordion
              question="Tôi có thể thay đổi ngày đi sau khi đã đặt tour không?"
              answer="Có, bạn có thể yêu cầu thay đổi ngày đi ít nhất 7 ngày trước ngày khởi hành. Một số tour có thể áp dụng phí thay đổi."
            />
          </div>

          {/* SUPPORT BOX */}
          <div className="mt-12 bg-blue-50 p-10 rounded-xl text-center">
            <h3 className="text-lg font-semibold mb-2">
              Không tìm thấy câu trả lời?
            </h3>
            <p className="text-gray-600">
              Đừng lo, đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp đỡ bạn.
            </p>

            <div className="flex justify-center gap-4 mt-6">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition">
                <MessageCircle className="w-5 h-5" /> Chat với chúng tôi
              </button>

              <button className="px-6 py-3 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-100 transition">
                <Send className="w-5 h-5" /> Gửi yêu cầu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
