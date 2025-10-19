"use client";

import { Button } from "@/components/ui/button";

import React, { useState } from "react";
import KonfirmasiModal from "./KonfirmasiModal";
import { useRoom } from "@/features/room/hooks/useRoom";

import Badge from "@/components/ui/badge2";
import Avatar from "@/components/ui/avatar2";

import { useChat } from "@/features/chat/hooks/useChat";
import { useOwnerBooking } from "@/features/booking/hooks/useOwnerBooking";
import { useOwnerKost } from "@/features/kost/hooks/useOwnerKost";

import Link from "next/link";
import { StatusBadge } from "@/components/common/StatusBadge";
import StatusFilter from "@/components/common/StatusFilter";
import SelectFilter from "@/components/common/SelectFilter";

import FilterBar from "@/components/common/FitlerBar";
import SearchInput from "@/components/common/SearchInput";
import { PaginationControls } from "@/components/common/Pagination";

const PengajuanSewaList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [modalType, setModalType] = useState<"terima" | "tolak" | null>(null);

  const { getAvaibleRooms } = useRoom(
    selectedBooking ? selectedBooking.kost.roomTypeId : "",
  );

  const { bookings, isLoading, approveBooking, rejectBooking } =
    useOwnerBooking();
  const { kostOwner, loadingKostOwner } = useOwnerKost();

  const statusList = [
    { key: "all", label: "Semua" },
    { key: "pending", label: "Butuh Konfirmasi" },
    { key: "waiting_for_payment", label: "Menunggu Pembayaran" },
    { key: "waiting_for_checkin", label: "Menunggu Check In" },
    { key: "completed", label: "Sewa Berakhir" },
    { key: "rejected", label: "Ditolak" },
    { key: "canclelled", label: "Dibatalkan" },
    { key: "expired", label: "Kadaluarsa" },
  ];

  const handleOpenModal = (data: any, type: "terima" | "tolak") => {
    setSelectedBooking(data);
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
    setModalType(null);
  };

  const handleConfirm = (data: any) => {
    if (!selectedBooking || !modalType) return;

    if (modalType === "terima") {
      approveBooking({
        id: selectedBooking.id,
        room: data.kamarId,
      });
    } else {
      rejectBooking({
        bookingId: selectedBooking.id,
        data: {
          rejectionReason: data.alasan,
        },
      });
    }

    handleCloseModal();
  };

  if (isLoading || loadingKostOwner) {
    return <h1>Loading..</h1>;
  }

  if (!bookings.data) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <h1 className="text-gray-500">Tidak ada pengajuan sewa</h1>
      </div>
    );
  }

  return (
    <>
      <FilterBar>
        <SearchInput />

        <SelectFilter
          paramKey="kostId"
          options={kostOwner.map((kost: any) => ({
            key: kost.id,
            label: kost.name,
          }))}
          placeholder="Semua Kost"
        />
      </FilterBar>
      <div className="mb-4">
        <StatusFilter statusList={statusList} paramKey="status" />
      </div>

      {bookings.data.length === 0 && (
        <div className="flex h-[120px] w-full items-center justify-center">
          <h1 className="text-gray-500">Tidak ada pengajuan sewa</h1>
        </div>
      )}

      {bookings.data.map((data: any, index: number) => (
        <div
          key={index}
          className="mb-6 w-full rounded-lg border border-gray-300 bg-white p-4 shadow sm:p-6"
        >
          <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
            <StatusBadge status={data.status} />
            {data.status === "pending" && (
              <Badge color={"warning"}>
                Konfirmasi sebelum {data.expireDate}
              </Badge>
            )}
          </div>
          {/* <div className="flex gap-4"> */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Avatar src={"/profile-default.png"} />
              <div>
                <span className="block text-base font-semibold text-gray-700 dark:text-gray-400">
                  {data.tenant.name}
                </span>
                <span className="mt-0.5 block text-sm text-gray-500 dark:text-gray-400">
                  {data.kost.namaKost}
                </span>
              </div>
            </div>

            <div className="mt-2 flex justify-between text-sm text-gray-600 sm:mt-0 sm:flex-row sm:items-center sm:gap-8">
              <div className="flex flex-col gap-2 border-gray-200 text-sm text-[#6b7280] sm:border-l-2 sm:px-10">
                <h3 className="text-sm font-semibold lg:text-lg">Mulai Sewa</h3>

                <span className="font-semibold text-[#374151]">
                  {data.tanggalMasuk}
                </span>
              </div>

              <div className="flex flex-col gap-2 border-gray-200 text-sm text-[#6b7280] sm:border-x-2 sm:px-10">
                <h3 className="text-lg font-semibold">Durasi</h3>

                <span className="font-semibold text-[#374151]">
                  {data.durasi} Bulan
                </span>
              </div>
            </div>
            <div className="mt-6 flex items-end justify-end gap-2 border-gray-200 text-sm text-[#6b7280]">
              <Button variant="ghost" asChild>
                <Link href={`pengajuan-sewa/${data.id}`}>Lihat Detail</Link>
              </Button>
              {data.status === "pending" && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => handleOpenModal(data, "tolak")}
                  >
                    Tolak
                  </Button>
                  <Button onClick={() => handleOpenModal(data, "terima")}>
                    Terima
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}

      {bookings.pagination && (
        <div className="mx-auto mt-10 mb-24 max-w-xl">
          <PaginationControls
            page={bookings.pagination.page}
            onPageChange={() => console.log("tes")}
            totalPages={bookings.pagination.totalPages}
          />
        </div>
      )}

      <KonfirmasiModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        type={modalType}
        kamarOptions={getAvaibleRooms} // nanti ganti sesuai booking terkait
      />
    </>
  );
};

export default PengajuanSewaList;
