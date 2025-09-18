// app/(public)/kost/[kostId]/booking/components/BookingSuccess.tsx

import Image from "next/image";
import Link from "next/link";

export default function BookingSuccess() {
  return (
    <div className="flex flex-col items-center h-[710px] justify-center w-full text-center p-8">
      <Image
        src="/success-booking.svg"
        alt="Success Illustration"
        className="w-48 h-48 mb-6"
        width={300}
        height={300}
      />
      <h1 className="text-2xl font-bold mb-4">
        Pengajuan Sewa Berhasil Dikirim
      </h1>
      <p className="mb-6">
        Tunggu konfirmasi dari pemilik kost paling lambat 1x 24 jam dari
        sekarang
      </p>
      <Link
        href="/user/pengajuan-sewa"
        className="block bg-primary text-white py-2 px-4 rounded mb-2"
      >
        Lihat Status Pengajuan
      </Link>
      <Link
        href="/kosts"
        className="block border border-primary text-primary py-2 px-4 rounded"
      >
        Lihat Kost yang Lain
      </Link>
    </div>
  );
}
