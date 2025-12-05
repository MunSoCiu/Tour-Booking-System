import SearchBar from "./SearchBar";

interface HeroProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  showSearch?: boolean;
}

export default function Hero({
  title = "Khám Phá Thế Giới, Tìm Kiếm Cuộc Phiêu Lưu Tiếp Theo",
  subtitle = "Đặt tour du lịch dễ dàng và nhanh chóng với những ưu đãi tốt nhất.",
  backgroundImage = "/images/hero-bg.jpg",
  showSearch = true,
}: HeroProps) {
  return (
    <section
      className="relative h-[500px] bg-gradient-to-r from-blue-600 to-blue-800"
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
          {title}
        </h1>
        <p className="text-xl text-white/90 mb-8 max-w-2xl animate-fade-in">
          {subtitle}
        </p>

        {showSearch && (
          <div className="w-full animate-slide-up">
            <SearchBar />
          </div>
        )}
      </div>
    </section>
  );
}
