"use client";
import React, { useMemo } from "react";
import TableBillingAdmin from "./TableBillingAdmin";

import { useInvoiceAdmin } from "@/features/invoice/hooks/useInvoiceAdmin";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "lucide-react";
import SimpleMonthPicker from "../../../../components/common/MonthPicker";
import { useRouter, useSearchParams } from "next/navigation";
import { format, parse } from "date-fns";
import { id } from "date-fns/locale";
import SearchInput from "@/components/common/SearchInput";
import PageHeader from "@/components/common/PageHeader";
import { EmptyState } from "@/components/common/EmptyState copy 2";
import StatusFilter from "@/components/common/StatusFilter";

const BillingAdmin = () => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const monthParam = searchParams.get("month") || ""; // format "2025-06"

  const { invoices, loadingInvoices } = useInvoiceAdmin();

  const selectedMonth = useMemo(() => {
    if (!monthParam) return new Date(); // bulan ini
    const parsed = parse(monthParam, "yyyy-MM", new Date());
    return isNaN(parsed.getTime()) ? new Date() : parsed;
  }, [monthParam]);

  const handleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all" || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`?${params.toString()}`);
  };

  const handleMonthSelect = (date: Date) => {
    const formatted = format(date, "yyyy-MM");
    handleFilter("month", formatted);
  };

  if (loadingInvoices) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="text-gray-500">Memuat data penyewa...</span>
      </div>
    );
  }

  return (
    <>
      <PageHeader title="Tagihan Sewa" />
      {/* <h1 className="mb-4 text-2xl font-bold">Tagihan Sewa</h1> */}

      <div className="rounded-lg bg-white p-6">
        <div className="mb-4 flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
          <SearchInput placeholder="Cari nama penyewa..." />
          <StatusFilter
            statusList={[
              { key: "all", label: "Semua" },
              { key: "unpaid", label: "Belum Bayar" },
              { key: "paid", label: "Sudah Bayar" },
            ]}
          />

          {/* Month Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex w-full items-center justify-between rounded-md border px-4 py-2 text-base text-gray-700 hover:bg-gray-100 md:w-[300px]">
                <span>
                  {selectedMonth
                    ? format(selectedMonth, "MMMM yyyy", { locale: id })
                    : "Pilih Bulan"}
                </span>
                <Calendar className="ml-2 h-5 w-5 text-gray-500" />
              </button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-auto p-2">
              <SimpleMonthPicker
                selectedDate={selectedMonth ?? undefined}
                onSelect={handleMonthSelect}
              />
            </PopoverContent>
          </Popover>
        </div>

        {!invoices || invoices.length === 0 ? (
          <EmptyState />
        ) : (
          <TableBillingAdmin invoices={invoices} />
        )}
      </div>
    </>
  );
};

export default BillingAdmin;
