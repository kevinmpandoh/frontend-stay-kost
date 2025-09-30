"use client";

import { useBookingStore } from "@/features/booking/booking.store";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function BookingSuccess() {
  const { success, clearBooking } = useBookingStore();

  const router = useRouter();

  useEffect(() => {
    if (!success) {
      router.replace("/kosts"); // kalau akses langsung, balik
    }
    // setelah tampilkan success, clear supaya tidak bisa akses ulang
    return () => clearBooking();
  }, [success, router, clearBooking]);
  return (
    <div className="flex h-[710px] w-full flex-col items-center justify-center p-8 text-center">
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
      <Link
        href="/user/pengajuan-sewa"
        className="bg-primary mb-2 block rounded px-4 py-2 text-white"
      >
        Lihat Pengajuan sewa saya
      </Link>
      <Link
        href="/kosts"
        className="border-primary text-primary block rounded border px-4 py-2"
      >
        Lihat Kost yang Lain
      </Link>
    </div>
  );
}
