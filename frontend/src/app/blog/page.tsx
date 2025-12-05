"use client";

import BlogSearch from "@/components/blog/BlogSearch";
import BlogCategoryFilter from "@/components/blog/BlogCategoryFilter";
import BlogLatestList from "@/components/blog/BlogLatestList";
import BlogPopular from "@/components/blog/BlogPopular";

export default function BlogPage() {
  return (
    <div className="bg-white min-h-screen pb-20">
      {/* HEADER */}
      <div className="text-center mt-10 px-4">
        <h1 className="text-4xl font-bold">Blog Du Lịch</h1>
        <p className="text-gray-600 mt-2">
          Khám phá kinh nghiệm, điểm đến và câu chuyện truyền cảm hứng từ khắp
          mọi miền.
        </p>
      </div>

      {/* SEARCH */}
      <div className="max-w-2xl mx-auto mt-8 px-4">
        <BlogSearch />
      </div>

      {/* CATEGORY FILTER */}
      <div className="max-w-4xl mx-auto mt-6 px-4">
        <BlogCategoryFilter />
      </div>

      {/* MAIN GRID */}
      <div className="max-w-7xl mx-auto mt-10 px-4 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT – LATEST POSTS */}
        <div className="lg:col-span-2">
          <BlogLatestList />

          {/* LOAD MORE */}
          <div className="flex justify-center mt-10">
            <button className="px-6 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700">
              Xem thêm bài viết
            </button>
          </div>
        </div>

        {/* RIGHT – POPULAR POSTS */}
        <BlogPopular />
      </div>
    </div>
  );
}
