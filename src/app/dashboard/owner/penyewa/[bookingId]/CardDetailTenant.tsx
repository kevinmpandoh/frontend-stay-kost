"use client";

import {
  Calendar,
  Contact,
  FileText,
  Mail,
  Phone,
  User,
  User2,
  UserCheck,
} from "lucide-react";
import React, { useState } from "react";
import InfoRow from "./InfoRow";
import CardSection from "./CardSection";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; // pastikan komponen Tabs dari ShadCN tersedia
import { Skeleton } from "@/components/ui/skeleton";

import { useQuery } from "@tanstack/react-query";

import StopRentModal from "./StopRentModal";
import { useChat } from "@/features/chat/hooks/useChat";
import { bookingService } from "@/features/booking/booking.service";
import { BookingStatus } from "@/features/booking/types/booking.type";

const TenantDetailCard = ({ bookingId }: { bookingId: string }) => {
  const [tab, setTab] = useState<"biodata" | "kontrak">("biodata");
  const [openStopModal, setOpenStopModal] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["tenant-detail", bookingId],
    queryFn: () => bookingService.getDetailBooking(bookingId as string),
    enabled: !!bookingId,
  });

  const { startChat } = useChat();

  if (isLoading || !data) {
    return (
      <div className="mx-auto max-w-2xl space-y-4 p-6">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-60 w-full" />
      </div>
    );
  }

  return (
    <CardSection title="Informasi Penyewa">
      {/* Tabs */}
      <Tabs
        defaultValue={tab}
        onValueChange={(val) => setTab(val as "biodata" | "kontrak")}
      >
        <TabsList className="mb-6 grid w-full grid-cols-2">
          <TabsTrigger value="biodata">Biodata</TabsTrigger>
          <TabsTrigger value="kontrak">Kontrak Sewa</TabsTrigger>
        </TabsList>

        {/* Tab: Biodata */}
        <TabsContent value="biodata">
          <div className="space-y-6">
            {/* Data Diri */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800">Data Diri</h3>
              <InfoRow
                icon={<User2 size={20} />}
                label="Nama Lengkap"
                value={data.tenant.name || "-"}
              />
              <InfoRow
                icon={<UserCheck size={20} />}
                label="Jenis Kelamin"
                value={data.tenant?.gender || "-"}
              />
              {/* <InfoRow
                icon={<User size={20} />}
                label="Status"
                value={data.biodata.status}
              /> */}
              <InfoRow
                icon={<Contact size={20} />}
                label="Pekerjaan"
                value={data.tenant.job || "-"}
              />
            </div>

            {/* Kontak Penyewa */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800">
                Kontak Penyewa
              </h3>
              <InfoRow
                icon={<Phone size={20} />}
                label="No HP"
                value={data.tenant.phone || "-"}
              />
              <InfoRow
                icon={<Mail size={20} />}
                label="Email"
                value={data.tenant.email || "-"}
              />
              <InfoRow
                icon={<User size={20} />}
                label="Kontak Darurat"
                value={data.tenant.emergencyContact || "-"}
              />
            </div>

            {/* Dokumen */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800">
                Dokumen Penyewa
              </h3>
              <InfoRow
                icon={<FileText size={20} />}
                label="KTP"
                value={data.idDocument || "-"}
              />
              <InfoRow
                icon={<FileText size={20} />}
                label="Foto Profil"
                value={data.tenant.photo || "-"}
              />
            </div>
          </div>
        </TabsContent>

        {/* Tab: Kontrak */}
        <TabsContent value="kontrak">
          <div className="space-y-4">
            <InfoRow
              icon={<Calendar size={20} />}
              label="Kost"
              value={data.kost.name || "-"}
            />
            <InfoRow
              icon={<Calendar size={20} />}
              label="Kamar"
              value={data.kost.room}
            />
            <InfoRow
              icon={<Calendar size={20} />}
              label="Mulai Sewa"
              value={data.startDate}
            />
            <InfoRow
              icon={<Calendar size={20} />}
              label="Selesai Sewa"
              value={data.endDate}
            />
            <InfoRow label="Durasi" value={`${data.duration} bulan`} />
            <InfoRow
              label="Biaya Sewa"
              value={`Rp ${data.totalPrice.toLocaleString("id-ID")}`}
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex flex-col justify-center gap-4 pt-4">
        <Button
          className="w-full"
          variant="outline"
          onClick={() =>
            startChat({
              roomTypeId: data.kost.roomTypeId,
              tenantId: data.tenant.id,
            })
          }
        >
          Chat Penyewa
        </Button>

        {data.status === BookingStatus.ACTIVE && (
          <Button
            className="w-full"
            variant="destructive"
            onClick={() => setOpenStopModal(true)}
          >
            Hentikan Kontrak Sewa
          </Button>
        )}
      </div>
      <StopRentModal
        open={openStopModal}
        onClose={() => setOpenStopModal(false)}
        bookingId={bookingId}
      />
    </CardSection>
  );
};

export default TenantDetailCard;
