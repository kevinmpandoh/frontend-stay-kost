"use client";
import { Button } from "@/components/ui/button";

import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import { BookingDetailModal } from "./BookingDetailModal";
import { useTenantBooking } from "../hooks/useTenantBooking";
import { Badge } from "@/components/ui/badge";

const BookingHistoryList = () => {
  const { bookingHistory, loadingHistory } = useTenantBooking();
  const [openModal, setOpenModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);

  if (loadingHistory) {
    return <h1>Loading...</h1>;
  }

  if (!bookingHistory || bookingHistory.length === 0) {
    return "Belum Ada";
  }

  return (
    <>
      <div className="space-y-6">
        {bookingHistory.map((data: any) => (
          <div
            key={data.id}
            className="flex w-full flex-col items-center rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-start"
          >
            <Link href={`/kosts/${data.kostTypeId}`}>
              <Image
                src={data.photo || "/kost.jpg"}
                width={120}
                height={90}
                alt="Room with bed and wooden door, bright yellow wall"
                className="h-36 w-40 flex-shrink-0 rounded-md object-cover"
              />
            </Link>
            <div className="mt-3 flex w-full flex-col sm:mt-0 sm:ml-4">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-normal text-gray-500">
                  {data.startDate} - {data.endDate} | {data.duration} Bulan
                </span>
              </div>
              <div className="mb-1 flex items-center space-x-2">
                <Badge variant={"outline"} className="capitalize">
                  {data.type}
                </Badge>
              </div>
              <h3 className="text-lg leading-tight font-semibold text-gray-900">
                {data.kostName}
              </h3>
              <div className="flex items-center gap-1">
                <MapPin size={18} />
                {data.address}
              </div>
              <div className="mt-3 space-x-4 self-end">
                <Button
                  variant={"ghost"}
                  onClick={() => {
                    setSelectedBooking(data);
                    setOpenModal(true);
                  }}
                >
                  Lihat Detail
                </Button>
                <Button>
                  <Link href={`/kosts/${data.roomTypeId}`}>Sewa Lagi</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedBooking && (
        <BookingDetailModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          data={{
            ...selectedBooking,
            imageUrl: selectedBooking.photo,
            checkInDate: selectedBooking.startDate,
            checkOutDate: selectedBooking.endDate,
          }}
        />
      )}
    </>
  );
};

export default BookingHistoryList;
