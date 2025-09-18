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

const TableBillingAdmin = ({ invoices }: { invoices: any }) => {
  return (
    <>
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead className="w-[100px]">No. Invoice</TableHead>
            <TableHead className="w-[100px]">Pengguna</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Keterangan</TableHead>
            <TableHead>Jatuh Tempo</TableHead>
            <TableHead className="text-right">Total Tagihan</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice: any, index: number) => (
            <TableRow key={invoice.invoiceNumber}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{invoice.invoiceNumber}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 overflow-hidden rounded-full">
                    <Image
                      width={40}
                      height={40}
                      src={invoice.user?.photo || "/profile-default.png"}
                      alt="Foto Penyewa"
                    />
                  </div>
                  <div>
                    <span className="text-theme-sm block font-medium text-gray-800 dark:text-white/90">
                      {invoice.user?.name ?? "-"}
                    </span>
                    <span className="text-theme-xs block text-gray-500 dark:text-gray-400">
                      {/* Opsional: Email atau no kamar */}
                      &nbsp;
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>{invoice.status}</TableCell>
              <TableCell>
                {/* {billing.is_late
                      ? `${billing.days_late || 0} hari terlambat`
                      : billing.is_due_today
                      ? "Jatuh Tempo Hari Ini"
                      : "-"} */}

                {invoice.isDueToday ? (
                  <span className="text-yellow-600 dark:text-yellow-400">
                    Jatuh tempo hari ini
                  </span>
                ) : invoice.isLate ? (
                  <span className="text-red-600 dark:text-red-400">
                    Terlambat {invoice.daysLate} hari
                  </span>
                ) : (
                  <span className="text-gray-800 dark:text-white/90">
                    Tenggat {invoice.daysRemaining} hari lagi
                  </span>
                )}
              </TableCell>
              <TableCell>{invoice.dueDate}</TableCell>
              <TableCell className="text-right">
                Rp {invoice.amount?.toLocaleString("id-ID") || "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default TableBillingAdmin;
