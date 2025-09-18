import React from "react";
import BookingHistoryList from "@/features/booking/components/BookingHistoryList";

const page = () => {
  return (
    <>
      <div className="w-full">
        <h1 className="mb-6 text-base font-bold text-gray-900 select-none">
          Riwayat Kost
        </h1>

        <BookingHistoryList />
      </div>
    </>
  );
};

export default page;
