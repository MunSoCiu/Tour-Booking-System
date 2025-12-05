"use client";

export default function FAQSidebar() {
  const categories = [
    "Thông tin chung",
    "Đặt & Đặt chỗ Tour",
    "Thanh toán & Hóa đơn",
    "Hủy Tour & Hoàn tiền",
    "Tài khoản & Thông tin",
    "Chuẩn bị cho chuyến đi",
  ];

  const active = "Đặt & Đặt chỗ Tour";

  return (
    <aside className="space-y-2">
      <h3 className="font-semibold text-gray-700 mb-2">Danh mục</h3>

      {categories.map((item) => (
        <button
          key={item}
          className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${
            item === active
              ? "bg-blue-50 text-blue-600"
              : "hover:bg-gray-100 text-gray-700"
          }`}
        >
          {item}
        </button>
      ))}
    </aside>
  );
}
