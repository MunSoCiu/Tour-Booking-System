export default function ContactInfo() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <h2 className="text-lg font-semibold mb-4">Thông tin liên hệ</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Họ và tên</label>
          <input
            defaultValue="Nguyễn Văn A"
            className="w-full mt-1 border rounded-lg px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            defaultValue="email@example.com"
            className="w-full mt-1 border rounded-lg px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Số điện thoại
          </label>
          <input
            defaultValue="09×××××××"
            className="w-full mt-1 border rounded-lg px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
