"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import Image from "next/image";

interface BookingDetailModalProps {
  open: boolean;
  onClose: () => void;
  data: {
    id?: string;
    kostName: string;
    category: string;
    address: string;
    imageUrl?: string;
    price: number;
    duration: string;
    checkInDate: string;
    checkOutDate: string;
    documment?: string;
    note?: string;
  };
}

export function BookingDetailModal({
  open,
  onClose,
  data,
}: BookingDetailModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="rounded-xl md:max-w-xl">
        <DialogHeader>
          <DialogTitle>Detail Pengajuan Sewa Kost</DialogTitle>
          <DialogDescription>Booking ID: {data.id}</DialogDescription>
        </DialogHeader>

        <div className="flex gap-4 border-y-2 py-4">
          <Image
            src={data.imageUrl || "/kost.jpg"}
            alt={data.kostName}
            width={120}
            height={90}
            className="h-[90px] w-[120px] rounded-md object-cover"
          />
          <div>
            <h2 className="text-lg font-semibold">
              {data.kostName} – {data.category}
            </h2>
            <p className="flex items-center gap-1 text-sm text-gray-600">
              <MapPin size={18} /> {data.address}
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-2 text-base">
          <div className="flex justify-between">
            <span>Harga Perbulan</span>
            <span className="font-semibold">
              Rp {data.price.toLocaleString("id-ID")}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Durasi Sewa</span>
            <span className="font-semibold">{data.duration} Bulan</span>
          </div>
          <div className="flex justify-between">
            <span>Tanggal Masuk</span>
            <span className="font-semibold">{data.checkInDate}</span>
          </div>
          <div className="flex justify-between">
            <span>Tanggal Berakhir</span>
            <span className="font-semibold">{data.checkOutDate}</span>
          </div>
          <div className="flex justify-between">
            <span>Catatan Tambahan</span>
            <span>{data.note || "-"}</span>
          </div>
          {data.documment && (
            <div className="flex items-start justify-between">
              <span>Dokumen Tambahan</span>
              <Image
                src={data?.documment}
                alt="Doccument"
                width={120}
                height={120}
              />
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Tutup
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
