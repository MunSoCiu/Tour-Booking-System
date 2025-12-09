export default function AwardsSection() {
  const awards = [
    {
      year: 2020,
      title: "Top 10 Website Du Lịch",
      org: "Do Hiệp hội Du lịch Việt Nam bình chọn",
    },
    {
      year: 2021,
      title: "Thương Hiệu Truyền Cảm Hứng",
      org: "Asia Pacific Enterprise Awards",
    },
    {
      year: 2022,
      title: "Dịch Vụ Khách Hàng Xuất Sắc",
      org: "Customer Service Institute",
    },
    {
      year: 2023,
      title: "Startup Công Nghệ Du Lịch",
      org: "Giải thưởng Techfest Vietnam",
    },
    {
      year: 2024,
      title: "Nền Tảng Du Lịch Sáng Tạo",
      org: "Giải thưởng Sáng tạo Việt Nam",
    },
    {
      year: 2025,
      title: "Doanh Nghiệp Phát Triển Bền Vững",
      org: "Giải thưởng Phát triển Bền vững Việt Nam",
    },
  ];

  return (
    <section className="mt-20 px-6 text-center">
      <h2 className="text-2xl font-bold">Thành Tựu & Giải Thưởng</h2>
      <p className="text-gray-600 mt-2">
        Những cột mốc đáng tự hào là minh chứng cho sự nỗ lực và cam kết của
        chúng tôi.
      </p>

      <div className="max-w-4xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {awards.map((a, i) => (
          <div key={i} className="bg-gray-50 rounded-xl py-8 shadow-sm">
            <p className="text-3xl font-bold text-blue-600">{a.year}</p>
            <p className="mt-3 font-semibold">{a.title}</p>
            <p className="text-gray-600 text-sm mt-1">{a.org}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
