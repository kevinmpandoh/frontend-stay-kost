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
import { StatusBadge } from "@/components/common/StatusBadge";

interface PayoutItem {
  payoutNumber: string;
  netAmount: string;
  accountName: string;
  method: string;
  channel: string;
  requestedAt: string;
  status: string;
}

export const PayoutHistory = ({ data }: { data: PayoutItem[] | undefined }) => {
  return (
    <div className="mt-8 overflow-x-auto rounded-lg bg-white p-6 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold md:text-lg">Riwayat Payout</h2>
        {data && data.length > 0 && (
          <Link
            href="/admin/payout"
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
              <TableHead className="w-[160px]">Nomor Payout</TableHead>
              <TableHead>Nama Penerima</TableHead>
              <TableHead>Metode Pembayaran</TableHead>
              <TableHead>Tanggal Permintaan</TableHead>
              <TableHead>Jumlah Bersih</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.payoutNumber}>
                <TableCell>{item.payoutNumber}</TableCell>
                <TableCell>{item.accountName}</TableCell>

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
                        {item.method}
                      </span>
                      <span className="text-theme-xs block text-gray-500">
                        {item.channel}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {format(new Date(item.requestedAt), "dd MMMM yyyy", {
                    locale: id,
                  })}
                </TableCell>
                <TableCell>Rp {item.netAmount.toLocaleString()}</TableCell>
                <TableCell>
                  <StatusBadge status={item.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {/* <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total</TableCell>
              <TableCell >
                Rp {total.toLocaleString("id-ID")}
              </TableCell>
            </TableRow>
          </TableFooter> */}
        </Table>
      ) : (
        <div className="py-10 text-center text-gray-500">
          <p>Tidak ada tagihan yang belum dibayar.</p>
        </div>
      )}
    </div>
  );
};
