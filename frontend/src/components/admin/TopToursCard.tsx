"use client";

export default function TopToursCard({ tours }: { tours: any }) {
  // Fix lỗi: tours không phải array → ép về array rỗng
  const list = Array.isArray(tours) ? tours : [];

  const isLoading = !tours;

  if (isLoading) {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-bold mb-3">Top Selling Tours</h2>
        <SkeletonList />
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4">Top Selling Tours</h2>

      {list.length === 0 ? (
        <p className="text-gray-500 text-sm">Không có dữ liệu.</p>
      ) : (
        <ul className="space-y-2">
          {list.map((t: any, i: number) => (
            <li
              key={i}
              className="flex justify-between items-center border-b pb-2 text-gray-700"
            >
              <span className="truncate">
                {i + 1}. {t.title}
              </span>
              <span className="font-semibold text-blue-600">{t.sold}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function SkeletonList() {
  return (
    <ul className="space-y-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <li key={i} className="flex justify-between animate-pulse">
          <div className="h-3 w-2/3 bg-gray-200 rounded"></div>
          <div className="h-3 w-10 bg-gray-300 rounded"></div>
        </li>
      ))}
    </ul>
  );
}
