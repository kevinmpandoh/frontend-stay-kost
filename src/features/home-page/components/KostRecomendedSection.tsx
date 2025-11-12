"use client";

import React, { useRef } from "react";
import KostCard from "@/components/common/CardListKost";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePreference } from "@/features/preference/hooks/usePreference";

// import KostCardSkeleton from "@/components/Skeleton/CardListKostSkeleton";

const KostRecomendedSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollAmount = container.offsetWidth;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const { preferenceKost } = usePreference();

  if (preferenceKost.isLoading) {
    return (
      <div className="mt-8 grid gap-4 px-36 md:grid-cols-2 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse space-y-4 rounded-xl bg-gray-100 p-4 dark:bg-gray-800"
          >
            <div className="h-32 rounded-lg bg-gray-300" />
            <div className="h-4 w-3/4 rounded bg-gray-300" />
            <div className="h-4 w-1/2 rounded bg-gray-300" />
            <div className="h-4 w-1/4 rounded bg-gray-300" />
          </div>
        ))}
      </div>
    );
  }

  if (preferenceKost.isError) {
    return (
      //  Perbaikan error state dan tombol refetch
      <div className="mt-6 flex h-[300px] items-center justify-center">
        <div className="flex flex-col items-center">
          <p className="mb-2 text-gray-500">Gagal memuat data kost.</p>
          <Button variant="outline" onClick={() => preferenceKost.refetch()}>
            Coba Lagi
          </Button>
        </div>
      </div>
    );
  }

  if (!preferenceKost) {
    return;
  }

  return (
    <>
      {!preferenceKost ? null : (
        <section className="container mx-auto bg-white px-6 py-16 md:px-18 lg:px-36">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-lg font-bold lg:text-2xl">
              Rekomendasi Kost Untuk Anda
            </h2>
          </div>

          <div className="relative">
            {/* Tombol navigasi di desktop */}
            <button
              type="button"
              onClick={() => scroll("left")}
              className="absolute -top-10 right-15 z-10 hidden -translate-y-1/2 rounded-full bg-white p-2 shadow hover:bg-gray-100 md:flex"
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="absolute -top-10 right-0 z-10 hidden -translate-y-1/2 rounded-full bg-white p-2 shadow hover:bg-gray-100 md:flex"
            >
              <ChevronRight />
            </button>

            {/* Scrollable container */}
            <div
              ref={scrollRef}
              className="no-scrollbar flex gap-2 overflow-x-auto scroll-smooth md:overflow-x-hidden"
            >
              {preferenceKost?.data?.data?.map((kost: any, index: number) => {
                return (
                  <div key={index} className="min-w-[243px] md:flex-1">
                    <KostCard
                      id={kost.id}
                      title={kost.kostName}
                      location={kost.address}
                      type={kost.kostType}
                      price={kost.price}
                      images={kost.photos}
                      facilities={kost.facilities}
                      availableRooms={kost.rooms}
                      score={kost.skor}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-10 flex items-center justify-center">
            <Button variant={"link"}>
              <Link href="/kosts/recomended" className="text-lg text-teal-500">
                Lihat Semua
              </Link>
            </Button>
          </div>
        </section>
      )}
    </>
  );
};

export default KostRecomendedSection;
