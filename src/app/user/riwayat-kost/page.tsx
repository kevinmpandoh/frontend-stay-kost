import React from "react";
import BookingHistoryList from "@/features/booking/components/BookingHistoryList";

const page = () => {
  return (
    <>
      <div className="w-full">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">Riwayat Kost</h2>

        <BookingHistoryList />
      </div>
    </>
  );
};

export default page;
