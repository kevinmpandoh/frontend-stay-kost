"use client";
import React from "react";

import KostCardSkeleton from "@/components/Skeleton/CardListKostSkeleton";

import ErrorState from "@/components/Error/ErrorState";
import KostPagination from "./KostPagination";
import { useKost } from "../hooks/useKost";
import KostCard from "@/components/common/CardListKost";
import EmptyState from "@/components/common/EmptyState";

const KostList = () => {
  const { kostList } = useKost();

  if (kostList.isLoading) {
    return (
      <div className="0 mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <KostCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (kostList.isError) {
    return (
      <div className="mt-6 flex h-[300px] items-center justify-center">
        <ErrorState message="Gagal memuat data kost. Silakan coba lagi nanti." />
      </div>
    );
  }
  const kosts = kostList?.data.data || [];
  const pagination = kostList?.data.pagination || { page: 1, totalPages: 1 };

  console.log(kostList, "TES");

  if (!kosts?.length || !kostList?.data) {
    return (
      <div className="mt-6 flex h-[300px] items-center justify-center">
        <EmptyState message="Tidak ada kost yang ditemukan." />
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="grid justify-center gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kosts?.map((kost: any) => (
          <KostCard
            key={kost.id}
            id={kost.id}
            title={kost.name}
            location={kost.address}
            type={kost.type}
            price={kost.price}
            images={kost.photos}
            facilities={kost.facilities}
            availableRooms={kost.availableRooms}
            rating={kost.rating}
            transactions={kost.transactions}
          />
        ))}
      </div>

      {pagination && (
        <div className="mx-auto mt-10 mb-24 max-w-xl">
          <KostPagination
            page={pagination.page}
            totalPages={pagination.totalPages}
          />
        </div>
      )}
    </div>
  );
};

export default KostList;
