import Image from "next/image";

export default function DestinationCard({
  title,
  image,
}: {
  title: string;
  image: string;
}) {
  return (
    <div className="rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer bg-white">
      <div className="h-56 w-full relative">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="p-3 font-medium">{title}</div>
    </div>
  );
}
