"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CreditCard, Wallet, Landmark, Lock } from "lucide-react";
import { authFetch } from "@/lib/api/authFetch";
import { formatPrice } from "@/lib/utils/formatPrice";
import { maskAccountNumber } from "@/lib/utils/maskAccount";
import { maskBalance } from "@/lib/utils/maskBalance";

type Account = {
  provider: string;
  accountNumber: string;
  balance: number;
};

export default function PaymentPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const router = useRouter();

  const [order, setOrder] = useState<any>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [method, setMethod] = useState<string>("");

  const METHOD_LABEL: Record<string, string> = {
    momo: "Ví MoMo",
    vnpay: "VNPay",
    "bank:vcb": "Vietcombank",
    "bank:tcb": "Techcombank",
    "bank:bidv": "BIDV",
  };

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    if (!orderId) return;

    const load = async () => {
      try {
        const [orderRes, accountsRes] = await Promise.all([
          authFetch(`/orders/code/${orderId}`),
          authFetch(`/payments/accounts`),
        ]);
        if (!orderRes.ok) throw new Error("Không tìm thấy đơn hàng");
        if (!accountsRes.ok)
          throw new Error("Không tải được tài khoản thanh toán");

        const orderData = await orderRes.json();
        const accountsData = await accountsRes.json();

        setOrder(orderData);
        setAccounts(accountsData);

        if (accountsData.length > 0) {
          setMethod(accountsData[0].provider);
        }
      } catch (err) {
        alert(err.message);
      }
    };

    load();
  }, [orderId]);

  /* ================= PAY ================= */
  const pay = async () => {
    const res = await authFetch(`/payments/mock-pay`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, provider: method }),
    });

    const data = await res.json();
    if (!res.ok) return alert(data.message);

    router.push(`/bookings/success?code=${data.orderCode}`);
  };

  if (!order) return <div className="py-20 text-center">Đang tải…</div>;

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      {/* ===== HEADER ===== */}
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <h1 className="text-3xl font-bold">Thanh Toán</h1>
        <p className="text-gray-500 mt-1">
          Vui lòng hoàn tất thông tin bên dưới để đặt tour của bạn.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 px-4">
        {/* ================= LEFT ================= */}
        <div className="lg:col-span-2 space-y-8">
          {/* ===== CONTACT ===== */}
          <Card title="Thông tin liên hệ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Họ và tên" value={order.user.fullName} />
              <Input label="Email" value={order.user.email} />
            </div>
          </Card>

          {/* ===== PAYMENT METHODS ===== */}
          <Card title="Phương thức thanh toán">
            <div className="space-y-4">
              {accounts.map((a) => (
                <PaymentOption
                  key={a.provider}
                  active={method === a.provider}
                  onClick={() => setMethod(a.provider)}
                  icon={
                    a.provider.startsWith("bank") ? <Landmark /> : <Wallet />
                  }
                  title={METHOD_LABEL[a.provider]}
                  subtitle={maskAccountNumber(a.accountNumber)}
                  right={maskBalance(a.balance) + " đ"}
                />
              ))}
            </div>
          </Card>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="bg-white rounded-2xl shadow-sm p-6 h-fit">
          <h3 className="font-semibold text-lg mb-4">Tóm tắt đơn hàng</h3>

          {order.items.map((i: any) => (
            <div key={i.tourId} className="flex justify-between mb-2">
              <span>
                {i.tourTitle} ({i.qty} khách)
              </span>
              <span>{formatPrice(i.finalPrice * i.qty)} đ</span>
            </div>
          ))}

          <div className="border-t my-4" />

          <div className="flex justify-between font-bold text-lg">
            <span>Tổng cộng</span>
            <span>{formatPrice(order.total)} đ</span>
          </div>

          <button
            onClick={pay}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            <Lock size={18} />
            Hoàn tất thanh toán
          </button>

          <p className="text-xs text-gray-500 mt-3 text-center">
            Giao dịch an toàn & bảo mật
          </p>
        </div>
      </div>
    </div>
  );
}

/* ================= UI COMPONENTS ================= */

function Card({ title, children }: any) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="font-semibold text-lg mb-4">{title}</h2>
      {children}
    </div>
  );
}

function Input({ label, value }: any) {
  return (
    <div>
      <label className="text-sm text-gray-500">{label}</label>
      <input
        value={value}
        disabled
        className="w-full mt-1 px-4 py-3 border rounded-xl bg-gray-50"
      />
    </div>
  );
}

function PaymentOption({ active, onClick, icon, title, subtitle, right }: any) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between border rounded-xl p-4 cursor-pointer transition
      ${active ? "border-blue-600 bg-blue-50" : "hover:shadow-sm"}`}
    >
      <div className="flex items-center gap-4">
        <input type="radio" checked={active} readOnly />
        <div className="text-blue-600">{icon}</div>
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>

      <div className="font-semibold text-green-600">{right}</div>
    </div>
  );
}
