export default function ProfileDetails() {
  return (
    <div className="bg-white border shadow-sm rounded-xl p-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">Thông tin cá nhân</h3>
          <p className="text-gray-500 text-sm">
            Quản lý thông tin hồ sơ của bạn để có trải nghiệm tốt nhất.
          </p>
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
          Chỉnh sửa
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <p className="text-sm text-gray-500">Họ và Tên</p>
          <p className="font-medium mt-1">Nguyễn Văn A</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Ngày sinh</p>
          <p className="font-medium mt-1">01/01/1990</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium mt-1">nva@email.com</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Số điện thoại</p>
          <p className="font-medium mt-1">0909123456</p>
        </div>

        <div className="md:col-span-2">
          <p className="text-sm text-gray-500">Địa chỉ</p>
          <p className="font-medium mt-1">
            123 Đường ABC, Phường X, Quận Y, TP. Z
          </p>
        </div>
      </div>
    </div>
  );
}
