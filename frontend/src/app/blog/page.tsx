"use client";

import { useState, useMemo } from "react";
import { useEffect } from "react";
import Image from "next/image";

// IMPORT COMPONENTS
import BlogCategoryFilter from "@/components/blog/BlogCategoryFilter";
import BlogSearch from "@/components/blog/BlogSearch";
import BlogLatestList from "@/components/blog/BlogLatestList";
import BlogPopular from "@/components/blog/BlogPopular";

// DỮ LIỆU BÀI VIẾT
const allPosts = [
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
    category: "Du lịch núi",
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
  {
    slug: "van-hoa-tay-nguyen",
    title: "Khám phá nét văn hóa độc đáo của người dân tộc Tây Nguyên",
    date: "5 Tháng 7, 2025",
    author: "Lê Thị Hồng",
    category: "Du lịch núi",
    cover: "/images/mountains.jpg",
    excerpt:
      "Tây Nguyên với những lễ hội truyền thống, kiến trúc nhà rông và phong tục độc đáo.",
  },
  {
    slug: "kinh-nghiem-du-lich-ha-noi",
    title: "Kinh nghiệm khám phá Hà Nội trong 3 ngày",
    date: "12 Tháng 7, 2025",
    author: "Nguyễn Minh Anh",
    category: "Du lịch trong nước",
    cover: "/images/hanoi.jpg",
    excerpt:
      "Gợi ý lịch trình khám phá Hà Nội với phố cổ, ẩm thực và các điểm tham quan nổi bật.",
  },
  {
    slug: "du-lich-da-nang-tu-tuc",
    title: "Bí quyết du lịch Đà Nẵng tự túc tiết kiệm",
    date: "8 Tháng 7, 2025",
    author: "Trần Quốc Huy",
    category: "Du lịch biển",
    cover: "/images/danang.jpg",
    excerpt:
      "Kinh nghiệm đi lại, ăn uống và những điểm check-in đẹp tại Đà Nẵng.",
  },
  {
    slug: "am-thuc-hue-co-truyen",
    title: "Khám phá ẩm thực Huế truyền thống",
    date: "10 Tháng 7, 2025",
    author: "Phạm Thu Hà",
    category: "Ẩm thực",
    cover: "/images/hue-food.jpg",
    excerpt:
      "Hương vị đậm đà của món bún bò huế, bánh bèo và loạt món cung đình.",
  },
  {
    slug: "du-lich-sapa-thang-7",
    title: "Sapa tháng 7 — thời tiết, lịch trình và lưu ý",
    date: "4 Tháng 7, 2025",
    author: "Lê Minh Nhật",
    category: "Du lịch núi",
    cover: "/images/sapa.jpg",
    excerpt:
      "Thời điểm đẹp để săn mây, khám phá bản làng và trải nghiệm văn hóa Tây Bắc.",
  },
  {
    slug: "kinh-nghiem-cam-trai-da-lat",
    title: "Kinh nghiệm cắm trại săn mây ở Đà Lạt",
    date: "6 Tháng 7, 2025",
    author: "Vũ Hoài Nam",
    category: "Du lịch núi",
    cover: "/images/dalat-camping.jpg",
    excerpt:
      "Các địa điểm săn mây hấp dẫn, dụng cụ cần chuẩn bị và tips an toàn.",
  },
  {
    slug: "checkin-phu-quoc",
    title: "Những điểm check-in không thể bỏ qua ở Phú Quốc",
    date: "9 Tháng 7, 2025",
    author: "Trần Hồng Ngọc",
    category: "Du lịch biển",
    cover: "/images/phuquoc.jpg",
    excerpt:
      "Phú Quốc nổi bật với biển xanh, hoàng hôn đẹp và nhiều hoạt động giải trí.",
  },
  {
    slug: "kinh-nghiem-du-lich-nha-trang",
    title: "Kinh nghiệm đi du lịch Nha Trang cho người mới",
    date: "7 Tháng 7, 2025",
    author: "Đỗ Thành Tâm",
    category: "Du lịch biển",
    cover: "/images/nhatrang.jpg",
    excerpt: "Lịch trình tham quan VinWonders, đảo Bình Ba và ăn hải sản.",
  },
  {
    slug: "review-du-lich-quy-nhon",
    title: "Review du lịch Quy Nhơn — thành phố biển yên bình",
    date: "10 Tháng 7, 2025",
    author: "Lê Minh Khoa",
    category: "Du lịch biển",
    cover: "/images/quynhon.jpg",
    excerpt:
      "Eo Gió, Kỳ Co và các món hải sản tươi ngon khiến du khách mê mẩn.",
  },
  {
    slug: "kinh-nghiem-du-lich-singapore",
    title: "Kinh nghiệm du lịch Singapore tự túc 4 ngày 3 đêm",
    date: "11 Tháng 7, 2025",
    author: "Hoàng Thuỳ Linh",
    category: "Du lịch nước ngoài",
    cover: "/images/singapore.jpg",
    excerpt:
      "Universal Studio, Marina Bay và loạt điểm vui chơi hấp dẫn tại Singapore.",
  },
  {
    slug: "du-lich-thai-lan-gia-re",
    title: "Tips đi du lịch Thái Lan giá rẻ nhưng vẫn vui hết nấc",
    date: "2 Tháng 7, 2025",
    author: "Nguyễn Đức Trí",
    category: "Du lịch nước ngoài",
    cover: "/images/thailand.jpg",
    excerpt:
      "Gợi ý khách sạn, ăn uống và điểm tham quan tại Bangkok – Pattaya.",
  },
  {
    slug: "trai-nghiem-bali",
    title: "Trải nghiệm Bali — thiên đường du lịch châu Á",
    date: "3 Tháng 7, 2025",
    author: "Lê Hoàng Uyên",
    category: "Du lịch nước ngoài",
    cover: "/images/bali.jpg",
    excerpt: "Bali nổi tiếng với đền cổ, ruộng bậc thang và bãi biển thơ mộng.",
  },
  {
    slug: "hanh-trinh-da-nang-hoi-an",
    title: "Hành trình Đà Nẵng – Hội An 3 ngày 2 đêm",
    date: "6 Tháng 7, 2025",
    author: "Phạm Long Vũ",
    category: "Du lịch trong nước",
    cover: "/images/hoian.jpg",
    excerpt:
      "Kết hợp nghỉ biển Đà Nẵng và dạo phố cổ Hội An lung linh ánh đèn.",
  },
  {
    slug: "du-lich-nhat-ban-mua-xuan",
    title: "Du lịch Nhật Bản mùa hoa anh đào",
    date: "15 Tháng 7, 2025",
    author: "Mai Nhật Hạ",
    category: "Du lịch nước ngoài",
    cover: "/images/japan.jpg",
    excerpt: "Những địa điểm ngắm sakura đẹp nhất tại Tokyo, Kyoto và Osaka.",
  },
  {
    slug: "du-lich-han-quoc-tu-tuc",
    title: "Du lịch Hàn Quốc tự túc — mọi thứ bạn cần biết",
    date: "14 Tháng 7, 2025",
    author: "Kim Hữu Nghĩa",
    category: "Du lịch nước ngoài",
    cover: "/images/korea.jpg",
    excerpt: "Kinh nghiệm xin visa, đi lại, ăn uống và check-in Seoul.",
  },
  {
    slug: "kinh-nghiem-di-halong",
    title: "Kinh nghiệm du lịch vịnh Hạ Long",
    date: "1 Tháng 7, 2025",
    author: "Đinh Khánh Vy",
    category: "Du lịch biển",
    cover: "/images/halong.jpg",
    excerpt: "Du thuyền Hạ Long, hang Sửng Sốt và các điểm tham quan nổi bật.",
  },
  {
    slug: "thac-ban-gioc-review",
    title: "Review thác Bản Giốc — tuyệt tác thiên nhiên miền biên viễn",
    date: "12 Tháng 7, 2025",
    author: "Hoàng Gia Hân",
    category: "Du lịch núi",
    cover: "/images/ban-gioc.jpg",
    excerpt:
      "Một trong những thác nước đẹp nhất Việt Nam với cảnh quan hùng vĩ.",
  },
  {
    slug: "du-lich-malaysia-gia-dinh",
    title: "Gợi ý du lịch Malaysia cho gia đình",
    date: "5 Tháng 7, 2025",
    author: "Lê Như Ý",
    category: "Du lịch nước ngoài",
    cover: "/images/malaysia.jpg",
    excerpt: "Khám phá Kuala Lumpur, tháp đôi Petronas và các khu vui chơi.",
  },
  {
    slug: "du-lich-paris-lan-dau",
    title: "Kinh nghiệm khám phá Paris cho người đi lần đầu",
    date: "13 Tháng 7, 2025",
    author: "Phạm Đức Thành",
    category: "Du lịch nước ngoài",
    cover: "/images/paris.jpg",
    excerpt:
      "Thăm tháp Eiffel, bảo tàng Louvre và cách đi lại trong thành phố.",
  },
  {
    slug: "du-lich-my-tay-bac",
    title: "Khám phá Tây Bắc — hành trình của mây và núi",
    date: "15 Tháng 7, 2025",
    author: "Đỗ Hà My",
    category: "Du lịch núi",
    cover: "/images/taybac.jpg",
    excerpt: "Những cung đường tuyệt đẹp và văn hóa bản làng độc đáo.",
  },
  {
    slug: "kinh-nghiem-da-nang-foodtour",
    title: "Food tour Đà Nẵng — ăn gì cho đúng điệu?",
    date: "9 Tháng 7, 2025",
    author: "Hoàng Minh Tuấn",
    category: "Ẩm thực",
    cover: "/images/danang-food.jpg",
    excerpt: "Top món ngon như mì Quảng, bánh tráng thịt heo, bún chả cá.",
  },
  {
    slug: "du-lich-new-zealand",
    title: "5 lý do bạn nên đến New Zealand ít nhất một lần",
    date: "11 Tháng 7, 2025",
    author: "Võ Ngọc Anh",
    category: "Du lịch nước ngoài",
    cover: "/images/newzealand.jpg",
    excerpt:
      "Thiên nhiên xanh mướt, khí hậu dễ chịu và nhiều trải nghiệm độc đáo.",
  },
  {
    slug: "du-lich-london-tiet-kiem",
    title: "Cách du lịch London tiết kiệm nhất có thể",
    date: "16 Tháng 7, 2025",
    author: "Nguyễn Gia Bảo",
    category: "Du lịch nước ngoài",
    cover: "/images/london.jpg",
    excerpt: "Gợi ý di chuyển, điểm tham quan miễn phí và mẹo giảm chi phí.",
  },
  {
    slug: "review-cao-bang",
    title: "Review Cao Bằng — thiên nhiên hoang sơ quyến rũ",
    date: "8 Tháng 7, 2025",
    author: "Hoàng Lan Chi",
    category: "Du lịch núi",
    cover: "/images/caobang.jpg",
    excerpt: "Những địa danh nổi tiếng: thác Bản Giốc, động Ngườm Ngao.",
  },
  {
    slug: "du-lich-canada-mua-thu",
    title: "Du lịch Canada mùa thu — rực rỡ sắc lá vàng",
    date: "10 Tháng 7, 2025",
    author: "Dương Hữu Phát",
    category: "Du lịch nước ngoài",
    cover: "/images/canada.jpg",
    excerpt: "Lộ trình ngắm lá phong tuyệt đẹp tại Toronto và Vancouver.",
  },
  {
    slug: "du-lich-ha-giang-phuot",
    title: "Kinh nghiệm phượt Hà Giang dành cho người mới",
    date: "14 Tháng 7, 2025",
    author: "Vũ Anh Quân",
    category: "Du lịch núi",
    cover: "/images/hagiang.jpg",
    excerpt: "Cung đường đèo Mã Pí Lèng hùng vĩ và bản sắc văn hóa địa phương.",
  },
  {
    slug: "an-gi-o-hue",
    title: "Ăn gì ở Huế? Top món ngon không thể bỏ lỡ",
    date: "13 Tháng 7, 2025",
    author: "Ngô Tường Vy",
    category: "Ẩm thực",
    cover: "/images/hue-food2.jpg",
    excerpt: "Bánh khoái, nem lụi, chè cung đình là những món phải thử.",
  },
  {
    slug: "du-lich-australia-sydney",
    title: "Khám phá Sydney — thành phố hiện đại bên bờ biển",
    date: "7 Tháng 7, 2025",
    author: "Hồ Đức Lâm",
    category: "Du lịch nước ngoài",
    cover: "/images/sydney.jpg",
    excerpt: "Nhà hát con sò, cầu cảng Sydney và những bãi biển đẹp.",
  },
  {
    slug: "du-lich-dubai-sang-chanh",
    title: "Dubai — thành phố của sự xa hoa và hiện đại",
    date: "8 Tháng 7, 2025",
    author: "Lý Khánh Ngân",
    category: "Du lịch nước ngoài",
    cover: "/images/dubai.jpg",
    excerpt: "Burj Khalifa, sa mạc Safari và các trung tâm thương mại lớn.",
  },
  {
    slug: "du-lich-hue-3-ngay",
    title: "Gợi ý lịch trình du lịch Huế trong 3 ngày",
    date: "9 Tháng 7, 2025",
    author: "Phan Quang Thái",
    category: "Du lịch trong nước",
    cover: "/images/hue.jpg",
    excerpt: "Kinh thành Huế, chùa Thiên Mụ và các lăng tẩm nổi tiếng.",
  },
  {
    slug: "du-lich-lao-cai-thang-7",
    title: "Lào Cai tháng 7 — điểm đến lý tưởng cho mùa hè",
    date: "10 Tháng 7, 2025",
    author: "Đinh Trúc Lam",
    category: "Du lịch núi",
    cover: "/images/laocai.jpg",
    excerpt: "Ruộng bậc thang, bản làng và trải nghiệm văn hóa độc đáo.",
  },
  {
    slug: "du-lich-hong-kong-tu-tuc",
    title: "Du lịch Hong Kong tự túc — những điều cần biết",
    date: "11 Tháng 7, 2025",
    author: "Vương Minh Kha",
    category: "Du lịch nước ngoài",
    cover: "/images/hongkong.jpg",
    excerpt:
      "Skyline rực sáng, ẩm thực đường phố và các trung tâm mua sắm lớn.",
  },
  {
    slug: "du-lich-indonesia-java",
    title: "Khám phá đảo Java — trái tim của Indonesia",
    date: "6 Tháng 7, 2025",
    author: "Hà Khánh Linh",
    category: "Du lịch nước ngoài",
    cover: "/images/java.jpg",
    excerpt: "Núi lửa Bromo, đền Borobudur và cảnh quan độc đáo.",
  },
  {
    slug: "du-lich-phu-yen",
    title: "Phú Yên — xứ hoa vàng cỏ xanh đầy thơ mộng",
    date: "3 Tháng 7, 2025",
    author: "Nguyễn Hà Phương",
    category: "Du lịch biển",
    cover: "/images/phuyen.jpg",
    excerpt: "Ghềnh Đá Đĩa, bãi Xép và các địa điểm sống ảo nổi tiếng.",
  },
  {
    slug: "du-lich-canh-dep-trung-quoc",
    title: "Top cảnh đẹp Trung Quốc bạn nên ghé ít nhất một lần",
    date: "5 Tháng 7, 2025",
    author: "Trần Quốc Đại",
    category: "Du lịch nước ngoài",
    cover: "/images/china.jpg",
    excerpt: "Trương Gia Giới, Vạn Lý Trường Thành và nhiều kỳ quan khác.",
  },
  {
    slug: "kinh-nghiem-du-lich-vung-tau",
    title: "Kinh nghiệm du lịch Vũng Tàu — ăn chơi thả ga",
    date: "2 Tháng 7, 2025",
    author: "Nguyễn Tâm Đan",
    category: "Du lịch biển",
    cover: "/images/vungtau.jpg",
    excerpt: "Bãi Sau, Hải đăng và những quán hải sản ngon rẻ.",
  },
];

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tất cả");
  const [page, setPage] = useState(1);

  const POSTS_PER_PAGE = 6;

  // RESET PAGE MỖI KHI LỌC HOẶC SEARCH
  useEffect(() => {
    setPage(1);
  }, [search, category]);

  // FILTER POSTS
  const filtered = useMemo(() => {
    return allPosts.filter((p) => {
      const matchCategory =
        category === "Tất cả" ? true : p.category === category;

      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [search, category]);

  // PAGINATION
  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);

  const paginatedPosts = filtered.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE
  );

  return (
    <div className="w-full pb-20">
      {/* HERO */}
      <section className="relative h-[320px] w-full">
        <Image
          src="/images/blog-hero.jpg"
          alt="Blog Hero"
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
            Góc Chia Sẻ Kinh Nghiệm Du Lịch
          </h1>
          <p className="text-lg opacity-90 mt-3 max-w-2xl">
            Khám phá bài viết hữu ích, mẹo du lịch và các điểm đến đẹp nhất.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-10">
          <div
            onChange={(e) => setSearch((e.target as HTMLInputElement).value)}
          >
            <BlogSearch />
          </div>

          <BlogCategoryFilter setCategory={setCategory} />

          {/* POSTS GRID – NEW UI */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {paginatedPosts.map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                {/* IMAGE */}
                <div className="relative w-full h-40 overflow-hidden">
                  <Image
                    src={
                      post.cover.endsWith("placeholder.png")
                        ? "/icons/image-placeholder.svg"
                        : post.cover
                    }
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-4 space-y-2">
                  <h2 className="font-semibold text-base group-hover:text-blue-600 transition line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="text-gray-500 text-xs">
                    Bởi {post.author} · {post.date}
                  </p>

                  <p className="text-gray-600 text-sm line-clamp-2">
                    {post.excerpt}
                  </p>

                  <span className="inline-block text-sm text-blue-600 font-medium group-hover:underline pt-1">
                    Đọc tiếp →
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* PAGINATION DOTS */}
          <div className="flex justify-center mt-8 space-x-3">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-4 h-4 rounded-full transition ${
                  page === i + 1 ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-12">
          <BlogPopular />
          <BlogLatestList />
        </div>
      </section>
    </div>
  );
}
