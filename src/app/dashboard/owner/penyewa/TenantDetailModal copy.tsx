"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

type Props = {
  open: boolean;
  onClose: () => void;
  booking: any;
};

const TenantDetailModal = ({ open, onClose, booking }: Props) => {
  if (!booking) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Detail Penyewa</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="info" className="mt-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="info">Informasi Penyewa</TabsTrigger>
            <TabsTrigger value="kontrak">Kontrak</TabsTrigger>
          </TabsList>

          {/* TAB INFORMASI PENYEWA */}
          <TabsContent value="info" className="space-y-6">
            <div className="flex items-center gap-6">
              <Image
                src={booking.profileImage || "/profile-default.png"}
                alt="Profile"
                className="h-24 w-24 rounded-full object-cover"
                width={96}
                height={96}
              />
              <div>
                <p className="text-lg font-semibold">Kevin Mclarne Pandoh</p>
                <p className="text-sm text-gray-500">kevinmpandoh@gmail.com</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Jenis Kelamin</p>
                <p className="font-medium">Laki-Laki</p>
              </div>
              <div>
                <p className="text-gray-600">Pekerjaan</p>
                <p className="font-medium">Mahasiswa</p>
              </div>
              <div>
                <p className="text-gray-600">Nomor HP</p>
                <p className="font-medium">089510465800</p>
              </div>
              <div>
                <p className="text-gray-600">Kontak Darurat</p>
                <p className="font-medium">089512312312</p>
              </div>
            </div>

            <div>
              <p className="mb-2 text-gray-600">Foto KTP</p>
              {true ? (
                <Image
                  src={booking.ktpImage || "/profile-default.png"}
                  alt="Foto KTP"
                  className="h-40 w-auto rounded-md border object-cover"
                  width={200}
                  height={160}
                />
              ) : (
                <p className="text-sm text-gray-500">Belum ada foto KTP</p>
              )}
            </div>
          </TabsContent>

          {/* TAB KONTRAK */}
          <TabsContent value="kontrak" className="space-y-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Nama Kost</p>
                <p className="font-medium">Kost ASD asda - ADASD</p>
              </div>
              <div>
                <p className="text-gray-600">Kamar</p>
                <p className="font-medium">Kamar 123 Lantai 3</p>
              </div>
              <div>
                <p className="text-gray-600">Mulai Sewa</p>
                <p className="font-medium">1 Januari 2024</p>
              </div>
              <div>
                <p className="text-gray-600">Selesai Sewa</p>
                <p className="font-medium">123 Desember 2023</p>
              </div>
              <div>
                <p className="text-gray-600">Durasi</p>
                <p className="font-medium">5 bulan</p>
              </div>
              <div>
                <p className="text-gray-600">Biaya Sewa</p>
                <p className="font-medium">
                  Rp {(123123)?.toLocaleString("id-ID")}
                </p>
              </div>
            </div>

            {booking.stopRent && (
              <div className="rounded-md border bg-gray-50 p-3 text-sm">
                <p className="text-gray-600">Berhenti Sewa</p>
                <p className="font-medium">{booking.stopRent.stopDate}</p>
                <p className="text-xs text-gray-500">
                  Status: {booking.stopRent.status}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>
            Tutup
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TenantDetailModal;
