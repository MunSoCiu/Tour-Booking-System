import MissionSection from "@/components/about/MissionSection";
import CoreValues from "@/components/about/CoreValues";
import TeamSection from "@/components/about/TeamSection";
import AwardsSection from "@/components/about/AwardsSection";

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen pb-20">
      {/* TITLE */}
      <div className="text-center mt-12 px-4">
        <h1 className="text-4xl font-bold">Câu Chuyện Của Traveloka</h1>
        <p className="text-gray-600 mt-2">
          Hành trình mang những trải nghiệm du lịch tuyệt vời nhất đến với mọi
          người, mọi nhà.
        </p>
      </div>

      {/* SECTIONS */}
      <MissionSection />
      <CoreValues />
      <TeamSection />
      <AwardsSection />
    </div>
  );
}
