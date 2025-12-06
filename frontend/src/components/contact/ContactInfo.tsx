import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="bg-white border rounded-xl shadow-sm p-6">
      <h3 className="text-xl font-semibold mb-4">Thông tin liên hệ</h3>

      <div className="space-y-4 text-gray-700">
        {/* PHONE */}
        <p className="flex items-center gap-3">
          <Phone className="text-blue-600 w-5 h-5" />
          Hotline hỗ trợ: <strong>1900 1234</strong>
        </p>

        {/* EMAIL */}
        <p className="flex items-center gap-3">
          <Mail className="text-blue-600 w-5 h-5" />
          Email: <strong>hotro@GoTour.com</strong>
        </p>

        {/* ADDRESS */}
        <p className="flex items-center gap-3">
          <MapPin className="text-blue-600 w-5 h-5" />
          Địa chỉ văn phòng:
          <span>Tòa nhà Capital Place, 29 Liễu Giai, Ba Đình, Hà Nội</span>
        </p>

        {/* MAP / IMAGE */}
        <div className="w-full h-48 bg-gray-100 rounded-xl overflow-hidden border flex items-center justify-center">
          <img
            src="/icon/LienHe.jpg"
            alt="Location Map"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
