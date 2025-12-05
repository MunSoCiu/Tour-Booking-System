"use client";

import Image from "next/image";
import PromotionCard from "@/components/deals/PromotionCard";

export default function DealsPage() {
  return (
    <div className="w-full">
      {/* -------------------------------------------- */}
      {/* HERO BANNER */}
      {/* -------------------------------------------- */}
      <section className="relative h-[360px] w-full">
        <Image
          src="/images/deals-hero.jpg"
          alt="Deals Hero"
          fill
          className="object-cover brightness-75"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white font-bold text-4xl md:text-5xl drop-shadow-lg">
            Săn Ưu Đãi Vàng, Du Lịch Thả Ga
          </h1>
          <p className="text-white mt-3 text-lg opacity-90 max-w-2xl">
            Khám phá các chương trình khuyến mãi hấp dẫn nhất và lên kế hoạch
            cho chuyến đi trong mơ của bạn với chi phí tiết kiệm bất ngờ!
          </p>
        </div>
      </section>

      {/* -------------------------------------------- */}
      {/* FILTERS */}
      {/* -------------------------------------------- */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Tất Cả Khuyến Mãi</h2>

          <div className="flex gap-3">
            <button className="px-4 py-2 rounded-full bg-blue-600 text-white font-medium">
              Tất Cả
            </button>
            <button className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
              Tour theo mùa
            </button>
            <button className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
              Flash Sale
            </button>
            <button className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
              Khách hàng thân thiết
            </button>
          </div>
        </div>

        {/* -------------------------------------------- */}
        {/* PROMOTION GRID */}
        {/* -------------------------------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PromotionCard
            tag="-30%"
            tagColor="bg-red-500"
            title="Flash Sale: Khám Phá Châu Á 5N4Đ"
            desc="Ưu đãi siêu phong phú cho chuyến du hành văn hóa và ẩm thực tại các thành phố nổi tiếng."
            valid="15/07 - 20/7/2024"
            oldPrice="7.000.000đ"
            price="4.900.000đ"
            image="/images/chau-a.jpg"
            action="Đặt Ngay"
          />

          <PromotionCard
            tag="Deal Mùa Hè"
            tagColor="bg-green-600"
            title="Chào Hè Sôi Động Tại Sapa"
            desc="Tận hưởng không khí trong lành và vẻ đẹp hùng vĩ của ruộng bậc thang mùa nước đổ."
            valid="01/06 - 30/08/2024"
            oldPrice="4.500.000đ"
            price="3.800.000đ"
            image="/images/sapa.jpg"
          />

          <PromotionCard
            tag="Ưu Đãi VIP"
            tagColor="bg-purple-500"
            title="Trí Ân Khách Hàng Thân Thiết"
            desc="Giảm giá đặc quyền cho nhóm khách VIP khi đặt tour Châu Âu 7 ngày."
            valid="Đến hết 31/12/2024"
            oldPrice="15.000.000đ"
            price="12.000.000đ"
            image="/images/paris.jpg"
          />

          <PromotionCard
            tag="-20%"
            tagColor="bg-yellow-400"
            title="Giảm Giá Tour Vịnh Hạ Long"
            desc="Khám phá kỳ quan thiên nhiên thế giới với du thuyền sang trọng."
            valid="01/09 - 30/10/2024"
            oldPrice="3.500.000đ"
            price="2.800.000đ"
            image="/images/halong.jpg"
          />

          <PromotionCard
            tag="Gói Vàng"
            tagColor="bg-yellow-500"
            title="Flash Sale Cuối Tuần: Vi Vu Đà Nẵng"
            desc="Chỉ 48h để săn tour Đà Nẵng – Hội An 3N2Đ với giá cực sốc."
            valid="19/07 - 21/07/2024"
            oldPrice="4.000.000đ"
            price="2.999.000đ"
            image="/images/danang.jpg"
            action="Đặt Ngay"
          />

          <PromotionCard
            tag="Đặt Sớm"
            tagColor="bg-blue-600"
            title="Ưu Đãi Đặt Sớm Tour Sa Mạc"
            desc="Khám phá trái tim hoang mạc với chuyến phiêu lưu độc đáo."
            valid="Đặt trước 30/09/2024"
            oldPrice="9.000.000đ"
            price="7.500.000đ"
            image="/images/desert.jpg"
          />
        </div>
      </section>
    </div>
  );
}
