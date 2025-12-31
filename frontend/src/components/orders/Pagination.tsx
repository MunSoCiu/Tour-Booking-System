<<<<<<< HEAD
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
=======
export default function Pagination() {
  return (
    <div className="flex gap-2">
      <button className="px-3 py-1 bg-blue-600 text-white rounded-lg">1</button>
      <button className="px-3 py-1 bg-white border rounded-lg">2</button>
      <button className="px-3 py-1 bg-white border rounded-lg">3</button>
      <button className="px-3 py-1 bg-white border rounded-lg">…</button>
      <button className="px-3 py-1 bg-white border rounded-lg">10</button>
      <button className="px-3 py-1 bg-white border rounded-lg">{`>`}</button>
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
    </div>
  );
}
