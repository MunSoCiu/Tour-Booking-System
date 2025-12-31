import Image from "next/image";
import { Star } from "lucide-react";

interface Props {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  text: string;
  rating: number;
  tourName?: string;
}

export default function TestimonialCard({
  name,
  role,
  avatar = "/images/default-avatar.png",
  text,
  rating,
  tourName,
}: Props) {
  const safeRating = Math.max(0, Math.min(5, rating));

  return (
<<<<<<< HEAD
    <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col h-full">
      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: safeRating }).map((_, i) => (
          <Star key={i} className="text-yellow-400 fill-yellow-400 w-6 h-6" />
        ))}
      </div>

      {/* Text */}
      <p className="text-gray-700 italic text-base mb-6 line-clamp-3 flex-grow">
=======
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col h-full">
      {/* Rating */}
      <div className="flex gap-1 mb-3">
        {Array.from({ length: safeRating }).map((_, i) => (
          <Star key={i} className="text-yellow-400 fill-yellow-400 w-5 h-5" />
        ))}
      </div>

      {/* Text (3-line clamp) */}
      <p className="text-gray-700 italic mb-4 line-clamp-3 flex-grow">
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
        "{text}"
      </p>

      {/* User info */}
<<<<<<< HEAD
      <div className="flex items-center gap-4 mt-auto">
        <Image
          src={avatar}
          alt={name}
          width={56}
          height={56}
=======
      <div className="flex items-center gap-3 mt-auto">
        <Image
          src={avatar}
          alt={name}
          width={48}
          height={48}
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
          className="rounded-full object-cover"
        />

        <div>
<<<<<<< HEAD
          <h4 className="font-bold">{name}</h4>
=======
          <h4 className="font-semibold leading-tight">{name}</h4>
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
          <p className="text-sm text-gray-500">{role}</p>
          {tourName && (
            <p className="text-xs text-gray-400 mt-1 italic">• {tourName}</p>
          )}
        </div>
      </div>
    </div>
  );
}
