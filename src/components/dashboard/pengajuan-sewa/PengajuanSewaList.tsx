"use client";

import { Button } from "@/components/ui/button";

import React, { useEffect, useState } from "react";
import KonfirmasiModal from "./KonfirmasiModal";
import { useRoom } from "@/features/room/hooks/useRoom";
import { useRouter, useSearchParams } from "next/navigation";

import Badge from "@/components/ui/badge2";
import Avatar from "@/components/ui/avatar2";

import { useChat } from "@/features/chat/hooks/useChat";
import { useOwnerBooking } from "@/features/booking/hooks/useOwnerBooking";
import { useOwnerKost } from "@/features/kost/hooks/useOwnerKost";
import DetailPengajuanModal from "./DetailBookingModal";
import Link from "next/link";
import { StatusBadge } from "@/components/common/StatusBadge";
import StatusFilter from "@/components/common/StatusFilter";
import SelectFilter from "@/components/common/SelectFilter";
import SortSelect from "@/components/common/SortSelect";
import FilterBar from "@/components/common/FitlerBar";
import SearchInput from "@/components/common/SearchInput";
import { PaginationControls } from "@/components/common/Pagination";

const PengajuanSewaList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [modalType, setModalType] = useState<"terima" | "tolak" | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { getAvaibleRooms } = useRoom(
    selectedBooking ? selectedBooking.kost.roomTypeId : "",
  );

  const { bookings, isLoading, approveBooking, rejectBooking } =
    useOwnerBooking();
  const { kostOwner, loadingKostOwner } = useOwnerKost();

  const { getChatTenant } = useChat();

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
          className="mb-6 w-full rounded-lg border border-gray-300 bg-white p-6 shadow"
        >
          <div className="mb-4 flex items-start justify-between">
            <StatusBadge status={data.status} />
            {data.status === "pending" && (
              <Badge color={"warning"}>
                Konfirmasi sebelum {data.expireDate}
              </Badge>
            )}
          </div>
          {/* <div className="flex gap-4"> */}
          <div className="flex-1">
            <div className="flex justify-between">
              <div className="flex gap-4">
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

              <div className="mb-2 flex gap-10">
                <div className="flex flex-col gap-2 border-l-2 border-gray-200 px-10 text-sm text-[#6b7280]">
                  <h3 className="text-lg font-semibold">Mulai Sewa</h3>

                  <span className="font-semibold text-[#374151]">
                    {data.tanggalMasuk}
                  </span>
                </div>

                <div className="flex flex-col gap-2 border-l-2 border-gray-200 px-10 text-sm text-[#6b7280]">
                  <h3 className="text-lg font-semibold">Durasi</h3>

                  <span className="font-semibold text-[#374151]">
                    {data.durasi} Bulan
                  </span>
                </div>

                <div className="flex items-center justify-center gap-2 border-l-2 border-gray-200 px-10 text-sm text-[#6b7280]">
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
