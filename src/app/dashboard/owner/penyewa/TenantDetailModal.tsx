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
import InfoRow from "./[bookingId]/InfoRow";
import { Contact, FileText, Phone, User, User2, UserCheck } from "lucide-react";
import { useChat } from "@/features/chat/hooks/useChat";
import { useState } from "react";
import StopRentModal from "./[bookingId]/StopRentModal";

type Props = {
  open: boolean;
  onClose: () => void;
  booking: any;
};

const TenantDetailModal = ({ open, onClose, booking }: Props) => {
  const { startChat } = useChat();
  const [openStopModal, setOpenStopModal] = useState(false);
  if (!booking) return null;

  return (
    <>
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
            <TabsContent value="info" className="mt-4 space-y-6">
              <div className="flex items-center gap-6">
                <Image
                  src={booking.tenant.photo || "/profile-default.png"}
                  alt="Profile"
                  className="h-20 w-20 rounded-full object-cover"
                  width={96}
                  height={96}
                />
                <div>
                  <p className="text-lg font-semibold">{booking.tenant.name}</p>
                  <p className="text-sm text-gray-500">
                    {booking.tenant.email}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Data Diri */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Data Diri
                  </h3>
                  <InfoRow
                    icon={<UserCheck size={20} />}
                    label="Jenis Kelamin"
                    value={booking.tenant?.gender || "-"}
                  />

                  <InfoRow
                    icon={<Contact size={20} />}
                    label="Pekerjaan"
                    value={booking.tenant?.job || "-"}
                  />
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Kontak Penyewa
                  </h3>
                  <InfoRow
                    icon={<Phone size={20} />}
                    label="No HP"
                    value={booking.tenant?.phone || "-"}
                  />
                  <InfoRow
                    icon={<User size={20} />}
                    label="Kontak Darurat"
                    value={booking.tenant?.emergencyContact || "-"}
                  />
                </div>

                {/* Dokumen */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Document
                  </h3>
                  <div>
                    <p className="mb-2 text-gray-600">Foto KTP</p>
                    {booking.document ? (
                      <Image
                        src={booking.document}
                        alt="Foto KTP"
                        className="h-40 w-auto rounded-md border object-cover"
                        width={200}
                        height={160}
                      />
                    ) : (
                      <p className="text-sm text-gray-500">
                        Belum ada foto KTP
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* TAB KONTRAK */}
            <TabsContent value="kontrak" className="space-y-6">
              <div className="mt-4 flex items-center gap-6">
                <Image
                  src={booking.photoRoom || "/profile-default.png"}
                  alt="Profile"
                  className="h-24 w-32 rounded object-cover"
                  width={96}
                  height={96}
                />
                <div>
                  <p className="text-lg font-semibold">{booking.kostName}</p>
                  <p className="text-sm text-gray-500">{booking.room}</p>
                </div>
              </div>
              <div className="space-y-6">
                {/* Data Diri */}
                <div className="space-y-3">
                  <InfoRow
                    icon={<User2 size={20} />}
                    label="Mulai Sewa"
                    value={booking.startDate || "-"}
                  />
                  <InfoRow
                    icon={<UserCheck size={20} />}
                    label="Tanggal Selesai"
                    value={booking.endDate || "-"}
                  />

                  <InfoRow
                    icon={<Contact size={20} />}
                    label="Durasi"
                    value={`${booking.duration} Bulan`}
                  />
                  <InfoRow
                    icon={<Phone size={20} />}
                    label="Biaya Sewa"
                    value={
                      booking.cost
                        ? `Rp ${booking.cost.toLocaleString("id-ID")}`
                        : "-"
                    }
                  />
                </div>

                {booking.stopRent && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Berhenti Sewa
                    </h3>
                    <InfoRow
                      icon={<FileText size={20} />}
                      label="Tanggal Berhenti"
                      value={booking.stopRent.stopDate || "-"}
                    />
                    <InfoRow
                      icon={<FileText size={20} />}
                      label="Status"
                      value={"Pending"}
                    />
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() =>
                  startChat(
                    {
                      roomTypeId: booking.roomTypeId,
                      tenantId: booking.tenant.id,
                    },
                    {
                      onSuccess: () => {
                        onClose();
                      },
                    },
                  )
                }
              >
                Chat dengan Penyewa
              </Button>

              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => setOpenStopModal(true)}
              >
                Berhentikan Sewa
              </Button>
            </div>

            {/* <Button variant="secondary" onClick={onClose}>
            Tutup
          </Button> */}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <StopRentModal
        open={openStopModal}
        onClose={() => setOpenStopModal(false)}
        bookingId={booking.id}
      />
    </>
  );
};

export default TenantDetailModal;
