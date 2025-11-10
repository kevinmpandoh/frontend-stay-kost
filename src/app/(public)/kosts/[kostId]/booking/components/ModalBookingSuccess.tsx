"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { DialogTitle } from "@radix-ui/react-dialog";

interface ModalBookingSuccessProps {
  open: boolean;
}

export default function ModalBookingSuccess({
  open,
}: ModalBookingSuccessProps) {
  return (
    <Dialog open={open}>
      <DialogTitle className="sr-only">Booking Berhasil</DialogTitle>
      <DialogContent
        showCloseButton={false}
        className="rounded-xl p-8 text-center sm:max-w-xl"
        onInteractOutside={(e) => e.preventDefault()} // tidak bisa klik di luar
        onEscapeKeyDown={(e) => e.preventDefault()} // tidak bisa ESC
      >
        <div className="flex flex-col items-center gap-4">
          <Image
            src="/success-booking.svg"
            alt="Success Illustration"
            className="mb-6 h-48 w-48"
            width={300}
            height={300}
          />
          <h2 className="text-2xl font-semibold">Pengajuan Berhasil!</h2>
          <p className="text-muted-foreground max-w-xs text-base">
            Permintaan sewa kost Anda sudah kami terima. Tunggu konfirmasi dari
            pemilik kost paling lambat 3 x 24 jam dari sekarang
          </p>
          <div className="mt-4 flex w-full flex-col gap-3">
            <Button size={"lg"} className="w-full">
              <Link href={"/user/pengajuan-sewa"}>Lihat Pengajuan Saya</Link>
            </Button>
            <Button variant="outline" size={"lg"} className="w-full">
              <Link href={"/kosts"}>Lihat Kost Lain</Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
