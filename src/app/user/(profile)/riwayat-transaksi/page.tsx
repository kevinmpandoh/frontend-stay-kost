import React from "react";
import TenantPaymentList from "@/features/payment/components/TenantPaymentList";

const page = () => {
  return (
    <>
      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        Riwayat Transaksi
      </h2>

      <TenantPaymentList />
    </>
  );
};

export default page;
