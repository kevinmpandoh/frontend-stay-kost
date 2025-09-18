"use client";

import React from "react";
import { BillingHistory } from "./BillingHistory";
import ManageKost from "./ManageKost";
import Chart from "./Chart";
import StatCard from "./StatCard";
import { Calendar, CreditCard, DoorClosed, User } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { useDashboard } from "@/features/dashboard/hooks/useDashboard";

const DashboardOwner = () => {
  const { ownerDashboard } = useDashboard();

  const { data, isLoading, isError } = ownerDashboard;

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
          title="Total Pengajuan"
          value={data.totalRequest}
          description="Jumlah pengajuan sewa penyewa"
        />
        <StatCard
          icon={CreditCard}
          iconBg="text-amber-400"
          title="Total Belum Bayar"
          value={`Rp ${data.totalUnpaid?.totalAmount?.toLocaleString("id-ID") ?? 0} `}
          description={`${data.totalUnpaid.totalInvoices ? data.totalUnpaid.totalInvoices + " tagihan belum dibayar" : "Tidak ada tagihan belum dibayar"}`}
        />
        <StatCard
          icon={User}
          iconBg="text-green-700"
          title="Total Penyewa"
          value={data.activeTenants}
          description="Jumlah penyewa aktif saat ini"
        />
        <StatCard
          icon={DoorClosed}
          iconBg="text-sky-400"
          title="Total Kamar"
          value={data.rooms.total}
          description="Jumlah total kamar yang tersedia"
        />
      </section>

      <section className="flex flex-col gap-6 lg:flex-row">
        <Chart data={data.monthlyRevenue} />
        <ManageKost
          jumlahPengajuanSewa={data.rentRequests}
          jumlahPengajuanBerhenti={data.stopRequests}
          jumlahTagihanBelumDibayar={data.unpaidInvoices.length}
        />
      </section>

      <BillingHistory data={data?.unpaidInvoices} />
    </>
  );
};

export default DashboardOwner;
