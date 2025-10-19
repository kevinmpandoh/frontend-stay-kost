"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { format } from "date-fns";
import { id } from "date-fns/locale";
import { cn } from "@/lib/utils";

import { PayoutDetailDialog } from "./PayoutDetailDialog";

import Image from "next/image";
import { findPaymentMethod } from "@/utils/findPaymentMethod";
import PageHeader from "@/components/common/PageHeader";
import { useAdminPayouts } from "@/features/payout/hooks/useAdminPayout";
import { Badge } from "@/components/ui/badge";
import { useConfirm } from "@/hooks/useConfirmModal";
import FilterBar from "@/components/common/FitlerBar";
import SearchInput from "@/components/common/SearchInput";
import StatusFilter from "@/components/common/StatusFilter";

const statusList = [
  { key: "all", label: "Semua" },
  { key: "pending", label: "Pending" },
  { key: "processed", label: "Sedang di proses" },
  { key: "failed", label: "Gagal" },
];

const AdminPayout = () => {
  const [selectedDetail, setSelectedDetail] = useState<any | null>(null);

  const { payouts, isLoading, retryPayout } = useAdminPayouts();
  const confirm = useConfirm();

  const handleRetryPayout = async (payoutId: string) => {
    const ok = await confirm({
      title: "Kirim Pembayaran ke Pemilik Kost?",
      description: `Apakah Anda yakin ingin mengirim payout ke pemilik kost?`,
      confirmText: "Terima",
      cancelText: "Batal",
    });

    if (ok) {
      retryPayout.mutate(payoutId, {
        onSuccess: () => {
          setSelectedDetail(null);
        },
      });
    }
  };

  return (
    <>
      <PageHeader title="Payout ke Pemilik Kost" />

      <FilterBar>
        <SearchInput />
        <StatusFilter statusList={statusList} />
      </FilterBar>

      {isLoading && <h1>Loading</h1>}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Invoice Payout</TableHead>
            <TableHead>Pemilik Kost</TableHead>
            <TableHead>Rekening</TableHead>
            <TableHead>Tanggal Payout</TableHead>
            <TableHead>Jumlah</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payouts?.data?.map((payout: any, index: number) => {
            const rekeningLengkap =
              payout?.method &&
              payout?.channel &&
              payout.accountName &&
              payout.accountNumber;
            const status = payout.status;

            const selectedMethod = findPaymentMethod(
              payout.channel || payout.method,
            );

            return (
              <TableRow
                key={payout._id}
                onClick={() => {
                  setSelectedDetail(payout);
                }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{payout.payoutNumber ?? "-"}</TableCell>
                <TableCell>
                  {" "}
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded-full">
                      <Image
                        width={40}
                        height={40}
                        src={payout.owner?.photo || "/profile-default.png"}
                        alt="Foto Penyewa"
                      />
                    </div>
                    <div>
                      <span className="text-theme-sm block font-medium text-gray-800 dark:text-white/90">
                        {payout.owner?.name ?? "-"}
                      </span>
                      <span className="text-theme-xs block text-gray-500 dark:text-gray-400">
                        {payout.owner?.email ?? "-"}
                        &nbsp;
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {rekeningLengkap && (
                    <>
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 overflow-hidden">
                          <Image
                            width={150}
                            height={150}
                            src={selectedMethod?.logo || "/profile-default.png"}
                            alt="Foto Penyewa"
                          />
                        </div>
                        <div>
                          <span className="text-theme-sm block font-medium text-gray-800 dark:text-white/90">
                            {payout.accountName ?? "-"}
                          </span>
                          <span className="block text-base text-gray-500 dark:text-gray-400">
                            {payout.accountNumber ?? "-"}
                            &nbsp;
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </TableCell>
                <TableCell>
                  {format(new Date(payout.requestedAt), "dd MMM yyyy", {
                    locale: id,
                  })}
                </TableCell>
                <TableCell>
                  Rp{" "}
                  {payout.netAmount?.toLocaleString("id-ID", {
                    minimumFractionDigits: 0,
                  })}
                </TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      "text-sm capitalize",
                      status === "success" && "bg-green-100 text-green-700",
                      status === "failed" && "bg-red-100 text-red-700",
                      status === "pending" && "bg-yellow-100 text-yellow-700",
                      status === "processed" && "bg-blue-100 text-blue-700",
                    )}
                  >
                    {status}
                  </Badge>
                </TableCell>
              </TableRow>
            );
          })}
          {!payouts?.data?.length && (
            <TableRow>
              <TableCell colSpan={8} className="py-4 text-center text-black">
                Tidak ada data payout saat ini.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <PayoutDetailDialog
        open={!!selectedDetail}
        onClose={() => setSelectedDetail(null)}
        data={selectedDetail}
        onRetry={handleRetryPayout}
        loading={retryPayout.isPending}
      />
    </>
  );
};

export default AdminPayout;
