"use client";

import React from "react";

import { Calendar, CreditCard, DoorClosed, User } from "lucide-react";
import StatCard from "../../../../components/common/StatCard";
import { Transaction } from "./Transaction";
import PageHeader from "@/components/common/PageHeader";

const LaporanKeuanganPage = () => {
  return (
    <>
      <PageHeader title="Keuangan" />
      <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Calendar}
          iconBg="text-brand-600"
          title="Total Pendapatan"
          value={100}
        />
        <StatCard
          icon={DoorClosed}
          iconBg="text-sky-400"
          title="Belum Bayar"
          value={5}
        />
        <StatCard
          icon={CreditCard}
          iconBg="text-amber-400"
          title="Diterima dari aplikasi"
          value={1200}
        />
        <StatCard
          icon={User}
          iconBg="text-green-700"
          title="Diterima dari penyewa"
          value={3}
        />
      </section>
      <section className="flex flex-col gap-6 lg:flex-row">
        {/* <StatisticsChart /> */}
      </section>
      <Transaction />
    </>
  );
};

export default LaporanKeuanganPage;
