"use client";

import { Button } from "@/components/ui/button";
import { useBookingStore } from "@/features/booking/booking.store";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BookingSuccess() {
  const { success, clearBooking } = useBookingStore();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!success) {
      router.replace("/"); // kalau akses langsung, balik
    } else {
      setLoading(false);
      // clearBooking(); // reset biar tidak bisa balik success lewat refresh
    }
    // setelah tampilkan success, clear supaya tidak bisa akses ulang
  }, [success, router]);

  const handleClick = () => {
    router.push("/user/pengajuan-sewa");
    // clearBooking();
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Memuat booking success...</p>
      </div>
    );
  }
  return (
    <div className="flex h-[600px] w-full flex-col items-center justify-center p-8 text-center">
      <Image
        src="/success-booking.svg"
        alt="Success Illustration"
        className="mb-6 h-48 w-48"
        width={300}
        height={300}
      />
      <h1 className="mb-4 text-2xl font-bold">
        Pengajuan Sewa Berhasil Dikirim
      </h1>
      <p className="mb-6">
        Tunggu konfirmasi dari pemilik kost paling lambat 1x 24 jam dari
        sekarang
      </p>
      <div>
        <Button
          onClick={handleClick}
          // href="/user/pengajuan-sewa"
          size={"lg"}
          className="mb-2 w-full"
        >
          Lihat Status Pengajuan
        </Button>

        <Link
          href="/kosts"
          className="border-primary text-primary block rounded border px-4 py-2"
        >
          Lihat Kost yang Lain
        </Link>
      </div>
    </div>
  );
}
