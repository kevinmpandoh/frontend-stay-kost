"use client";
import React from "react";
import TenantCard from "./TenantCard";
import SearchInput from "@/components/common/SearchInput";
import { useQuery } from "@tanstack/react-query";
import { bookingService } from "@/features/booking/booking.service";

const TenantList = () => {
  const { data: activeBooking, isLoading: loadingActive } = useQuery({
    queryKey: ["bookingActive"],
    queryFn: bookingService.getActiveOwnerBooking,
  });

  if (loadingActive) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="text-gray-500">Memuat data penyewa...</span>
      </div>
    );
  }

  if (!activeBooking || activeBooking.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="text-gray-500">Tidak ada penyewa aktif saat ini.</span>
      </div>
    );
  }
  return (
    <>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput placeholder="Cari penyewa..." />
        {/* <Button size={"lg"}>Tambah Penyewa</Button> */}
      </div>

      {activeBooking.map((booking: any, index: number) => (
        <TenantCard key={index} booking={booking} />
      ))}
    </>
  );
};

export default TenantList;
