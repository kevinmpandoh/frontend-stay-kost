"use client";

import Image from "next/image";
import { Heart, ChevronLeft, ChevronRight, Star, MapPin } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useSwipeable } from "react-swipeable";

import { FACILITY_ICONS } from "@/constants/facilities";

import { useWishlist } from "@/features/wishlist/hooks/useWishlist";
import { useAuthStore } from "@/stores/auth.store";
import { Badge } from "../ui/badge";
import KostCardSkeleton from "../Skeleton/CardListKostSkeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface KostCardProps {
  id: string;
  title: string;
  location: string;
  type: string;
  availableRooms: number;
  price: number;
  images: string[];
  facilities: string[];
  claasName?: string;
  rating?: number;
  transactions?: number;
  isLoading?: boolean; // ✅ tambahkan props loading
  score?: number;
}

const KostCard = ({
  id,
  title,
  location,
  type,
  price,
  images,
  facilities,
  availableRooms,
  claasName,
  rating,
  transactions,
  isLoading = false,
  score,
}: KostCardProps) => {
  const [currentImage, setCurrentImage] = useState(0);
  const { wishlist, add, remove } = useWishlist();
  const { user } = useAuthStore();

  const isWishlisted = wishlist?.data?.some(
    (item: any) => item.roomType_id === id,
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
      remove.mutate(id);
    } else {
      add.mutate(id);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventScrollOnSwipe: true,
    trackMouse: false, // kalau mau bisa drag di desktop juga → true
  });

  if (isLoading) {
    return <KostCardSkeleton />;
  }

  return (
    <div
      className={`group relative max-w-sm overflow-hidden rounded-lg border bg-white shadow-md lg:max-w-[260px] ${claasName}`}
    >
      <div {...handlers} className="relative h-48 w-full overflow-hidden">
        {/* Image Slider */}
        <div
          className="flex h-full w-full transition-transform duration-500 ease-in-out"
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
              className="h-48 w-full shrink-0 grow-0 object-cover"
            />
          ))}
        </div>
        {/* Skor Rekomendasi */}
        {typeof score === "number" && (
          <div className="absolute top-2 left-2 cursor-default rounded-md bg-white px-2 py-1 text-xs font-semibold shadow-md">
            Skor: {score.toFixed(2)}
          </div>
        )}
        {user?.role === "tenant" && (
          <div
            onClick={(e) => {
              e.preventDefault(); // Biar ga ikut klik ke Link
              toggleWishlist();
            }}
            className="absolute top-2 right-2 rounded-full bg-white/80 p-1 hover:bg-white"
          >
            <Heart
              className={`h-5 w-5 cursor-pointer ${
                isWishlisted
                  ? "fill-primary-600 text-primary-600"
                  : "text-gray-600"
              }`}
            />
          </div>
        )}

        {/* Navigasi gambar */}
        {images.length > 1 && (
          <>
            <div
              onClick={handlePrev}
              className="absolute top-1/2 left-2 hidden -translate-y-1/2 transform cursor-pointer rounded-full bg-white/70 p-1 group-hover:block hover:bg-white"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </div>
            <div
              onClick={handleNext}
              className="absolute top-1/2 right-2 hidden -translate-y-1/2 transform cursor-pointer rounded-full bg-white/70 p-1 group-hover:block hover:bg-white"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </div>
          </>
        )}

        {/* Indicator */}
        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 transform gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goToImage(i)}
              className={`h-1.5 w-1.5 cursor-pointer rounded-full ${
                currentImage === i ? "bg-white" : "bg-white/50"
              } transition-colors duration-200 hover:bg-white`}
            />
          ))}
        </div>
      </div>

      {/* Info Kost */}
      <Link href={`/kosts/${id}`}>
        <div className="flex min-h-[230px] flex-col justify-between p-4">
          <div>
            <div className="mb-1 flex items-center justify-between">
              <Badge variant={"outline"} className="capitalize">
                {type}
              </Badge>
              {availableRooms <= 0 ? (
                <span className="rounded-lg bg-red-100 px-2 py-1 text-xs font-semibold text-red-600">
                  Kamar Penuh
                </span>
              ) : availableRooms <= 2 ? (
                <span className="rounded-lg bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-700">
                  Sisa {availableRooms} Kamar
                </span>
              ) : null}
            </div>
            <h2 className="mb-2.5 line-clamp-2 text-lg font-semibold">
              {title}
            </h2>
            <p className="mb-2 flex gap-1.5 text-sm text-gray-600 capitalize">
              <MapPin size={18} /> {location}
            </p>

            {/* Rating & Review */}
            <div className="mb-4 flex items-center gap-1 text-sm text-gray-600">
              {rating && transactions ? (
                <>
                  <Star className="fill-primary-500 text-primary-500 h-4 w-4" />
                  <span className="font-medium">{rating}</span>
                  <span>• {transactions} Transaksi</span>
                </>
              ) : null}
            </div>

            <div className="mb-2 flex flex-wrap items-center space-x-2.5 text-sm text-gray-600">
              {facilities.slice(0, 5).map((key, index) => {
                const facility = FACILITY_ICONS[key];
                const Icon = facility?.icon;
                const label = facility?.label || key;
                return (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <div className="mb-1 flex cursor-pointer items-center gap-1">
                        <Icon className="h-5 w-5" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p>{label}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}

              {facilities.length > 5 && (
                <span className="text-sm text-gray-500">
                  +{facilities.length - 5} lagi
                </span>
              )}
            </div>
          </div>
          <div>
            <p className="text-lg font-semibold">
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
