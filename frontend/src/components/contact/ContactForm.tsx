"use client";

import { useState } from "react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async () => {
    if (!form.name || !form.email || !form.subject || !form.message) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Gửi thất bại. Vui lòng thử lại.");
      } else {
        alert(data.message || "Gửi liên hệ thành công!");
        setForm({ name: "", email: "", subject: "", message: "" });
      }
    } catch (error) {
      alert("Không thể gửi tin nhắn. Hãy thử lại sau.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-white border rounded-xl shadow-sm p-6">
      <h3 className="text-xl font-semibold mb-4">Gửi tin nhắn cho chúng tôi</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label className="text-sm font-medium">Họ và tên</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="mt-1 w-full border rounded-lg px-3 py-2 outline-none focus:border-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            className="mt-1 w-full border rounded-lg px-3 py-2 outline-none focus:border-blue-500"
          />
        </div>

        {/* Subject */}
        <div className="md:col-span-2">
          <label className="text-sm font-medium">Chủ đề</label>
          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className="mt-1 w-full border rounded-lg px-3 py-2 outline-none focus:border-blue-500"
          />
        </div>

        {/* Message */}
        <div className="md:col-span-2">
          <label className="text-sm font-medium">Nội dung tin nhắn</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={5}
            className="mt-1 w-full border rounded-lg px-3 py-2 outline-none resize-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={submitForm}
        disabled={loading}
        className="mt-5 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition"
      >
        {loading ? "Đang gửi..." : "Gửi tin nhắn →"}
      </button>
    </div>
  );
}
