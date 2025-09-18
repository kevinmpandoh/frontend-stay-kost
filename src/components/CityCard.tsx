"use client";

import Image from "next/image";
import Link from "next/link";

interface CityCardProps {
  name: string;
  image: string;
  slug: string;
}

const CityCard = ({ name, image, slug }: CityCardProps) => {
  return (
    <Link
      href={`/kosts?search=${slug}`}
      className="group relative w-full h-56 md:h-64 rounded-2xl overflow-hidden shadow-lg"
    >
      <Image
        src={image}
        alt={`Kost di ${name}`}
        // layout="fill"
        // objectFit="cover"
        width={400}
        height={250}
        priority
        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />
      <div className="absolute bottom-6 left-6 z-10 text-white">
        <h3 className="text-xl md:text-2xl font-bold drop-shadow-md">{name}</h3>
      </div>
    </Link>
  );
};

export default CityCard;
