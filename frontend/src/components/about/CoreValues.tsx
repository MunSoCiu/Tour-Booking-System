import { Users, ShieldCheck, RefreshCw } from "lucide-react";

export default function CoreValues() {
  const values = [
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Khách hàng là trung tâm",
      desc: "Mọi quyết định và hành động của chúng tôi đều bắt nguồn từ lợi ích và sự hài lòng của khách hàng.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
      title: "Chất lượng & Tin cậy",
      desc: "Cam kết mang đến những sản phẩm và dịch vụ chất lượng cao, an toàn và đáng tin cậy.",
    },
    {
      icon: <RefreshCw className="w-8 h-8 text-blue-600" />,
      title: "Đổi mới không ngừng",
      desc: "Luôn tìm tòi, sáng tạo và ứng dụng công nghệ để nâng cao trải nghiệm người dùng.",
    },
  ];

  return (
    <section className="mt-20 text-center px-6">
      <h2 className="text-2xl font-bold">Giá Trị Cốt Lõi</h2>
      <p className="text-gray-600 mt-2">
        Những nguyên tắc vàng định hình nên văn hóa và con người Traveloka.
      </p>

      <div className="max-w-4xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-12">
        {values.map((v, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-gray-700 space-y-3"
          >
            {v.icon}
            <h3 className="font-semibold">{v.title}</h3>
            <p className="text-sm text-gray-600">{v.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
