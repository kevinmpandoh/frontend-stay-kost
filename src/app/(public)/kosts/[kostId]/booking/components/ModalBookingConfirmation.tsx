"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { MapPin, CheckCircle, Info } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { FACILITY_ICONS } from "@/constants/facilities";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface ModalBookingConfirmationProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
  kost: {
    name: string;
    type: string;
    image?: string;
    address: string;
    rules: string[];
    facilities: string[];
    price: number;
  };
  bookingInfo: {
    duration: number;
    checkIn: string;
    note?: string | null;
  };
}

export default function ModalBookingConfirmation({
  open,
  onClose,
  onConfirm,
  kost,
  bookingInfo,
  loading,
}: ModalBookingConfirmationProps) {
  const [agreed, setAgreed] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-xl p-6 sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Konfirmasi Pengajuan Sewa
          </DialogTitle>
          <DialogDescription className="text-base">
            Pastikan semua informasi kost dan penyewaan sudah benar sebelum
            mengajukan.
          </DialogDescription>
        </DialogHeader>

        {/* Konten utama */}
        <div className="mt-4">
          {/* Info kost */}
          <div className="flex gap-4 space-y-3">
            <div className="relative h-28 w-36 overflow-hidden rounded-lg">
              <Image
                src={kost.image || "/kost-image-default.png"}
                alt={kost.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="">
              <Badge variant={"outline"} className="capitalize">
                {kost.type || "Campur"}
              </Badge>

              <h3 className="text-base leading-tight font-semibold">
                {kost.name}
              </h3>
              <p className="mt-1 flex items-center gap-1 text-sm text-gray-600">
                <MapPin className="h-4 w-4 text-gray-400" />
                {kost.address}
              </p>
            </div>

            {/* <div>
              <div>
                <h3 className="text-lg font-semibold">{kost.name}</h3>
                <p className="text-muted-foreground mt-1 flex items-center gap-1 text-sm">
                  <MapPin className="h-4 w-4" /> {kost.address}
                </p>
              </div>

              <div>
                <h4 className="mb-1 text-sm font-semibold">Peraturan Kost</h4>
                <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
                  {kost.rules.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-1 text-sm font-semibold">Fasilitas Kost</h4>
                <div className="flex flex-wrap gap-2">
                  {kost.facilities.map((f, i) => (
                    <Badge key={i} variant="secondary" className="capitalize">
                      {f}
                    </Badge>
                  ))}
                </div>
              </div>
            </div> */}
          </div>

          <div className="my-4 space-y-3">
            <h4 className="text-lg font-semibold">Fasilitas Kost</h4>
            <div className="my-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {kost.facilities.map((key, index) => {
                const facility = FACILITY_ICONS[key];
                const Icon = facility?.icon;
                const label = facility?.label || key;
                return (
                  <div
                    key={index}
                    className="text-md flex items-center gap-2 font-semibold text-slate-600"
                  >
                    <Icon className="h-5 w-5" />
                    <span>{label}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <Separator className="my-2" />
          <div className="my-4 space-y-3">
            <h4 className="text-lg font-semibold">Peraturan Kost</h4>

            <ul className="text-md text-muted-foreground list-disc space-y-1 pl-5">
              {kost.rules.map((rule, index) => (
                <li key={index}>{rule}</li>
              ))}
            </ul>
          </div>
          <Separator className="my-2" />
          {/* Info sewa */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold">Informasi Penyewaan</h4>

            <div className="mb-6 space-y-3 text-sm sm:text-base">
              <div className="flex justify-between">
                <span>Mulai Sewa</span>
                <span className="font-semibold">{bookingInfo.checkIn}</span>
              </div>
              <div className="flex justify-between">
                <span>Durasi Sewa</span>
                <span className="font-semibold">
                  {bookingInfo.duration} Bulan
                </span>
              </div>
              <div className="flex justify-between">
                <span>Catatan</span>
                <span className="font-semibold">
                  {bookingInfo?.note || "-"}
                </span>
              </div>
            </div>

            <div className="text-end">
              <p className="text-lg font-semibold">Biaya Sewa</p>
              <p className="text-primary text-xl font-bold">
                Rp {kost.price.toLocaleString("id-ID")}{" "}
                <span className="text-muted-foreground text-base font-normal">
                  / bulan
                </span>
              </p>
            </div>
          </div>
          <Separator className="my-4" />

          {/* Persetujuan syarat & ketentuan */}
          <div className="bg-muted/40 mt-4 flex items-start space-x-2 rounded-md p-3">
            <Checkbox
              id="agree"
              checked={agreed}
              onCheckedChange={() => {
                setAgreed(!agreed);
              }}
            />
            <label
              htmlFor="agree"
              className="text-sm leading-snug text-gray-700 select-none"
            >
              Saya telah membaca dan menyetujui{" "}
              <a
                href="/terms-and-conditions"
                target="_blank"
                className="text-primary font-medium hover:underline"
              >
                Syarat & Ketentuan
              </a>{" "}
              serta{" "}
              <a
                href="/privacy-policy"
                target="_blank"
                className="text-primary font-medium hover:underline"
              >
                Kebijakan Privasi
              </a>
              .
            </label>
          </div>
        </div>

        <DialogFooter className="mt-6 w-full">
          <Button
            onClick={onConfirm}
            className="w-full"
            size={"lg"}
            disabled={!agreed || loading}
          >
            {loading ? "Memproses..." : "Kirim Pengajuan Sewa"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
