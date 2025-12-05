import Image from "next/image";

const latestPosts = [
  {
    title: "10 mẹo “săn” vé máy bay giá rẻ không phải ai cũng biết",
    date: "15 Tháng 7, 2024",
    author: "Lê Minh Cường",
    cover: "/placeholder.png",
  },
  {
    title: "Hành trình khám phá Hà Giang – Vẻ đẹp hùng vĩ nơi địa đầu Tổ quốc",
    date: "12 Tháng 7, 2024",
    author: "Nguyễn Văn An",
    cover: "/images/girl-portrait.jpg",
  },
  {
    title: "Top 5 món ăn nhất định phải thử khi đến Đà Nẵng",
    date: "10 Tháng 7, 2024",
    author: "Trịnh Thị Bích",
    cover: "/placeholder.png",
  },
  {
    title: "Review chi tiết lịch trình du lịch Phú Quốc 3 ngày 2 đêm tự túc",
    date: "8 Tháng 7, 2024",
    author: "Phạm Thùy Dung",
    cover: "/placeholder.png",
  },
];

export default function BlogLatestList() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Bài viết mới nhất</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {latestPosts.map((post, i) => (
          <div key={i} className="space-y-3">
            {/* COVER */}
            <div className="w-full h-56 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
              {post.cover.endsWith("placeholder.png") ? (
                <Image
                  src="/icons/image-placeholder.svg"
                  width={40}
                  height={40}
                  alt="placeholder"
                />
              ) : (
                <Image
                  src={post.cover}
                  alt="cover"
                  width={600}
                  height={400}
                  className="object-cover w-full h-full"
                />
              )}
            </div>

            {/* TITLE */}
            <h3 className="font-semibold text-lg">{post.title}</h3>

            {/* META INFO */}
            <p className="text-sm text-gray-500">
              Bởi {post.author} · {post.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
