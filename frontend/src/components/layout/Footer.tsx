import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-16 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
        <div>
          <h3 className="font-semibold mb-2">TravelBooking</h3>
          <p className="text-sm text-gray-600">
            Mang đến những chuyến đi tuyệt vời và nhiều kỷ niệm khó quên.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Về chúng tôi</h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>
              <Link href="/about">Câu chuyện</Link>
            </li>
            <li>
              <Link href="/careers">Tuyển dụng</Link>
            </li>
            <li>
              <Link href="/press">Báo chí</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Hỗ trợ</h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>
              <Link href="/support">Trung tâm trợ giúp</Link>
            </li>
            <li>
              <Link href="/security">Chính sách bảo mật</Link>
            </li>
            <li>
              <Link href="/terms">Điều khoản dịch vụ</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Nhận ưu đãi</h3>
          <div className="flex">
            <input
              type="email"
              placeholder="Email của bạn"
              className="px-3 py-2 border rounded-l-lg outline-none"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg">
              Đăng ký
            </button>
          </div>
        </div>
      </div>

      <p className="text-center text-sm text-gray-500 mt-6">
        © 2024 TravelBooking. All rights reserved.
      </p>
    </footer>
  );
}
