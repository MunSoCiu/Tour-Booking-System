"use client";

import PolicySidebar from "@/components/policy/PolicySidebar";

export default function SecurityPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* MAIN CONTENT WRAPPER */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* SIDEBAR */}
        <PolicySidebar />

        {/* POLICY CONTENT */}
        <div className="md:col-span-3">
          <h1 className="text-3xl font-bold">Chính Sách Bảo Mật</h1>
          <p className="text-gray-500 mt-1">
            Cập nhật lần cuối: 24 tháng 10, 2023
          </p>

          {/* MAIN TEXT BLOCK */}
          <div className="mt-8 space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold mb-3">Giới thiệu chung</h2>
              <p>
                Tại Traveloka, việc bảo vệ dữ liệu cá nhân của bạn là ưu tiên
                hàng đầu của chúng tôi. Chính sách này giải thích cách chúng tôi
                thu thập, sử dụng và bảo vệ thông tin của bạn...
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                Thông tin chúng tôi thu thập
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Thông tin định danh cá nhân:</strong> Tên đầy đủ,
                  email, số điện thoại, ngày sinh...
                </li>
                <li>
                  <strong>Thông tin thanh toán:</strong> Thông tin thẻ tín
                  dụng/ghi nợ...
                </li>
                <li>
                  <strong>Dữ liệu kỹ thuật và duyệt web:</strong> Địa chỉ IP,
                  loại trình duyệt...
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                Mục đích thu thập và sử dụng thông tin
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Xử lý việc đặt tour, vé máy bay...</li>
                <li>Cung cấp hỗ trợ khách hàng...</li>
                <li>Phân tích và cải thiện chất lượng dịch vụ...</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                Phạm vi chia sẻ thông tin
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Đối tác cung cấp dịch vụ:</strong> hàng không, khách
                  sạn…
                </li>
                <li>
                  <strong>Nhà cung cấp cổng thanh toán:</strong> xử lý giao dịch
                  an toàn.
                </li>
                <li>
                  <strong>Cơ quan pháp luật:</strong> khi có yêu cầu hợp pháp.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                Thời gian lưu trữ dữ liệu
              </h2>
              <p>
                Dữ liệu cá nhân được lưu trữ trong suốt thời gian bạn còn sử
                dụng dịch vụ...
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                Quyền của người dùng
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Quyền truy cập và xem lại thông tin của mình.</li>
                <li>Quyền yêu cầu chỉnh sửa dữ liệu không chính xác.</li>
                <li>Quyền yêu cầu xóa dữ liệu.</li>
                <li>Quyền phản đối việc sử dụng dữ liệu cho marketing.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Bảo mật dữ liệu</h2>
              <p>
                Chúng tôi áp dụng các biện pháp kỹ thuật tiên tiến để bảo vệ dữ
                liệu khỏi truy cập trái phép...
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                Thay đổi chính sách
              </h2>
              <p>Chính sách này có thể thay đổi theo thời gian...</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Thông tin liên hệ</h2>

              <div className="bg-gray-100 p-5 rounded-xl">
                <p>Nếu bạn có câu hỏi, vui lòng liên hệ:</p>
                <p className="mt-2">
                  <strong>Email:</strong> privacy@traveloka.com
                </p>
                <p>
                  <strong>Số điện thoại:</strong> 1900 1234
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="border-t mt-16 py-10 text-center text-gray-600 text-sm">
        <div className="flex justify-center gap-6 mb-4">
          <a href="#">Về chúng tôi</a>
          <a href="#">Điều khoản dịch vụ</a>
          <a href="#">Chính sách bảo mật</a>
          <a href="#">Liên hệ</a>
        </div>
        <p>© 2023 Traveloka. Mọi quyền được bảo lưu.</p>
      </footer>
    </div>
  );
}
