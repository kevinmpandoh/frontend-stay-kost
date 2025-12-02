"use client";
import RentalRequestCard from "@/features/booking/components/RentalRequestCard";
import { useTenantBooking } from "@/features/booking/hooks/useTenantBooking";
import { useConfirm } from "@/hooks/useConfirmModal";

import React from "react";

const PengajuanSewaPage = () => {
  const { booking, isLoading, cancelBooking, checkIn } = useTenantBooking();
  const confirm = useConfirm();

  console.log(booking);

  if (isLoading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  if (!booking || booking.length === 0) {
    return <p className="text-gray-500">Belum ada pengajuan sewa.</p>;
  }

  const handleCancel = async (id: string) => {
    const ok = await confirm({
      title: "Batalkan Pengajuan Kost",
      description: `Apakah Anda yakin ingin membatalkan pengajuan kost?`,
      confirmText: "Batalkan",
      cancelText: "Batal",
    });

    if (ok) {
      cancelBooking.mutate(id);
    }
  };

  const handleCheckIn = async (id: string) => {
    const ok = await confirm({
      title: "Konfirmasi Check-In",
      description:
        "Apakah Anda yakin ingin melakukan check-in sekarang? Pastikan Anda sudah berada di lokasi kost.",
      confirmText: "Check-In Sekarang",
      cancelText: "Batal",
    });

    if (ok) {
      checkIn(id);
    }
  };
  return (
    <>
      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        Pengajuan Sewa Saya
      </h2>

      {booking?.map((item: any) => (
        <RentalRequestCard
          key={item.id}
          data={item}
          onCancel={handleCancel}
          onCheckIn={handleCheckIn}
        />
      ))}
    </>
  );
};

export default PengajuanSewaPage;
