export default function Footer() {
  return (
    <footer className="bg-slate-50 mt-16 border-t">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-6 text-sm text-slate-600">
        <div>
          <h4 className="font-semibold mb-3">GoTours</h4>
          <p className="text-xs">
            Mang đến những chuyến đi tuyệt vời và những kỷ niệm khó phai.
          </p>
        </div>
        <div>
          <h5 className="font-semibold mb-3">Về chúng tôi</h5>
          <ul>
            <li>Câu chuyện</li>
            <li>Đội ngũ</li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold mb-3">Hỗ trợ</h5>
          <ul>
            <li>Câu hỏi thường gặp</li>
            <li>Chính sách</li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold mb-3">Nhận ưu đãi</h5>
          <input
            className="w-full p-2 rounded-md border"
            placeholder="Email của bạn"
          />
          <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md">
            Đăng ký
          </button>
        </div>
      </div>
      <div className="text-center text-xs text-slate-400 py-4">
        © 2024 GoTour. All rights reserved.
      </div>
    </footer>
  );
}
