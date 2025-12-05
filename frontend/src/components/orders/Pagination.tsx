export default function Pagination() {
  return (
    <div className="flex gap-2">
      <button className="px-3 py-1 bg-blue-600 text-white rounded-lg">1</button>
      <button className="px-3 py-1 bg-white border rounded-lg">2</button>
      <button className="px-3 py-1 bg-white border rounded-lg">3</button>
      <button className="px-3 py-1 bg-white border rounded-lg">…</button>
      <button className="px-3 py-1 bg-white border rounded-lg">10</button>
      <button className="px-3 py-1 bg-white border rounded-lg">{`>`}</button>
    </div>
  );
}
