"use client";

import KostCard from "@/components/common/CardListKost";
import { PaginationControls } from "@/components/common/Pagination";
import { Button } from "@/components/ui/button";

import { usePreference } from "@/features/preference/hooks/usePreference";

import Link from "next/link";

export default function RekomendasiKostPage() {
  // const [kostList] = useState(dummyKosts);

  const { preferenceKost } = usePreference();
  const { data, isLoading } = preferenceKost;

  if (isLoading) {
    <h1>Loading...</h1>;
  }

  const kostList = data?.data || [];
  const pagination = data?.pagination;

  return (
    <main className="container mx-auto space-y-10 px-6 py-12 md:px-16 lg:px-36">
      {/* Header */}
      <section className="space-y-2 text-center">
        <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
          Rekomendasi Kost Untuk Anda
        </h1>
        <p className="text-sm text-gray-500">
          Berikut kost yang kami rekomendasikan berdasarkan preferensi Anda.
        </p>
        <Button variant="outline" className="mt-2" asChild>
          <Link href={"/user/profile"}>Edit Preferensi</Link>
        </Button>
      </section>

      {/* Filter & Sort */}
      {/* <section className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex w-full gap-2 md:w-auto">
          <Button variant="outline" className="w-full md:w-auto">
            <Funnel className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" className="w-full md:w-auto">
            <ListFilter className="mr-2 h-4 w-4" />
            Urutkan
          </Button>
        </div>
        <Input
          placeholder="Cari nama kost atau lokasi..."
          className="mt-2 max-w-sm md:mt-0"
        />
      </section> */}

      {/* Kost List */}
      <section className="mx-auto my-10 max-w-6xl p-4">
        {kostList.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-gray-600">
              Belum ada kost yang cocok ditemukan.
            </p>
            <Button variant="link" className="mt-2 text-teal-600">
              Edit Preferensi
            </Button>
          </div>
        ) : (
          <div className="grid justify-center gap-4 md:grid-cols-2 lg:grid-cols-4">
            {kostList.map((kost: any, index: number) => (
              <KostCard
                key={index}
                id={kost.id}
                title={kost.kostName}
                location={kost.address}
                type={kost.kostType}
                price={kost.price}
                images={kost.photos}
                facilities={kost.facilities}
                availableRooms={kost.rooms}
              />
            ))}
          </div>
        )}
      </section>

      {pagination && (
        <div className="mx-auto mt-10 mb-24 max-w-xl">
          <PaginationControls
            page={pagination.page}
            onPageChange={() => console.log("tes")}
            totalPages={pagination.totalPages}
          />
        </div>
      )}
    </main>
  );
}
