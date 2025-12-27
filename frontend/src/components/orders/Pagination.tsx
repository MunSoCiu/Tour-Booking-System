export default function Pagination({
  page,
  onChange,
}: {
  page: number;
  onChange: (p: number) => void;
}) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        className="px-3 py-1 border rounded-lg"
      >
        {"<"}
      </button>

      <span className="px-4 py-1 bg-blue-600 text-white rounded-lg">
        {page}
      </span>

      <button
        onClick={() => onChange(page + 1)}
        className="px-3 py-1 border rounded-lg"
      >
        {">"}
      </button>
    </div>
  );
}
