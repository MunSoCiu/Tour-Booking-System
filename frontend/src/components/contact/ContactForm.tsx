"use client";

import { useState } from "react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const submitForm = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="bg-white border rounded-xl shadow-sm p-6">
      <h3 className="text-xl font-semibold mb-4">Gửi tin nhắn cho chúng tôi</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Họ và tên</label>
          <input
            defaultValue="Nguyễn Văn A"
            className="mt-1 w-full border rounded-lg px-3 py-2 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            defaultValue="nva@email.com"
            className="mt-1 w-full border rounded-lg px-3 py-2 outline-none focus:border-blue-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm font-medium">Chủ đề</label>
          <input
            placeholder="Về chuyến đi Vịnh Hạ Long..."
            className="mt-1 w-full border rounded-lg px-3 py-2 outline-none focus:border-blue-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm font-medium">Nội dung tin nhắn</label>
          <textarea
            rows={5}
            placeholder="Nội dung chi tiết..."
            className="mt-1 w-full border rounded-lg px-3 py-2 outline-none focus:border-blue-500 resize-none"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={submitForm}
        className="mt-5 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
      >
        {loading ? "Đang gửi..." : "Gửi tin nhắn →"}
      </button>
    </div>
  );
}
