"use client";

import React from "react";
// import { BillingHistory } from "./BillingHistory";
// import ManageKost from "./ManageKost";
import Chart from "./Chart";
import { Calendar, CreditCard, DoorClosed, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboard } from "@/features/dashboard/hooks/useDashboard";
import StatCard from "../owner/StatCard";
import { PayoutHistory } from "./PayoutHistory";
// import { useDashboard } from "@/features/dashboard/hooks/useDashboard";

const DashboardAdmin = () => {
  const { adminDashboard } = useDashboard();
  const { data, isLoading, isError } = adminDashboard;

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-32" />
        <div className="flex flex-wrap gap-4">
          <Skeleton className="h-[100px] w-[200px]" />
          <Skeleton className="h-[100px] w-[200px]" />
          <Skeleton className="h-[100px] w-[200px]" />
          <Skeleton className="h-[100px] w-[200px]" />
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return <div className="text-red-500">Gagal memuat data dashboard.</div>;
  }
  return (
    <>
      <h2 className="mb-6 text-xl font-bold">Beranda</h2>
      <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Calendar}
          iconBg="text-primary-600"
          title="Total Pengajuan Kost"
          value={data.totalKostRequest}
          description=""
        />
        <StatCard
          icon={CreditCard}
          iconBg="text-amber-400"
          title="Total Penyewa"
          value={data.totalTenants}
          description=""
        />
        <StatCard
          icon={User}
          iconBg="text-green-700"
          title="Total Pemilik Kost"
          value={data.totalOwners}
          description=""
        />
        <StatCard
          icon={DoorClosed}
          iconBg="text-sky-400"
          title="Total Kost Aktif"
          value={data.totalKostActive}
          description=""
        />
      </section>
      <section className="flex flex-col gap-6 lg:flex-row">
        <Chart data={data.pendapatan_per_bulan} />
        {/* <ManageKost /> */}
      </section>

      <PayoutHistory data={data?.payoutHistory} />
    </>
  );
};

export default DashboardAdmin;
