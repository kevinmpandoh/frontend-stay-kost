import RentalRequestList from "@/features/booking/components/RentalRequestList";

import React from "react";

const PengajuanSewaPage = () => {
  return (
    <>
      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        Pengajuan Sewa Saya
      </h2>

      <RentalRequestList />
    </>
  );
};

export default PengajuanSewaPage;
