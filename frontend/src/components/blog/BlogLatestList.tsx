import Image from "next/image";

const latestPosts = [
  {
    slug: "san-ve-may-bay-gia-re",
    title: "10 mẹo săn vé máy bay giá rẻ không phải ai cũng biết",
    date: "15 Tháng 7, 2020",
    author: "Lê Minh Cường",
    category: "Kinh nghiệm",
    cover: "/images/blog1.jpg",
    excerpt:
      "Chia sẻ các mẹo đặt vé máy bay giá rẻ, tránh tăng giá, lựa chọn thời điểm vàng để book vé.",
  },
  {
    slug: "kham-pha-ha-giang",
    title: "Hành trình khám phá Hà Giang – Vẻ đẹp hùng vĩ nơi địa đầu Tổ quốc",
    date: "12 Tháng 1, 2024",
    author: "Nguyễn Văn An",
    category: "Điểm đến",
    cover: "/images/tours/1.jpg",
    excerpt:
      "Hà Giang thu hút du khách bởi núi đá hùng vĩ, cung đường Mã Pì Lèng và văn hóa bản địa.",
  },
  {
    slug: "am-thuc-da-nang",
    title: "Top 5 món ăn nhất định phải thử khi đến Đà Nẵng",
    date: "10 Tháng 10, 2022",
    author: "Trịnh Thị Bích",
    category: "Ẩm thực",
    cover: "/images/blog2.jpg",
    excerpt:
      "Đà Nẵng không chỉ nổi tiếng bởi cảnh đẹp mà còn có nền ẩm thực đường phố cực hấp dẫn.",
  },
  {
    slug: "review-phu-quoc-3n2d",
    title: "Review chi tiết lịch trình du lịch Phú Quốc 3N2Đ tự túc",
    date: "8 Tháng 12, 2025",
    author: "Phạm Thùy Dung",
    category: "Du lịch biển",
    cover: "/images/phuquoc.jpg",
    excerpt:
      "Phú Quốc – thiên đường nghỉ dưỡng với biển xanh, resort đẹp và hải sản tươi ngon.",
  },
];

export default function BlogLatestList() {
  return (
    <div className="p-5 bg-white shadow rounded-xl">
      <h3 className="text-xl font-bold mb-4">Bài viết mới nhất</h3>

      <div className="space-y-4">
        {latestPosts.map((post) => (
          <a
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="flex items-center gap-4 hover:opacity-80 transition"
          >
            <Image
              src={post.cover}
              alt={post.title}
              width={90}
              height={60}
              className="rounded-md object-cover cursor-pointer"
            />
            <p className="font-medium">{post.title}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
