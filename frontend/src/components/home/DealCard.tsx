import Image from "next/image";
import Link from "next/link";

export default function DealCard({
  tag,
  title,
  oldPrice,
  price,
  desc,
  image,
}: {
  tag: string;
  title: string;
  oldPrice?: string;
  price: string;
  desc: string;
  image: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      <div className="relative h-52">
        <Image src={image} alt={title} fill className="object-cover" />
        <span className="absolute top-3 left-3 bg-yellow-400 px-3 py-1 rounded-lg text-sm font-bold">
          {tag}
        </span>
      </div>

      <div className="p-4 space-y-2">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{desc}</p>

        <div className="mt-3">
          {oldPrice && (
            <p className="text-gray-400 line-through text-sm">{oldPrice}</p>
          )}
          <p className="text-blue-600 text-lg font-bold">{price}</p>
        </div>

        <Link
          href="#"
          className="mt-3 inline-block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Xem Chi Tiết
        </Link>
      </div>
    </div>
  );
}
