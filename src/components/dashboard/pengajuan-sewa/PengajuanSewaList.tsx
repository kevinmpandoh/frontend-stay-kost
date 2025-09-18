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

const PengajuanSewaList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [modalType, setModalType] = useState<"terima" | "tolak" | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "all";
  const itemsPerPage = 5;
  const [daftarKost, setDaftarKost] = useState<any[]>([]);
  const [selectedKostId, setSelectedKostId] = useState<string | null>(null);

  const { getAvaibleRooms } = useRoom(
    selectedBooking ? selectedBooking.kost.roomTypeId : "",
  );

  const { bookings, isLoading, approveBooking, rejectBooking } =
    useOwnerBooking();
  const { kostOwner, loadingKostOwner } = useOwnerKost();

  const { getChatTenant } = useChat();

  const router = useRouter();

  const currentStatus = searchParams.get("status") || "all";

  useEffect(() => {
    setCurrentPage(1);
  }, [bookings]);
  useEffect(() => {
    if (kostOwner) {
      setDaftarKost(kostOwner);
    }
  }, [kostOwner]);

  const handleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`?${params.toString()}`);
  };

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

  const handleKostSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const kostId = e.target.value;

    if (kostId === "all") {
      setSelectedKostId(null);
    } else {
      setSelectedKostId(kostId);
    }

    const params = new URLSearchParams(searchParams.toString());
    if (kostId === "all") {
      params.delete("kostId");
    } else {
      params.set("kostId", kostId);
    }

    router.push(`?${params.toString()}`);
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

  const filteredBooking = selectedKostId
    ? bookings?.filter((b: any) => b.kost.kostId === selectedKostId)
    : bookings;

  if (isLoading) {
    return <h1>Loading..</h1>;
  }

  const paginatedBooking = filteredBooking.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  const totalPages = Math.ceil(bookings.length / itemsPerPage);

  if (!bookings) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <h1 className="text-gray-500">Tidak ada pengajuan sewa</h1>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4 flex items-start sm:items-center">
        <div className="flex w-full flex-wrap items-center gap-2">
          {statusList.map((statusItem) => (
            <button
              key={statusItem.key}
              onClick={() => handleFilter("status", statusItem.key)}
              className={`rounded border-2 px-2.5 py-1 font-semibold ${
                currentStatus === statusItem.key ||
                (statusItem.key === "all" && !searchParams.get("status"))
                  ? "bg-primary border-primary text-white"
                  : "border-gray-300 text-[#5e6c84]"
              }`}
            >
              {statusItem.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1>Cari berdasarkan Kost</h1>

        {/* Select Input */}
        <select
          onChange={handleKostSelect}
          value={selectedKostId || "all"}
          className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-[14px] text-gray-700 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none sm:w-[300px]"
        >
          <option value="all">Semua Kost</option>
          {daftarKost.map((kost) => (
            <option key={kost.id} value={kost.id}>
              {kost.name}
            </option>
          ))}
        </select>
      </div>

      {bookings.length === 0 && (
        <div className="flex h-[120px] w-full items-center justify-center">
          <h1 className="text-gray-500">Tidak ada pengajuan sewa</h1>
        </div>
      )}

      {paginatedBooking.map((data: any, index: number) => (
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

      <div className="mt-6 flex items-center justify-center gap-2">
        <Button
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Sebelumnya
        </Button>

        <span className="text-sm text-gray-600">
          Halaman {currentPage} dari {totalPages}
        </span>

        <Button
          variant="outline"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Selanjutnya
        </Button>
      </div>

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
