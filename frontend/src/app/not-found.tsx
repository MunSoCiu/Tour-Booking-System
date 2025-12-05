import Link from "next/link";
import { Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <Search className="w-14 h-14 text-gray-400" />

      <h1 className="text-3xl font-bold mt-4">Không tìm thấy trang</h1>
      <p className="text-gray-500 mt-2 max-w-md">
        Trang bạn đang tìm có thể đã bị xoá hoặc đường dẫn không chính xác.
      </p>

      <Link href="/" className="btn-primary mt-6 inline-block">
        Về trang chủ
      </Link>
    </div>
  );
}
