"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Wallet, Building2, Lock } from "lucide-react";
import { formatPrice } from "@/lib/utils/format";

export default function CheckoutPage() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [loading, setLoading] = useState(false);

  const bookingData = {
    tourTitle: "Tour Châu Âu: Pháp - Thụy Sĩ - Ý",
    date: "15/09/2024",
    guests: 2,
    children: 1,
    price: 51980000,
    serviceFee: 500000,
    total: 52480000,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Generate booking ID
      const bookingId = "#A8B2C5";
      localStorage.setItem("lastBookingId", bookingId);

      router.push("/bookings/success");
    } catch (error) {
      alert("Thanh toán thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Thanh Toán</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Thông tin liên hệ</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    placeholder="Nguyễn Văn A"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    placeholder="09xxxxxxxx"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">
                Phương thức thanh toán
              </h2>

              <div className="space-y-3 mb-6">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("credit_card")}
                  className={`w-full flex items-center gap-3 p-4 border-2 rounded-lg transition-colors ${
                    paymentMethod === "credit_card"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === "credit_card"
                        ? "border-blue-500"
                        : "border-gray-300"
                    }`}
                  >
                    {paymentMethod === "credit_card" && (
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                    )}
                  </div>
                  <CreditCard className="w-6 h-6 text-gray-600" />
                  <span className="font-medium">Thẻ tín dụng / Ghi nợ</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("wallet")}
                  className={`w-full flex items-center gap-3 p-4 border-2 rounded-lg transition-colors ${
                    paymentMethod === "wallet"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === "wallet"
                        ? "border-blue-500"
                        : "border-gray-300"
                    }`}
                  >
                    {paymentMethod === "wallet" && (
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                    )}
                  </div>
                  <Wallet className="w-6 h-6 text-gray-600" />
                  <span className="font-medium">Ví điện tử</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("bank_transfer")}
                  className={`w-full flex items-center gap-3 p-4 border-2 rounded-lg transition-colors ${
                    paymentMethod === "bank_transfer"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === "bank_transfer"
                        ? "border-blue-500"
                        : "border-gray-300"
                    }`}
                  >
                    {paymentMethod === "bank_transfer" && (
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                    )}
                  </div>
                  <Building2 className="w-6 h-6 text-gray-600" />
                  <span className="font-medium">Chuyển khoản ngân hàng</span>
                </button>
              </div>

              {/* Card Details */}
              {paymentMethod === "credit_card" && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Số thẻ
                    </label>
                    <input
                      type="text"
                      placeholder="•••• •••• •••• ••••"
                      value={formData.cardNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, cardNumber: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ngày hết hạn
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            expiryDate: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVC
                      </label>
                      <input
                        type="text"
                        placeholder="•••"
                        value={formData.cvv}
                        onChange={(e) =>
                          setFormData({ ...formData, cvv: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* Security Notice */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
              <Lock className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-green-800">
                <p className="font-medium mb-1">Giao dịch an toàn và bảo mật</p>
                <p>
                  Thông tin thanh toán của bạn được mã hóa và bảo vệ bởi tiêu
                  chuẩn PCI DSS, tuân thủ tiêu chuẩn bảo mật quốc tế.
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="text-xl font-semibold mb-6">Chi tiết đặt tour</h2>

              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="font-medium mb-1">Tên tour</h3>
                  <p className="text-gray-600">{bookingData.tourTitle}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Ngày đi</h3>
                  <p className="text-gray-600">{bookingData.date}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Số lượng khách</h3>
                  <p className="text-gray-600">
                    {bookingData.guests} người lớn, {bookingData.children} trẻ
                    em
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Giá tour</span>
                  <span className="font-semibold">
                    {formatPrice(bookingData.price)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phí dịch vụ</span>
                  <span className="font-semibold">
                    {formatPrice(bookingData.serviceFee)}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">Tổng cộng</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {formatPrice(bookingData.total)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Đang xử lý..." : "Hoàn tất thanh toán"}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Bằng việc nhấn "Hoàn tất thanh toán", bạn đồng ý với{" "}
                <a href="/terms" className="text-blue-600 hover:underline">
                  Điều khoản dịch vụ
                </a>{" "}
                của chúng tôi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
