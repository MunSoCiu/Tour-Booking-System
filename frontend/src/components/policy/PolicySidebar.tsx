"use client";

export default function PolicySidebar() {
  const items = [
    "Giới thiệu chung",
    "Thông tin chúng tôi thu thập",
    "Mục đích thu thập",
    "Phạm vi chia sẻ thông tin",
    "Thời gian lưu trữ dữ liệu",
    "Quyền của người dùng",
    "Bảo mật dữ liệu",
    "Thay đổi chính sách",
    "Thông tin liên hệ",
  ];

  const active = "Giới thiệu chung";

  return (
    <aside className="space-y-3">
      <h3 className="font-semibold text-gray-700 mb-2">Nội dung chính sách</h3>

      {items.map((item) => (
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
