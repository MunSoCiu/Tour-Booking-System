"use client";

import { Target, Users, Award, Heart, Globe, Shield } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Khách hàng là trung tâm",
      description:
        "Mọi quyết định và hành động của chúng tôi đều hướng đến mục tiêu duy nhất: tạo ra những trải nghiệm du lịch tuyệt vời nhất cho khách hàng.",
    },
    {
      icon: Shield,
      title: "Chất lượng & Tin cậy",
      description:
        "Cam kết mang đến những sản phẩm và dịch vụ chất lượng cao, an toàn và đáng tin cậy. Khách sạn tốt, điểm tham quan chất lượng, thẩm mỹ và gia công tỉ mỉ trong từng chuyến đi.",
    },
    {
      icon: Globe,
      title: "Đổi mới không ngừng",
      description:
        "Luôn tìm kiếm và ứng dụng công nghệ mới, sáng tạo trong việc thiết kế tour, để mang lại những trải nghiệm du lịch độc đáo và phong phú.",
    },
  ];

  const team = [
    {
      name: "Nguyễn Văn An",
      position: "CEO & Founder",
      bio: "Với hơn 15 năm kinh nghiệm trong ngành du lịch, anh đã sáng lập Traveloka với mơ ước mang chuyến đi tài mỹ đến gần hơn với mọi người.",
      avatar: "NVA",
    },
    {
      name: "Trần Thị Bích",
      position: "Head of Operations",
      bio: "Chị Bích là người đảm bảo mỗi hoạt động diễn ra suôn sẻ, mang lại trải nghiệm tốt nhất cho khách hàng trong từng chuyến đi.",
      avatar: "TTB",
    },
    {
      name: "Lê Minh Cường",
      position: "CTO",
      bio: "Anh Cường dẫn dắt đội ngũ công nghệ, xây dựng nền tảng công nghệ tiên tiến giúp khách hàng dễ dàng tìm kiếm và đặt tour.",
      avatar: "LMC",
    },
    {
      name: "Phạm Thùy Dung",
      position: "Head of Marketing",
      bio: "Với kinh nghiệm trong lĩnh vực marketing du lịch, chị Dung giúp lan tỏa thông điệp và giá trị của Traveloka đến cộng đồng.",
      avatar: "PTD",
    },
  ];

  const achievements = [
    {
      year: "2023",
      title: "Top 10 Website Du Lịch",
      description: "Do Hiệp hội Du lịch Việt Nam bình chọn",
    },
    {
      year: "2022",
      title: "Thưởng Hiệu Truyền Cảm Hứng",
      description: "Giải thưởng Asia Pacific Enterprise Awards",
    },
    {
      year: "2021",
      title: "Dịch Vụ Khách Hàng Xuất Sắc",
      description: "Chứng nhận ISO Customer Service Institute",
    },
    {
      year: "2020",
      title: "Startup Công Nghệ Du Lịch",
      description: "Giải thưởng TechFest Vietnam",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Câu Chuyện Của Traveloka
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Hành trình mang những trải nghiệm du lịch tuyệt vời nhất đến với
              mọi người, mọi nhà, mọi thời điểm. Chúng tôi cam kết cung cấp dịch
              vụ và những kỷ niệm đáng nhớ đối với bạn và gia đình.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Sứ mệnh của chúng tôi</h2>
            <p className="text-gray-700 leading-relaxed">
              Tại Traveloka, chúng tôi hướng tới trở thành nền tảng đặt tour du
              lịch trực tuyến hàng đầu tại Việt Nam, nơi mọi khách hàng đều có
              thể tìm kiếm và đặt chuyến đi mơ ước một cách dễ dàng, nhanh
              chóng, với khu vực và người dẫn tân thiện. Chúng tôi mong muốn xây
              dựng một cộng đồng yêu du lịch, học hỏi và khám phá những nền văn
              hóa đa dạng trên khắp thế giới.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Tầm nhìn tương lai</h2>
            <p className="text-gray-700 leading-relaxed">
              Chúng tôi cam kết cung cấp dịch vụ chất lượng cao, an toàn và đáng
              tin cậy, đồng thời không ngừng đổi mới và cải tiến để mang lại
              những trải nghiệm du lịch tốt nhất. Đến năm 2030, Traveloka hướng
              đến mục tiêu phục vụ hơn 10 triệu khách hàng, mở rộng mạng lưới
              tour du lịch ra các quốc gia trong khu vực Đông Nam Á và châu Á.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Giá Trị Cốt Lõi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-4">
            Đội Ngũ Của Chúng Tôi
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Gặp gỡ những con người đầy nhiệt huyết đang sau thành công của
            Traveloka, luôn nỗ lực và cống hiến để mang đến những chuyến đi
            tuyệt vời nhất cho bạn.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-24 h-24 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {member.avatar}
                </div>
                <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                <p className="text-blue-600 text-sm mb-3">{member.position}</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Timeline */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-12">
            Thành Tựu & Giải Thưởng
          </h2>
          <div className="space-y-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {achievement.year}
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 flex-1 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-600">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Sẵn sàng cho chuyến đi tiếp theo?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Khám phá hàng ngàn tour du lịch hấp dẫn và đặt chuyến đi của bạn
            ngay hôm nay!
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/tours"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Xem Tours
            </a>
            <a
              href="/contact"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white/10 transition-colors font-medium"
            >
              Liên hệ với chúng tôi
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
