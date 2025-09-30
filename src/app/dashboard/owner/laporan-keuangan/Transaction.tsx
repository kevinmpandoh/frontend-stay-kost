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

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: 12000,
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: 700000,
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: 550000,
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: 127000,
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: 1200000,
    paymentMethod: "PayPal",
  },
];

export const Transaction = () => {
  return (
    <div className="mt-8 overflow-x-auto rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 font-semibold">Daftar Transaksi</h2>
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No. Invoice</TableHead>
            <TableHead className="w-[100px]">Nama Penyewa</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Jatuh Tempo</TableHead>
            <TableHead className="text-right">Total Tagihan</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell>{invoice.invoice}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 overflow-hidden rounded-full">
                    <Image
                      width={40}
                      height={40}
                      src={"/profile-default.png"}
                      alt={"FOTO"}
                    />
                  </div>
                  <div>
                    <span className="text-theme-sm block font-medium text-gray-800 dark:text-white/90">
                      Kevin Pandoh
                    </span>
                    <span className="text-theme-xs block text-gray-500 dark:text-gray-400">
                      Tes
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>{invoice.paymentStatus}</TableCell>
              <TableCell>{invoice.paymentMethod}</TableCell>
              <TableCell className="text-right">
                Rp {invoice.totalAmount.toLocaleString("id-ID")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
    </div>
  );
};
