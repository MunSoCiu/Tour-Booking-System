"use client";

export default function ContactInfo({
  name,
  email,
  phone,
  onChange,
}: {
  name: string;
  email: string;
  phone: string;
  onChange: (field: string, value: string) => void;
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <h2 className="text-lg font-semibold mb-4">Thông tin liên hệ</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label className="text-sm font-medium text-gray-700">Họ và tên</label>
          <input
            value={name}
            onChange={(e) => onChange("name", e.target.value)}
            className="w-full mt-1 border rounded-lg px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            value={email}
            onChange={(e) => onChange("email", e.target.value)}
            className="w-full mt-1 border rounded-lg px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Số điện thoại
          </label>
          <input
            value={phone}
            onChange={(e) => onChange("phone", e.target.value)}
            className="w-full mt-1 border rounded-lg px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
