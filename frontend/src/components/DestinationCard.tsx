import Image from "next/image";

export default function DestinationCard({
  title,
  imgSrc,
}: {
  title: string;
  imgSrc: string;
}) {
  return (
    <div className="rounded-xl overflow-hidden shadow-md hover:scale-[1.01] transition-transform bg-white">
      <div className="relative h-44 w-full">
        <Image src={imgSrc} alt={title} fill className="object-cover" />
      </div>
      <div className="p-3">
        <div className="font-semibold">{title}</div>
      </div>
    </div>
  );
}
