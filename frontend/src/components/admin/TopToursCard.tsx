export default function TopToursCard() {
  const tours = [
    { name: "Vịnh Hạ Long", count: 320 },
    { name: "Đà Nẵng – Hội An", count: 298 },
    { name: "Phú Quốc", count: 215 },
    { name: "Sapa", count: 180 },
    { name: "Miền Tây", count: 152 },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <h3 className="font-semibold mb-4">Top Tour phổ biến</h3>

      <div className="space-y-4">
        {tours.map((tour, i) => (
          <div key={i}>
            <p className="font-medium">
              {i + 1}. {tour.name}
            </p>
            <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${(tour.count / 350) * 100}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-1">{tour.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
