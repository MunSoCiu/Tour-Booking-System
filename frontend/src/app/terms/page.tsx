export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* HEADER TEXT */}
      <div className="text-center mt-12 px-4">
        <h1 className="text-4xl font-bold">Điều Khoản & Điều Kiện</h1>
        <p className="text-gray-600 mt-2">
          Vui lòng đọc kỹ các điều khoản và điều kiện này trước khi sử dụng dịch
          vụ của chúng tôi. Cập nhật lần cuối: <strong>15/07/2024</strong>.
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-4xl mx-auto px-6 mt-12 pb-20 leading-relaxed text-gray-700 text-[15px] space-y-6">
        <section>
          <h2 className="font-semibold">1. Định nghĩa thuật ngữ</h2>
          <p className="mt-2">
            “Công ty”, “Chúng tôi”, “Traveloka” là Công ty TNHH Du lịch
            Traveloka. “Người dùng”, “Bạn” là bất kỳ cá nhân hoặc tổ chức nào
            truy cập và sử dụng Dịch vụ của chúng tôi. “Dịch vụ” bao gồm
            website, ứng dụng di động và các nền tảng khác do Traveloka cung cấp
            để đặt tour du lịch.
          </p>
        </section>

        <section>
          <h2 className="font-semibold">2. Đăng ký và Quản lý tài khoản</h2>
          <p className="mt-2">
            Bạn phải cung cấp thông tin chính xác, đầy đủ và cập nhật khi đăng
            ký tài khoản. Bạn có trách nhiệm bảo mật mật khẩu và hoạt động tài
            khoản của mình. Mọi hoạt động diễn ra dưới tên tài khoản của bạn sẽ
            được coi là do bạn thực hiện.
          </p>
        </section>

        <section>
          <h2 className="font-semibold">3. Chính sách đặt và hủy tour</h2>

          <h3 className="font-medium mt-3">3.1. Đặt tour</h3>
          <p className="mt-1">
            Việc đặt tour của bạn được xem là thành công khi bạn hoàn tất thanh
            toán và nhận được email xác nhận từ Traveloka. Thông tin chi tiết về
            tour sẽ được gửi kèm trong email xác nhận.
          </p>

          <h3 className="font-medium mt-4">3.2. Hủy tour</h3>
          <p className="mt-1">
            Chính sách hủy tour có thể khác nhau tùy thuộc vào từng tour cụ thể
            và được quy định rõ trong phần chi tiết của mỗi tour. Vui lòng đọc
            kỹ các điều kiện hủy trước khi đặt.
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Hủy trước 30 ngày so với ngày khởi hành: Hoàn 100% chi phí.</li>
            <li>
              Hủy từ 15 đến 29 ngày so với ngày khởi hành: Hoàn 50% chi phí.
            </li>
            <li>
              Hủy trong vòng 14 ngày so với ngày khởi hành: Không hoàn phí.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold">4. Thanh toán</h2>
          <p className="mt-2">
            Chúng tôi chấp nhận nhiều hình thức thanh toán bao gồm thẻ tín
            dụng/ghi nợ, chuyển khoản ngân hàng, và ví điện tử. Mọi giao dịch
            đều được bảo mật. Giá tour được niêm yết bằng Việt Nam Đồng (VND) và
            đã bao gồm các loại thuế, phí theo quy định.
          </p>
        </section>

        <section>
          <h2 className="font-semibold">5. Giới hạn trách nhiệm</h2>
          <p className="mt-2">
            Traveloka cam kết cung cấp dịch vụ chất lượng. Tuy nhiên, chúng tôi
            không chịu trách nhiệm cho các sự kiện bất khả kháng như thiên tai,
            chiến tranh, dịch bệnh, hoặc các sự cố do bên thứ ba gây ra làm ảnh
            hưởng đến chuyến đi.
          </p>
        </section>

        <section>
          <h2 className="font-semibold">6. Quyền sở hữu trí tuệ</h2>
          <p className="mt-2">
            Toàn bộ nội dung, hình ảnh, thương hiệu và thiết kế trên website và
            ứng dụng Traveloka là tài sản của Công ty. Mọi hành vi sao chép, sử
            dụng hoặc phân phối mà không có sự cho phép bằng văn bản đều là vi
            phạm pháp luật.
          </p>
        </section>

        <section>
          <h2 className="font-semibold">
            7. Luật áp dụng và giải quyết tranh chấp
          </h2>
          <p className="mt-2">
            Các điều khoản này được điều chỉnh theo pháp luật Việt Nam. Mọi
            tranh chấp sẽ được ưu tiên giải quyết thông qua thương lượng; nếu
            không thành công, tranh chấp sẽ được đưa ra Tòa án có thẩm quyền tại
            Thành phố Hồ Chí Minh.
          </p>
        </section>
      </div>
    </div>
  );
}
