import Image from "next/image";

interface Props {
  title: string;
  image: string;
  key: string;
}

export default function DestinationCard({ title, image }: Props) {
  return (
    <div className="rounded-xl overflow-hidden shadow-md bg-white hover:shadow-lg transition cursor-pointer">
      <div className="relative h-52 w-full">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      <div className="p-4">
        <h3 className="font-semibold">{title}</h3>
      </div>
    </div>
  );
}
