import { Star } from "lucide-react";

interface TestimonialCardProps {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  text: string;
  date?: string;
  tourName?: string;
}

export default function TestimonialCard({
  id,
  name,
  avatar,
  rating,
  text,
  date,
  tourName,
}: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        {/* Avatar */}
        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
          )}
        </div>

        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{name}</h4>
          {tourName && <p className="text-sm text-gray-600">{tourName}</p>}
          {date && <p className="text-xs text-gray-500">{date}</p>}
        </div>

        {/* Rating */}
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Review Text */}
      <p className="text-gray-700 italic leading-relaxed">"{text}"</p>
    </div>
  );
}
