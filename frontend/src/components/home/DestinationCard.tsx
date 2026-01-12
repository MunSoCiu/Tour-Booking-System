import Image from "next/image";
import { resolveImage } from "@/lib/utils/resolveImage";

interface Props {
  title: string;
  image: string;
  key: string;
}

export default function DestinationCard({ title, image }: Props) {
  const isLocal = process.env.NODE_ENV === "development";
  return (
    <div className="rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition cursor-pointer">
      <div className="relative h-72 w-full">
        <Image
          src={resolveImage(image) || "/images/default-tour.jpg"}
          alt={title}
          fill
          className="object-cover"
          unoptimized={isLocal}
        />
      </div>

      <div className="p-6">
        <h3 className="font-bold text-lg">{title}</h3>
      </div>
    </div>
  );
}
