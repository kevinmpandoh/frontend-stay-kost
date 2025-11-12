import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Image from "next/image";
import React from "react";

const TableBillingOwner = ({
  billings,
  status,
}: {
  billings: any;
  status: string;
}) => {
  return (
    <>
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            {/* <TableHead className="w-[100px]">No. Invoice</TableHead> */}
            <TableHead className="w-[100px]">Penyewa</TableHead>
            <TableHead>Kost</TableHead>
            <TableHead>Pembayaran</TableHead>
            {status === "unpaid" && (
              <>
                <TableHead>Jatuh Tempo</TableHead>
                <TableHead>Keterlambatan</TableHead>
              </>
            )}
            {status === "paid" && (
              <>
                <TableHead>Tanggal Pembayaran</TableHead>
              </>
            )}
            <TableHead className="text-right">Total Tagihan</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {billings.map((billing: any) => (
            <TableRow key={billing.id}>
              {/* <TableCell>{billing.invoice}</TableCell> */}
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 overflow-hidden rounded-full">
                    <Image
                      width={40}
                      height={40}
                      src={billing.tenant.photo || "/profile-default.png"}
                      alt={"FOTO"}
                    />
                  </div>
                  <div>
                    <span className="text-theme-sm block font-medium text-gray-800 dark:text-white/90">
                      {billing.tenant.name}
                    </span>
                    <span className="text-theme-xs block text-gray-500 dark:text-gray-400">
                      {billing.tenant?.phone || billing.tenant.email}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div>
                    <span className="text-theme-sm block font-medium text-gray-800 dark:text-white/90">
                      {billing.kost.name} - {billing.kost.roomType}
                    </span>
                    <span className="text-theme-xs block text-gray-500 dark:text-gray-400">
                      {billing.kost.numberRoom} {billing.kost.floor}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {billing.status === "paid" && billing.payout ? (
                  <>
                    {billing.payout.status === "pending" ? (
                      <Badge className="bg-warning-500 text-sm">
                        Menunggu proses Admin
                      </Badge>
                    ) : billing.payout.status === "processed" ? (
                      <Badge className="bg-warning-500 text-sm">
                        Sedang diproses Admin
                      </Badge>
                    ) : billing.payout.status === "failed" ? (
                      <Badge className="bg-error-500 text-sm">Gagal</Badge>
                    ) : billing.payout.status === "success" ? (
                      <Badge className="bg-success-500 text-sm">
                        Sudah di transfer ke rekening Anda
                      </Badge>
                    ) : billing.payout.status ? (
                      <Badge className="bg-success-500 text-sm">
                        {billing.payout.status}
                      </Badge>
                    ) : (
                      "-"
                    )}
                  </>
                ) : (
                  <Badge className="bg-error-500 text-sm">Belum Bayar</Badge>
                )}
              </TableCell>

              {status === "unpaid" && (
                <>
                  <TableCell>{billing.dueDate}</TableCell>
                  <TableCell>
                    {/* {billing.is_late
                      ? `${billing.days_late || 0} hari terlambat`
                      : billing.is_due_today
                      ? "Jatuh Tempo Hari Ini"
                      : "-"} */}

                    {billing.isDueToday ? (
                      <Badge className="bg-warning-100 text-warning-600 text-sm">
                        Jatuh tempo hari ini
                      </Badge>
                    ) : // <span className="text-yellow-600 dark:text-yellow-400">
                    //   Jatuh tempo hari ini
                    // </span>
                    billing.isLate ? (
                      <Badge className="bg-error-100 text-error-600 dark:text-error-400 text-sm">
                        Terlambat {billing.daysLate} hari
                      </Badge>
                    ) : (
                      <Badge className="text-gray-800 dark:text-white/90">
                        Tenggat {billing.daysRemaining} hari lagi
                      </Badge>
                    )}
                  </TableCell>
                </>
              )}

              {status === "paid" && (
                <>
                  <TableCell>
                    {/* Misalnya pakai billing.paidAt atau billing.updatedAt */}
                    {billing.dueDate ?? "-"}
                  </TableCell>
                </>
              )}

              <TableCell className="text-right">
                Rp {billing.total.toLocaleString("id-ID")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default TableBillingOwner;
