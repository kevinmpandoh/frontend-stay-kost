"use client";

import Image from "next/image";
import {
  Heart,
  ChevronLeft,
  ChevronRight,
  // Wifi,
  // Utensils,
  // ParkingCircle,
  // LucideIcon,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useWishlist } from "@/hooks/useWishlist";
import { DEFAULT_FACILITY_ICON, FACILITY_ICONS } from "@/constants/facilities";
import { useAuthStore } from "@/stores/auth.store";

interface KostCardProps {
  id: string;
  title: string;
  location: string;
  type: string;
  price: number;
  images: string[];
  facilities: string[];
  claasName?: string;
}

const KostCard = ({
  id,
  title,
  location,
  type,
  price,
  images,
  facilities,
  claasName,
}: KostCardProps) => {
  const [currentImage, setCurrentImage] = useState(0);
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { user } = useAuthStore();

  const isWishlisted = wishlist?.data.some(
    (item: any) => item.kostType_id === id
  );

  const handleNext = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentImage(index);
  };

  const toggleWishlist = async () => {
    if (isWishlisted) {
      removeFromWishlist(id);
    } else {
      addToWishlist(id);
    }
  };

  return (
    <div
      className={`bg-white shadow-md rounded-lg overflow-hidden  relative  border max-w-sm lg:max-w-[260px] group  ${claasName}`}
    >
      <div className="relative w-full h-48 overflow-hidden">
        {/* Image Slider */}
        <div
          className="w-full h-full flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentImage * 100}%)` }}
        >
          {images.map((img, i) => (
            <Image
              key={i}
              src={img || "/kost-image-default.png"}
              alt={`kost image ${i}`}
              width={400}
              height={200}
              unoptimized
              className="w-full h-48 object-cover shrink-0 grow-0"
            />
          ))}
        </div>

        {user?.role === "tenant" && (
          <div
            onClick={(e) => {
              e.preventDefault(); // Biar ga ikut klik ke Link
              toggleWishlist();
            }}
            className="absolute top-2 right-2 bg-white/80 rounded-full p-1 hover:bg-white"
          >
            <Heart
              className={`w-5 h-5 cursor-pointer ${
                isWishlisted ? "text-red-500 fill-red-500" : "text-gray-600"
              }`}
            />
          </div>
        )}

        {/* Navigasi gambar */}
        {images.length > 1 && (
          <>
            <div
              onClick={handlePrev}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/70 hover:bg-white p-1 rounded-full cursor-pointer hidden group-hover:block"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </div>
            <div
              onClick={handleNext}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/70 hover:bg-white p-1 rounded-full cursor-pointer hidden group-hover:block"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </div>
          </>
        )}

        {/* Indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goToImage(i)}
              className={`w-1.5 h-1.5 rounded-full cursor-pointer ${
                currentImage === i ? "bg-white" : "bg-white/50"
              } hover:bg-white transition-colors duration-200`}
            />
          ))}
        </div>
      </div>

      {/* Info Kost */}
      <Link href={`/kosts/${id}`}>
        <div className="p-4 min-h-[230px]  flex flex-col justify-between ">
          <div>
            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded mb-2">
              {type}
            </span>
            <h2 className="text-md font-semibold mb-1 line-clamp-2">{title}</h2>
            <p className="text-gray-600 text-sm mb-2">{location}</p>

            <div className="flex flex-wrap text-gray-600 text-sm mb-2 gap-x-2">
              {facilities.map((key, index) => {
                const facility = FACILITY_ICONS[key];
                const Icon = facility?.icon || DEFAULT_FACILITY_ICON;
                const label = facility?.label || key;
                return (
                  <div key={index} className="flex items-center gap-1 mb-1">
                    <Icon className="w-4 h-4" /> {label}
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <p className="text-gray-600 text-sm mb-1">Harga</p>
            <p className="text-md font-semibold">
              Rp {price.toLocaleString()}{" "}
              <span className="text-sm font-normal">/bulan</span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default KostCard;
