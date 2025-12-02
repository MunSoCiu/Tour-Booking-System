import Image from "next/image";
import { formatPrice } from "@/lib/utils/formatPrice";

export default function DealCard({
  imgSrc,
  badge,
  title,
  oldPrice,
  price,
}: {
  imgSrc: string;
  badge?: string;
  title: string;
  oldPrice?: number;
  price: number;
}) {
  return (
    <article className="rounded-xl overflow-hidden shadow-md bg-white">
      <div className="relative h-44 w-full">
        <Image src={imgSrc} alt={title} fill className="object-cover" />
        {badge && (
          <span className="absolute left-3 top-3 bg-yellow-400 text-xs px-2 py-1 rounded">
            {badge}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold mb-2">{title}</h3>
        {oldPrice && (
          <div className="text-sm line-through text-slate-400">
            {formatPrice(oldPrice)}
          </div>
        )}
        <div className="text-blue-600 font-bold text-lg mt-1">
          {formatPrice(price)}
        </div>
        <div className="mt-4">
          <button className="px-4 py-2 border rounded-md text-sm">
            Xem Chi Tiết
          </button>
        </div>
      </div>
    </article>
  );
}
