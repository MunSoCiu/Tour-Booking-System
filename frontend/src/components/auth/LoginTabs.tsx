"use client";

import Link from "next/link";

export default function LoginTabs({
  active,
}: {
  active: "login" | "register";
}) {
  return (
    <div className="flex border-b">
      <Link
        href="/login"
        className={`flex-1 py-3 text-center font-medium ${
          active === "login"
            ? "text-blue-600 border-b-2 border-blue-600"
            : "text-gray-500"
        }`}
      >
        Đăng nhập
      </Link>

      <Link
        href="/register"
        className={`flex-1 py-3 text-center font-medium ${
          active === "register"
            ? "text-blue-600 border-b-2 border-blue-600"
            : "text-gray-500"
        }`}
      >
        Đăng ký
      </Link>
    </div>
  );
}
