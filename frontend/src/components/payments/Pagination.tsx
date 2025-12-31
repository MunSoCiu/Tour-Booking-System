<<<<<<< HEAD
"use client";

export default function Pagination({
  page,
  total,
  limit,
  onChange,
}: {
  page: number;
  total: number;
  limit: number;
  onChange: (page: number) => void;
}) {
  const totalPages = Math.ceil(total / limit);

  if (totalPages <= 1) return null;

  return (
    <div className="flex gap-2">
      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="px-3 py-1 border rounded disabled:opacity-40"
      >
        ←
      </button>

      {Array.from({ length: totalPages }).map((_, i) => {
        const p = i + 1;
        return (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`px-3 py-1 border rounded ${
              p === page ? "bg-blue-600 text-white border-blue-600" : ""
            }`}
          >
            {p}
          </button>
        );
      })}

      <button
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="px-3 py-1 border rounded disabled:opacity-40"
      >
        →
=======
export default function Pagination() {
  return (
    <div className="flex items-center gap-2">
      <button className="px-4 py-2 border rounded-lg bg-white hover:bg-gray-100">
        Trước
      </button>

      <button className="px-3 py-2 bg-blue-600 text-white rounded-lg">1</button>

      <button className="px-3 py-2 bg-white border rounded-lg hover:bg-gray-100">
        2
      </button>

      <button className="px-4 py-2 border rounded-lg bg-white hover:bg-gray-100">
        Sau
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
      </button>
    </div>
  );
}
