"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface BillingItem {
  tenant: string;
  roomType: string;
  room: string;
  amount: number;
  dueDate: string;
  invoiceNumber: string;
}

export const BillingHistory = ({
  data,
}: {
  data: BillingItem[] | undefined;
}) => {
  const total = data?.reduce((acc, item) => acc + item.amount, 0) ?? 0;

  return (
    <div className="mt-8 overflow-x-auto rounded-lg bg-white p-6 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold md:text-lg">
          Tagihan Belum Dibayar di bulan ini
        </h2>
        {data && data.length > 0 && (
          <Link
            href="/dashboard/owner/tagihan"
            className="text-primary-600 text-sm hover:underline"
          >
            Lihat Semua
          </Link>
        )}
      </div>

      {data && data.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[160px]">Nama Penyewa</TableHead>
              <TableHead>Kost</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Jatuh Tempo</TableHead>
              <TableHead className="text-right">Total Tagihan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.invoiceNumber}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded-full">
                      <Image
                        width={40}
                        height={40}
                        src={"/profile-default.png"}
                        alt="Foto Penyewa"
                      />
                    </div>
                    <div>
                      <span className="text-theme-sm block font-medium text-gray-800">
                        {item.tenant}
                      </span>
                      <span className="text-theme-xs block text-gray-500">
                        {item.invoiceNumber}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <span className="text-theme-sm block font-medium text-gray-800">
                      {item.roomType}
                    </span>
                    <span className="text-theme-xs block text-gray-500">
                      {item.room}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm font-medium text-yellow-600">
                    Belum Bayar
                  </span>
                </TableCell>
                <TableCell>
                  {format(new Date(item.dueDate), "dd MMMM yyyy", {
                    locale: id,
                  })}
                </TableCell>
                <TableCell className="text-right">
                  Rp {item.amount.toLocaleString("id-ID")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total</TableCell>
              <TableCell className="text-right">
                Rp {total.toLocaleString("id-ID")}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      ) : (
        <div className="py-10 text-center text-gray-500">
          <p>Tidak ada tagihan yang belum dibayar.</p>
        </div>
      )}
    </div>
  );
};
