"use client";
import React from "react";
import TableBillingOwner from "./TableBillingOwner";
import { useOwnerInvoice } from "@/features/invoice/hooks/useOwnerInvoice";
import { useRouter, useSearchParams } from "next/navigation";

import PageHeader from "@/components/common/PageHeader";
import SearchInput from "@/components/common/SearchInput";

import MonthFilter from "@/components/common/MonthFilter";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";

const BillingOwner = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const status = searchParams.get("status") || "unpaid";

  const search = searchParams.get("search") || "";
  const monthParam = searchParams.get("month") || ""; // format "2025-06"

  const { billings, loadingBillings } = useOwnerInvoice({
    status,
    search,
    month: monthParam,
  });

  const handleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all" || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`?${params.toString()}`);
  };

  if (loadingBillings) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="text-gray-500">Memuat data tagihan...</span>
      </div>
    );
  }

  const payoutIssue = billings?.find(
    (b: any) => b.status === "paid" && b.payout?.visibleFailedReason,
  ) as any;

  console.log("PAYOUT ISSUE:", payoutIssue);
  console.log("BILLINGS:", billings);

  return (
    <>
      <PageHeader title="Tagihan Sewa Kost" />

      <div className="mb-4 flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
        <SearchInput />

        {/* Month Picker */}
        <MonthFilter paramKey="month" placeholder="Pilih Bulan" />
      </div>
      <div className="overflow-x-auto rounded-lg bg-white p-6">
        {/* 🚨 Alert jika ada payout bermasalah */}
        {payoutIssue && (
          <div className="mb-6">
            <Alert
              variant="warning"
              className="border-warning-300 bg-warning-50 text-warning-600"
            >
              <TriangleAlert className="h-6 w-6" />
              <AlertTitle className="text-lg font-semibold">
                Ada masalah dengan pencairan pembayaran tagihan ini
              </AlertTitle>
              <AlertDescription>
                {payoutIssue.payout.visibleFailedReason}
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Filter & Pencarian */}
        <div className="flex flex-wrap items-center gap-2">
          {["unpaid", "paid"].map((s) => (
            <button
              key={s}
              onClick={() => handleFilter("status", s)}
              className={`rounded border-2 px-3 py-1 font-semibold ${
                status === s
                  ? "bg-primary border-primary text-white"
                  : "border-gray-300 text-[#5e6c84]"
              }`}
            >
              {s === "all"
                ? "Semua"
                : s === "unpaid"
                  ? "Belum Bayar"
                  : "Sudah Bayar"}
            </button>
          ))}
        </div>

        {/* Tabel Tagihan */}
        {!billings || billings.length === 0 ? (
          <div className="mt-6 text-center text-gray-500">
            Tidak ada data tagihan
          </div>
        ) : (
          <div className="mt-6">
            <TableBillingOwner billings={billings} status={status} />
          </div>
        )}
      </div>
    </>
  );
};

export default BillingOwner;
