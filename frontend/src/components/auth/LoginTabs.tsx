"use client";

export default function LoginTabs({
  tab,
  setTab,
}: {
  tab: "login" | "register";
  setTab: (tab: "login" | "register") => void;
}) {
  return (
    <div className="flex border-b">
      <button
        className={`flex-1 py-3 text-center font-medium ${
          tab === "login"
            ? "text-blue-600 border-b-2 border-blue-600"
            : "text-gray-500"
        }`}
        onClick={() => setTab("login")}
      >
        Đăng nhập
      </button>

      <button
        className={`flex-1 py-3 text-center font-medium ${
          tab === "register"
            ? "text-blue-600 border-b-2 border-blue-600"
            : "text-gray-500"
        }`}
        onClick={() => setTab("register")}
      >
        Đăng ký
      </button>
    </div>
  );
}
