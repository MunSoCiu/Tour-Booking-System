"use client";

import { CreditCard, Wallet, Landmark } from "lucide-react";

export default function PaymentMethod({
  value,
  onChange,
}: {
  value: string;
  onChange: (method: string) => void;
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <h2 className="text-lg font-semibold mb-4">Phương thức thanh toán</h2>

      <div className="space-y-4">
        {/* CARD PAYMENT OPTION */}
        <label className="block border rounded-xl p-4 cursor-pointer hover:bg-gray-50 transition">
          <div className="flex items-center gap-3">
            <input
              type="radio"
              checked={value === "card"}
              onChange={() => onChange("card")}
            />
            <span className="font-medium">Thẻ tín dụng / Ghi nợ</span>
            <CreditCard className="ml-auto text-gray-500" />
          </div>

          {value === "card" && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="text-sm text-gray-600">Số thẻ</label>
                <input
                  type="text"
                  placeholder="•••• •••• •••• ••••"
                  className="w-full mt-1 border rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Ngày hết hạn</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full mt-1 border rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">CVC</label>
                <input
                  type="password"
                  placeholder="•••"
                  className="w-full mt-1 border rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}
        </label>

        {/* E-WALLET */}
        <label className="block border rounded-xl p-4 cursor-pointer hover:bg-gray-50 transition">
          <div className="flex items-center gap-3">
            <input
              type="radio"
              checked={value === "wallet"}
              onChange={() => onChange("wallet")}
            />
            <span className="font-medium">Ví điện tử</span>
            <Wallet className="ml-auto text-gray-500" />
          </div>
        </label>

        {/* BANK TRANSFER */}
        <label className="block border rounded-xl p-4 cursor-pointer hover:bg-gray-50 transition">
          <div className="flex items-center gap-3">
            <input
              type="radio"
              checked={value === "bank"}
              onChange={() => onChange("bank")}
            />
            <span className="font-medium">Chuyển khoản ngân hàng</span>
            <Landmark className="ml-auto text-gray-500" />
          </div>
        </label>
      </div>
    </div>
  );
}
