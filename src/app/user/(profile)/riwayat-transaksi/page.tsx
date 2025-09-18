import React from "react";
import TenantPaymentList from "@/features/payment/components/TenantPaymentList";

const page = () => {
  return (
    <>
      <h2 className="mb-6 text-lg font-semibold">Riwayat Transaksi</h2>

      <TenantPaymentList />
    </>
  );
};

export default page;
