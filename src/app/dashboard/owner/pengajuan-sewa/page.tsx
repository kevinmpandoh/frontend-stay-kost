import PageHeader from "@/components/common/PageHeader";
import PengajuanSewaList from "@/components/dashboard/pengajuan-sewa/PengajuanSewaList";

import React from "react";

const PengajuanSewaPage = () => {
  return (
    <>
      <PageHeader title="Pengajuan Sewa" />

      <PengajuanSewaList />
    </>
  );
};

export default PengajuanSewaPage;
