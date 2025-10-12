// components/user/RentalRequestList.tsx
"use client";

import React from "react";
import RentalRequestCard from "./RentalRequestCard";
import { useTenantBooking } from "../hooks/useTenantBooking";

const RentalRequestList = () => {
  const { booking, isLoading } = useTenantBooking();

  if (isLoading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  if (!booking || booking.length === 0) {
    return <p className="text-gray-500">Belum ada pengajuan sewa.</p>;
  }

  return (
    <>
      {booking?.map((item: any) => (
        <RentalRequestCard
          key={item?.id}
          id={item?.id}
          kostId={item?.kostId}
          date={item?.tanggalDiajukan}
          status={item?.status}
          kostName={item?.namaKost}
          address={item?.address}
          category={item?.jenisKost}
          checkInDate={item?.tanggalMasuk}
          checkOutDate={item?.tanggalKelaur}
          duration={item?.durasi}
          imageUrl={item?.fotoKamar}
          price={item?.harga}
          paymentDeadline={item?.paymentDeadline}
          invoiceUnpaid={item?.invoiceUnpaid}
          reason={item?.rejectReason}
          note={item?.note}
        />
      ))}
    </>
  );
};

export default RentalRequestList;
