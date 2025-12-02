"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert(
        "Tin nhắn của bạn đã được gửi đi! Chúng tôi sẽ phản hồi sớm nhất có thể."
      );
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Hotline hỗ trợ",
      content: "1900 1234",
      subContent: "Miễn phí từ 8:00 - 22:00 hàng ngày",
    },
    {
      icon: Mail,
      title: "Email",
      content: "hotro@traveloka.com",
      subContent: "Phản hồi trong vòng 24 giờ",
    },
    {
      icon: MapPin,
      title: "Địa chỉ văn phòng",
      content: "Tòa nhà Capital Place, 29 Liễu Giai, Ba Đình, Hà Nội",
      subContent: "Thứ 2 - Thứ 6: 8:00 - 18:00",
    },
    {
      icon: Clock,
      title: "Giờ làm việc",
      content: "Thứ 2 - Thứ 6: 8:00 - 18:00",
      subContent: "Thứ 7: 8:00 - 12:00",
    },
  ];

  const faqs = [
    {
      question: "Làm thế nào để tôi đặt một tour?",
      answer:
        'Bạn chỉ cần chọn điểm đến và ngày đi mong muốn, sau đó nhập vào nút "Đặt ngay". Hệ thống sẽ hướng dẫn bạn qua các bước tiếp theo để hoàn tất thanh toán và xác nhận đơn hàng của bạn.',
    },
    {
      question: "Chính sách hủy tour như thế nào?",
      answer:
        "Hủy trước 30 ngày: Hoàn 100% chi phí. Hủy trước 15-29 ngày: Hoàn 50%. Hủy trong vòng 14 ngày: Không hoàn tiền. Chính sách cụ thể có thể thay đổi tùy theo từng tour.",
    },
    {
      question: "Tôi có thể thay đổi ngày đi sau khi đã đặt tour không?",
      answer:
        "Có, bạn có thể yêu cầu thay đổi ngày đi bằng cách liên hệ với bộ phận chăm sóc khách hàng. Tuy nhiên, việc này tùy thuộc vào tình trạng còn chỗ của tour và có thể phát sinh phí.",
    },
    {
      question: "Làm sao để biết tour của tôi đã được xác nhận?",
      answer:
        'Bạn sẽ nhận được email xác nhận với đầy đủ chi tiết và vé điện tử ngay sau khi thanh toán thành công. Bạn cũng có thể kiểm tra trạng thái đặt chỗ trong mục "Đơn hàng của tôi".',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Liên hệ với chúng tôi
          </h1>
          <p className="text-xl text-white/90">
            Chúng tôi luôn sẵn sàng lắng nghe bạn. Vui lòng chọn một trong các
            phương thức liên hệ dưới đây.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <info.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{info.title}</h3>
              <p className="text-gray-900 font-medium mb-1">{info.content}</p>
              <p className="text-sm text-gray-600">{info.subContent}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center gap-2 mb-6">
              <MessageCircle className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold">Gửi tin nhắn cho chúng tôi</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Điền vào biểu mẫu dưới đây và chúng tôi sẽ liên hệ lại với bạn sớm
              nhất có thể.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Chủ đề
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Chọn chủ đề</option>
                    <option value="booking">Về chuyến đi Vịnh Hạ Long</option>
                    <option value="cancellation">Hủy/Đổi lịch tour</option>
                    <option value="payment">Thanh toán</option>
                    <option value="complaint">Khiếu nại</option>
                    <option value="other">Khác</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nội dung tin nhắn
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nội dung chi tiết..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
                {loading ? "Đang gửi..." : "Gửi tin nhắn"}
              </button>
            </form>
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">
              Câu hỏi thường gặp (FAQ)
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="bg-white rounded-lg shadow-md p-6 group"
                >
                  <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                    {faq.question}
                    <span className="text-blue-600 group-open:rotate-180 transition-transform">
                      ▼
                    </span>
                  </summary>
                  <p className="mt-4 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
              <h3 className="font-semibold text-blue-900 mb-2">
                Không tìm thấy câu trả lời?
              </h3>
              <p className="text-blue-800 mb-4">
                Đừng lo, đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp đỡ bạn.
              </p>
              <button className="text-blue-600 hover:text-blue-700 font-medium">
                Gửi yêu cầu →
              </button>
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-12 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-96 bg-gray-200 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-lg font-medium">Bản đồ văn phòng</p>
              <p className="text-sm mt-2">
                Tích hợp Google Maps hoặc Mapbox để hiển thị vị trí văn phòng
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
