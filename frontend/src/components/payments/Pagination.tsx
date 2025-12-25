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
      </button>
    </div>
  );
}
