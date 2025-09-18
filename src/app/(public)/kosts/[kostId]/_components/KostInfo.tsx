"use client";

import {
  useIsWishlisted,
  useWishlist,
} from "@/features/wishlist/hooks/useWishlist";
import { ShareModal } from "./ShareModal";

import { useAuthStore } from "@/stores/auth.store";

import { MapPin, Star, Share2, Heart } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
// import { cn } from "@/lib/utils"; // opsional helper untuk className
// import { Badge } from "@/components/ui/badge";

interface KostInfoProps {
  id: string;
  nama: string;
  jenis: string;
  alamat: string;
  rating: number;
  jumlahUlasan: number;
  availableRooms: number;
}

export function KostInfo({
  id,
  nama,
  jenis,
  alamat,
  rating,
  jumlahUlasan,
  availableRooms,
}: KostInfoProps) {
  const [isShareOpen, setShareOpen] = useState(false);
  const { add, remove } = useWishlist();

  const { user } = useAuthStore();
  const { data: isWishlisted, isLoading: checkingWishlist } =
    useIsWishlisted(id);
  const toggleWishlist = () => {
    if (isWishlisted) {
      remove.mutate(id);
    } else {
      add.mutate(id);
    }
  };

  return (
    <>
      <div className="space-y-2">
        {/* Jenis & Nama */}
        <div className="flex items-start justify-between">
          <div>
            {/* <div className="text-sm text-muted-foreground font-medium">
            {jenis}
          </div> */}
            <Badge className="mr-4 text-base capitalize" variant={"outline"}>
              {jenis}
            </Badge>

            {availableRooms <= 0 ? (
              <span className="rounded-lg bg-red-100 px-2 py-1 text-xs font-semibold text-red-600">
                Kamar Kosong
              </span>
            ) : availableRooms <= 2 ? (
              <span className="rounded-lg bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-700">
                Sisa {availableRooms} Kamar
              </span>
            ) : null}
            <h1 className="text-foreground text-2xl leading-tight font-semibold">
              {nama}
            </h1>
          </div>

          {/* Share & Favorite - Desktop only */}
          <div className="hidden gap-2 sm:flex">
            <button
              onClick={() => setShareOpen(true)}
              className="hover:bg-accent rounded-full p-2"
            >
              <Share2 className="text-muted-foreground h-6 w-6" />
            </button>
            {user?.role === "tenant" && (
              <button
                onClick={toggleWishlist}
                className="hover:bg-accent rounded-full p-2 transition"
                disabled={add.isPending || remove.isPending || checkingWishlist}
              >
                <Heart
                  className={`h-6 w-6 ${
                    isWishlisted
                      ? "fill-primary-500 text-primary-500"
                      : "text-gray-600"
                  }`}
                />
              </button>
            )}
          </div>
        </div>

        <div className="flex items-start justify-start gap-4">
          {/* Alamat */}
          <div className="text-muted-foreground flex items-center gap-2 text-base">
            <MapPin className="h-5 w-5" />
            <span>{alamat}</span>
          </div>

          {/* Rating */}
          <div className="text-primary-500 flex items-center gap-1 text-base">
            <Star className="fill-primary-500 h-5 w-5" />
            <span>{rating}</span>
            <span className="text-muted-foreground">
              ({jumlahUlasan} ulasan)
            </span>
          </div>
        </div>
      </div>
      <ShareModal
        open={isShareOpen}
        onClose={() => setShareOpen(false)}
        url={typeof window !== "undefined" ? window.location.href : ""}
      />
    </>
  );
}
