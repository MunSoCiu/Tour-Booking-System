import Image from "next/image";

interface Props {
  title: string;
  image: string;
  key: string;
}

export default function DestinationCard({ title, image }: Props) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition cursor-pointer">
      <div className="relative h-72 w-full">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      <div className="p-6">
        <h3 className="font-bold text-lg">{title}</h3>
      </div>
    </div>
  );
}
