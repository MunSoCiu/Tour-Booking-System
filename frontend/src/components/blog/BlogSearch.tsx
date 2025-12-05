import { Search } from "lucide-react";

export default function BlogSearch() {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        placeholder="Tìm kiếm bài viết..."
        className="w-full border rounded-full py-3 pl-12 pr-4 outline-none focus:border-blue-500"
      />
    </div>
  );
}
