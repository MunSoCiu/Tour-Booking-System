import Image from "next/image";

export default function MissionSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
      {/* LEFT TEXT */}
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <h2 className="text-xl font-semibold">Sứ mệnh của chúng tôi</h2>
        <p>
          Tại Traveloka, chúng tôi tin rằng du lịch không chỉ là di chuyển từ
          nơi này đến nơi khác, mà là một hành trình khám phá, học hỏi và kết
          nối. Sứ mệnh của chúng tôi là đơn giản hóa việc tìm kiếm và đặt tour,
          giúp mọi người dễ dàng tiếp cận với những chuyến đi mới mẻ.
        </p>

        <h2 className="text-xl font-semibold">Tầm nhìn tương lai</h2>
        <p>
          Chúng tôi hướng tới việc trở thành nền tảng đặt tour du lịch trực
          tuyến hàng đầu tại Việt Nam, mang đến trải nghiệm đa dạng, thuận tiện
          và tin cậy cho mọi người.
        </p>
      </div>

      {/* IMAGE */}
      <div className="w-full h-48 bg-gray-100 rounded-xl overflow-hidden border">
        <img
          src="/images/logo.jpg"
          alt="placeholder"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
