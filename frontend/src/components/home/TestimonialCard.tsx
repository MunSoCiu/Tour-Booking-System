import Image from "next/image";
import { Star } from "lucide-react";

interface Props {
  id: string;
  name: string;
  role: string;
  avatar: string;
  text: string;
  rating: number;
  date: string;
  tourName: string;
}

export default function TestimonialCard({
  id,
  name,
  role,
  avatar,
  text,
  rating,
  date,
  tourName,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6">
      <div className="flex gap-1 mb-3">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="text-yellow-400 fill-yellow-400 w-5 h-5" />
        ))}
      </div>

      <p className="text-gray-700 italic mb-4">"{text}"</p>

      <div className="flex items-center gap-3">
        <Image
          src={avatar}
          alt={name}
          width={48}
          height={48}
          className="rounded-full object-cover"
        />

        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  );
}
