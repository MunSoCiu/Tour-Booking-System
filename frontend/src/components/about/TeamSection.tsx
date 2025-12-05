import Image from "next/image";

export default function TeamSection() {
  const team = [
    {
      name: "Nguyễn Văn An",
      role: "CEO & Founder",
      avatar: "/images/girl-portrait.jpg",
      desc: "Với niềm đam mê du lịch bất tận, anh An đã sáng lập Traveloka với mong muốn chia sẻ vẻ đẹp Việt Nam đến mọi người.",
    },
    {
      name: "Trần Thị Bích",
      role: "Head of Operations",
      avatar: "/placeholder.png",
      desc: "Chị Bích là người đảm bảo mọi hoạt động diễn ra suôn sẻ, mang đến trải nghiệm hoàn hảo cho khách hàng.",
    },
    {
      name: "Lê Minh Cường",
      role: "CTO",
      avatar: "/placeholder.png",
      desc: "Anh Cường dẫn dắt đội ngũ kỹ thuật, xây dựng nền tảng công nghệ vững chắc cho Traveloka.",
    },
    {
      name: "Phạm Thùy Dung",
      role: "Head of Marketing",
      avatar: "/placeholder.png",
      desc: "Chị Dung chịu trách nhiệm về chiến lược marketing, giúp lan tỏa câu chuyện Traveloka đến cộng đồng.",
    },
  ];

  return (
    <section className="mt-20 text-center px-6">
      <h2 className="text-2xl font-bold">Đội Ngũ Của Chúng Tôi</h2>
      <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
        Gặp gỡ những con người đầy nhiệt huyết đứng sau thành công của
        Traveloka.
      </p>

      <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {team.map((m, i) => (
          <div key={i} className="text-center space-y-3">
            <div className="w-32 h-32 mx-auto rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
              {m.avatar.includes("placeholder") ? (
                <Image
                  src="/icons/image-placeholder.svg"
                  width={40}
                  height={40}
                  alt="placeholder"
                />
              ) : (
                <Image
                  src={m.avatar}
                  alt={m.name}
                  width={200}
                  height={200}
                  className="object-cover w-full h-full"
                />
              )}
            </div>

            <h3 className="font-semibold">{m.name}</h3>
            <p className="text-blue-600 text-sm font-medium">{m.role}</p>
            <p className="text-gray-600 text-sm">{m.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
