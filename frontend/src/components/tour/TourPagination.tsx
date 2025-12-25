"use client";

export default function TourPagination({
  page,
  total,
  limit,
  setPage,
}: {
  page: number;
  total: number;
  limit: number;
  setPage: (p: number) => void;
}) {
  const totalPages = Math.max(1, Math.ceil((total || 0) / limit));

  const goToPage = (p: number) => {
    if (p >= 1 && p <= totalPages) {
      setPage(p);
      window.scrollTo({ top: 0, behavior: "smooth" }); // auto scroll lên đầu
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 mt-10">
      {/* PAGINATION BUTTONS */}
      <div className="flex items-center gap-2">
        {/* PREVIOUS */}
        <button
          onClick={() => goToPage(page - 1)}
          disabled={page === 1}
          className={`px-4 py-2 rounded-lg border transition ${
            page === 1
              ? "text-gray-400 border-gray-200 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
        >
          Trang trước
        </button>

        {/* PAGE NUMBER */}
        <span className="font-semibold text-gray-700">
          {page} / {totalPages}
        </span>

        {/* NEXT */}
        <button
          onClick={() => goToPage(page + 1)}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded-lg border transition ${
            page === totalPages
              ? "text-gray-400 border-gray-200 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
        >
          Trang sau
        </button>
      </div>

      {/* TOTAL INFO */}
      <p className="text-sm text-gray-500">
        Tổng số tour:{" "}
        <span className="font-semibold text-blue-600">{total || 0}</span>
      </p>
    </div>
  );
}
