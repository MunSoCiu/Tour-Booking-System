export default function Pagination() {
  return (
    <div className="flex gap-2">
      <button className="border px-3 py-2 rounded-lg">1</button>
      <button className="border px-3 py-2 rounded-lg bg-gray-100">2</button>
      <button className="border px-3 py-2 rounded-lg">3</button>
      <button className="border px-3 py-2 rounded-lg">…</button>
      <button className="border px-3 py-2 rounded-lg">8</button>
    </div>
  );
}
