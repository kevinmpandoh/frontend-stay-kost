"use client";
import React from "react";

import { KostDescription } from "./KostDecription";
import { KostFacilities } from "./KostFacilities";
import { KostImageGallery } from "./KostGalerry";
import { KostInfo } from "./KostInfo";
import { KostLocation } from "./KostLocation";
import KostReviewList from "./KostReviews";
import KostRoomVariants from "./KostRoomVariants";
import { KostRules } from "./KostRules";
import KostSidebarCard from "./KostSidebarCard";
import { OwnerInfo } from "./OwnerInfo";
import { NearbyKostRecommendations } from "./KostNewarByRecomendations";
import KostDetailSkeleton from "./KostDetailSkeleton";
import KostError from "./KostError";
import { useRouter } from "next/navigation";

import { useKost } from "@/features/kost/hooks/useKost";
import { useAuthStore } from "@/stores/auth.store";
import { useLoginModal } from "@/stores/loginModal.store";
import { useBookingStore } from "@/features/booking/booking.store";

interface DetailKostProps {
  kostId: string;
}

const DetailKost = ({ kostId }: DetailKostProps) => {
  const { kostDetail } = useKost(kostId);
  const { data: kost, isLoading, isError, error } = kostDetail;
  const { open } = useLoginModal();

  const router = useRouter();

  const { isAuthenticated } = useAuthStore();
  const { setStartDate } = useBookingStore();

  if (isLoading) return <KostDetailSkeleton />;

  if (isError || !kost) {
    if ((error as any)?.status === 404) {
      return <KostError message="Kost tidak ditemukan atau sudah dihapus." />;
    }

    return (
      <KostError message="Gagal memuat detail kost. Silakan coba lagi nanti." />
    );
  }
  const handleBookingCLick = (tanggalMasuk: string) => {
    console.log(isAuthenticated, "HOO");
    if (!isAuthenticated) {
      open();
      return;
    }

    setStartDate(tanggalMasuk);
    router.push(`/kosts/${kostId}/booking`);
  };

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-6">
        <KostImageGallery photos={kost?.photos} />

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-9">
          <div className="space-y-6 lg:col-span-6">
            <KostInfo
              id={kost.id}
              nama={`${kost.name}`}
              jenis={kost.type}
              alamat={`${kost.address.district}, ${kost.address.city}`}
              rating={kost.averageRating}
              jumlahUlasan={kost.reviews.length}
              availableRooms={kost.availableRooms}
            />
            <OwnerInfo
              ownerName={kost.owner?.name}
              ownerPhoto={kost.owner?.avatar || "/profile-default.png"}
            />
            <KostDescription description={kost.description} />
            <KostFacilities
              roomFacilities={kost.roomFacilities}
              sharedFacilities={kost.kostFacilities}
            />
            <KostRules rules={kost.rules} />

            <KostLocation
              kostName={kost.nama_kost}
              addressDetail={`${kost.address.district}, ${kost.address.city}`}
              latitude={kost.address.coordinates.coordinates[1]}
              longitude={kost.address.coordinates.coordinates[0]}
            />
            <KostRoomVariants
              variants={kost.otherKostTypes}
              handleBookingClick={handleBookingCLick}
            />
            <KostReviewList reviews={kost.reviews} />
          </div>
          {/* Kanan (sticky) */}
          <div className="sticky top-32 h-fit lg:col-span-3">
            <KostSidebarCard
              price={kost.price}
              kostId={kost.id}
              handleBookingClick={handleBookingCLick}
              availableRooms={kost.availableRooms}
            />
          </div>
        </div>

        <NearbyKostRecommendations kosts={kost?.nearbyKosts} />
      </div>
    </>
  );
};

export default DetailKost;
