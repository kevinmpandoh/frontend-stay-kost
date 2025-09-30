import React from "react";
import TenantList from "./TenantList";
import PageHeader from "@/components/common/PageHeader";

const page = () => {
  return (
    <>
      <PageHeader title="Kelola Penyewa" />

      <TenantList />
    </>
  );
};

export default page;
