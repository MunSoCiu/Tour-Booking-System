"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import api from "@/lib/api/client";

type PaymentMethod = {
  key: string;
  name: string;
  desc: string;
  logo: string;
  enabled: boolean;
};

type PaymentAccount = {
  provider: string;
  accountNumber: string;
  balance: number;
  isActive: boolean;
};

export default function PaymentMethods({
  onSelect,
  selected,
}: {
  selected?: string;
  onSelect?: (method: string) => void;
}) {
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [accounts, setAccounts] = useState<PaymentAccount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [methodsRes, accountsRes] = await Promise.all([
        api.get("/payments/methods"),
        api.get("/payments/accounts"),
      ]);

      setMethods(methodsRes.data.filter((m: PaymentMethod) => m.enabled));
      setAccounts(accountsRes.data.filter((a: PaymentAccount) => a.isActive));
    } catch (err) {
      console.error("Load payment data failed", err);
    } finally {
      setLoading(false);
    }
  }

  /** JOIN method + account */
  const availableMethods = accounts
    .map((a) => ({
      key: a.provider,
      name: METHOD_LABELS[a.provider]?.name || a.provider,
      logo: METHOD_LOGO[a.provider]?.logo || "",
      balance: Number(a.balance),
      desc: METHOD_LABELS[a.provider]?.desc || "",
      enabled: true,
    }))
    .map((m) => {
      const account = accounts.find((a) => a.provider === m.key);
      if (!account) return null;

      return {
        ...m,
        accountNumber: account.accountNumber,
        balance: account.balance,
      };
    })
    .filter(Boolean) as (PaymentMethod & {
    accountNumber: string;
    balance: number;
  })[];

  if (loading) {
    return (
      <div className="bg-white border rounded-xl p-6 text-gray-500">
        Đang tải phương thức thanh toán...
      </div>
    );
  }

  if (availableMethods.length === 0) {
    return (
      <div className="bg-white border rounded-xl p-6 text-gray-500">
        Bạn chưa có tài khoản thanh toán nào
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-2">
        Phương thức thanh toán của bạn
      </h3>
      <p className="text-gray-500 mb-6">Chọn phương thức bạn muốn sử dụng</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {availableMethods.map((m) => (
          <PaymentCard
            key={m.key}
            method={m}
            active={selected === m.key}
            onClick={() => onSelect?.(m.key)}
          />
        ))}
      </div>
    </div>
  );
}

function PaymentCard({
  method,
  active,
  onClick,
}: {
  method: PaymentMethod & {
    accountNumber: string;
    balance: number;
  };
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`border rounded-xl p-4 flex items-center gap-4 cursor-pointer transition
      ${active ? "border-blue-600 bg-blue-50 shadow" : "hover:shadow-md"}`}
    >
      <Image src={method.logo} alt={method.name} width={48} height={48} />

      <div className="flex-1">
        <p className="font-semibold">{method.name}</p>
        <p className="text-sm text-gray-500">{method.desc}</p>

        <p className="text-sm text-gray-600 mt-1">
          Số tài khoản:{" "}
          <span className="font-medium">{method.accountNumber}</span>
        </p>

        <p className="text-sm text-green-600">
          Số dư: {Number(method.balance).toLocaleString("vi-VN")} đ
        </p>
      </div>
    </div>
  );
}
