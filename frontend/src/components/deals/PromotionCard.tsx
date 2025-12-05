import Image from "next/image";
import Link from "next/link";

export default function PromotionCard({
  tag,
  tagColor,
  title,
  desc,
  valid,
  oldPrice,
  price,
  image,
  action,
}: {
  tag: string;
  tagColor: string;
  title: string;
  desc: string;
  valid: string;
  oldPrice: string;
  price: string;
  image: string;
  action?: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      {/* IMAGE + TAG */}
      <div className="relative h-52">
        <Image src={image} alt={title} fill className="object-cover" />
        <span
          className={`${tagColor} absolute top-3 left-3 px-3 py-1 text-white rounded-lg text-sm font-semibold`}
        >
          {tag}
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-5 space-y-2">
        <h3 className="font-semibold text-lg">{title}</h3>

        <p className="text-gray-600 text-sm">{desc}</p>

        <p className="text-gray-500 text-sm mt-1">
          <span className="font-medium">Áp dụng:</span> {valid}
        </p>

        {/* PRICES */}
        <div>
          <p className="text-gray-400 line-through text-sm">{oldPrice}</p>
          <p className="text-blue-600 text-xl font-bold">{price}</p>
        </div>

        {/* BUTTON / ACTION */}
        <div className="pt-2">
          <Link
            href="#"
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              action
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {action || "Xem Chi Tiết"}
          </Link>
        </div>
      </div>
    </div>
  );
}
