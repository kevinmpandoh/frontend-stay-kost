// app/(public)/kost/[kostId]/booking/components/BookingClient.tsx

"use client";

import { useKost } from "@/features/kost/hooks/useKost";
import BookingForm from "./BookingForm";
import BookingSidebar from "./BookingSidebar";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/features/booking/booking.store";
import BackLink from "@/components/common/BackLink";

interface BookingTenantProps {
  kostId: string;
}

export default function BookingTenant({ kostId }: BookingTenantProps) {
  const { kostDetail } = useKost(kostId);
  const { data: kost, isLoading, isError, error } = kostDetail;
  const router = useRouter();
  const { startDate } = useBookingStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!startDate) {
      router.replace(`/kosts/${kostId}`); // balik ke list/detail kalau akses langsung
    } else {
      setLoading(false);
    }
  }, [startDate, router, kostId]);

  if (loading || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Memuat halaman booking...</p>
      </div>
    );
  }

  if (isError || !kost) {
    if ((error as any)?.status === 404) {
      return <div>Kost tidak ditemukan atau sudah dihapus.</div>;
    }

    return <div>Gagal memuat detail kost. Silakan coba lagi nanti.</div>;
  }

  return (
    <>
      <>
        {/* Kiri - Form */}
        <div className="mr-8 flex-1 space-y-6 rounded-2xl p-6">
          {/* <Link
            href={`/kosts/${kostId}`}
            className="text-primary-600 mb-4 flex items-center gap-2 hover:underline"
          >
            <ArrowLeft /> <span>Kembali ke Detail Kost</span>
          </Link> */}
          <BackLink label="Kembali ke detail kost" />

          <BookingForm kostId={kostId} />
        </div>

        {/* Kanan - Sidebar */}
        <div className="w-full md:w-1/3">
          <BookingSidebar
            kost={{
              name: kost?.name,
              type: kost?.type,
              address: `${kost?.address.district}, ${kost?.address.city}`,
              image: kost?.photos[0]?.url,
              price: kost.price,
            }}
          />
        </div>
      </>
    </>
  );
}
