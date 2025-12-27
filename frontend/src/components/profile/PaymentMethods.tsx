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

export default function PaymentMethods() {
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMethods();
  }, []);

  async function loadMethods() {
    try {
      const res = await api.get("/payments/methods");
      setMethods(res.data.filter((m: PaymentMethod) => m.enabled));
    } catch (err) {
      console.error("Load payment methods failed", err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="bg-white border rounded-xl p-6 text-gray-500">
        Đang tải phương thức thanh toán...
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-2">
        Phương thức thanh toán của bạn
      </h3>
      <p className="text-gray-500 mb-6">
        Chọn phương thức thanh toán bạn muốn sử dụng
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {methods.map((m) => (
          <PaymentCard key={m.key} method={m} />
        ))}
      </div>
    </div>
  );
}

function PaymentCard({ method }: { method: PaymentMethod }) {
  return (
    <div className="border rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition cursor-pointer">
      <Image src={method.logo} alt={method.name} width={50} height={50} />
      <div>
        <p className="font-semibold">{method.name}</p>
        <p className="text-sm text-gray-500">{method.desc}</p>
      </div>
    </div>
  );
}
