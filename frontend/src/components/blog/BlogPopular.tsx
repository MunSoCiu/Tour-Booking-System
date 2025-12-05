import Image from "next/image";

const popular = [
  {
    title: "Cẩm nang du lịch Đà Lạt từ A–Z cho người đi lần đầu",
    author: "Nguyễn Văn An",
    cover: "/placeholder.png",
  },
  {
    title: "Kinh nghiệm phượt Tây Bắc mùa lúa chín đẹp mê hồn",
    author: "Lê Minh Cường",
    cover: "/images/girl-portrait.jpg",
  },
  {
    title: "Gợi ý lịch trình vi vu Hội An – Cù Lao Chàm 2 ngày 1 đêm",
    author: "Phạm Thùy Dung",
    cover: "/placeholder.png",
  },
];

export default function BlogPopular() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Bài viết phổ biến</h2>

      {popular.map((p, i) => (
        <div key={i} className="flex gap-4 items-start">
          {/* IMAGE */}
          <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
            {p.cover.endsWith("placeholder.png") ? (
              <Image
                src="/icons/image-placeholder.svg"
                width={30}
                height={30}
                alt="placeholder"
              />
            ) : (
              <Image
                src={p.cover}
                width={200}
                height={200}
                className="object-cover w-full h-full"
                alt=""
              />
            )}
          </div>

          {/* TEXT */}
          <div>
            <p className="font-medium leading-snug">{p.title}</p>
            <p className="text-gray-500 text-sm mt-1">Bởi {p.author}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
