"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { useBooking } from "@/features/booking/hooks/useBooking";
import { useParams } from "next/navigation";
import { BookingStatus } from "@/features/booking/types/booking.type";
import { useState } from "react";
import KonfirmasiModal from "@/components/dashboard/pengajuan-sewa/KonfirmasiModal";
import { useOwnerBooking } from "@/features/booking/hooks/useOwnerBooking";
import { useRoom } from "@/features/room/hooks/useRoom";
import { useChat } from "@/features/chat/hooks/useChat";

export default function PengajuanDetailPage() {
  const { id } = useParams(); // ambil bookingId dari URL
  const { getDetailBooking } = useBooking(id as string);
  const [modalType, setModalType] = useState<"terima" | "tolak" | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, isError } = getDetailBooking;

  const { rejectBooking, approveBooking } = useOwnerBooking(id as string);
  const { getAvaibleRooms } = useRoom(data?.kost?.roomTypeId || "");

  const { startChat } = useChat();

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  if (isError || !data) {
    return <div className="p-6 text-red-500">Gagal memuat data</div>;
  }

  const handleConfirm = (data: any) => {
    if (!modalType) return;

    if (modalType === "terima") {
      approveBooking({
        id: id as string,
        room: data.kamarId,
      });
    } else {
      rejectBooking({
        bookingId: id as string,
        data: {
          rejectionReason: data.alasan,
        },
      });
    }

    handleCloseModal();
  };
  const handleOpenModal = (type: "terima" | "tolak") => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);

    setModalType(null);
  };

  return (
    <div className="p-0 md:p-6">
      {/* Header */}
      <div className="mb-4 flex items-center gap-2 md:mb-6">
        <Link href=".">
          <Button variant="ghost" size="icon" asChild>
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-semibold md:text-2xl">
          Detail Pengajuan Sewa
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* Kiri */}
        <div className="space-y-8 lg:col-span-3">
          {/* Info Kost */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Properti yang Dipesan</h2>
            <div className="relative h-52 w-full max-w-xs overflow-hidden rounded-lg border">
              <Image
                src={data.kost.photo || "/kost.jpg"}
                alt="Foto Kost"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700">
                {data.kost.name}, {data.kost.room}
              </p>
              <p className="text-lg text-gray-500">
                Rp{data.totalPrice} / Bulan
              </p>
            </div>
          </section>
          <div className="border-t" />

          {/* Info Penyewa */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Penyewa</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{data.tenant.name}</p>
                <p className="text-sm text-gray-500">
                  {data.tenant?.phone || "-"}
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() =>
                  startChat({
                    roomTypeId: data.kost.roomTypeId,
                    tenantId: data.tenant.id,
                  })
                }
              >
                Chat
              </Button>
            </div>
            {/* <div>
              <p className="text-sm text-gray-500">Alasan:</p>
              <p>-</p>
            </div> */}
            {/* Profil detail */}
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <p className="font-medium text-gray-700">Jenis Kelamin</p>
                <p>{data.tenant?.gender || "-"}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Pekerjaan</p>
                <p>{data.tenant.job || "-"}</p>
              </div>

              <div>
                <p className="font-medium text-gray-700">Kontak Darurat</p>
                <p>{data.tenant.emergencyContact || "-"}</p>
              </div>
            </div>
          </section>
          <div className="border-t" />

          {/* Dokumen */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Kelengkapan Dokumen</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">KTP</p>
                <div className="relative h-40 w-full overflow-hidden rounded-lg border">
                  <Image
                    src="/dokumen-ktp.jpg"
                    alt="KTP"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Kartu Mahasiswa</p>
                <div className="relative h-40 w-full overflow-hidden rounded-lg border">
                  <Image
                    src="/dokumen-kartu.jpg"
                    alt="Kartu Mahasiswa"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Kanan - Sticky Card */}
        <div className="lg:col-span-2">
          <div className="sticky top-6 space-y-4">
            <Card className="shadow-md">
              <CardContent className="space-y-4 px-6 py-4">
                <h2 className="text-xl font-semibold">Informasi Penyewaan</h2>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>
                    Waktu Pemesanan:{" "}
                    <span className="text-lg font-medium">
                      {data.createdAt}
                    </span>
                  </p>
                  <p>
                    Mulai Sewa:{" "}
                    <span className="text-lg font-medium">
                      {data.startDate}
                    </span>
                  </p>
                  <p>
                    Sewa Berakhir:{" "}
                    <span className="text-lg font-medium">{data.endDate}</span>
                  </p>
                  <p>
                    Durasi:{" "}
                    <span className="text-lg font-medium">{data.duration}</span>
                  </p>
                </div>
              </CardContent>
            </Card>

            {data.status === BookingStatus.PENDING && (
              <div className="flex gap-2">
                <Button
                  className="flex-1"
                  variant="outline"
                  size={"lg"}
                  onClick={() => handleOpenModal("tolak")}
                >
                  Tolak
                </Button>
                <Button
                  className="flex-1"
                  size={"lg"}
                  onClick={() => handleOpenModal("terima")}
                >
                  Terima
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <KonfirmasiModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        type={modalType}
        kamarOptions={getAvaibleRooms} // nanti ganti sesuai booking terkait
      />
    </div>
  );
}
