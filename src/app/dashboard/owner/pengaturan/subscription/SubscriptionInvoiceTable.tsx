"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Invoice {
  id: string;
  packageName: string;
  packageDuration: string;
  totalPrice: number;
  createdAt: string;
  status: string;
}

interface Props {
  invoices: Invoice[];
  pageSize?: number; // default 5
}

export default function SubscriptionInvoiceTable({
  invoices,
  pageSize = 5,
}: Props) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(invoices.length / pageSize);

  const startIndex = (page - 1) * pageSize;
  const currentData = invoices.slice(startIndex, startIndex + pageSize);

  return (
    <div className="space-y-3">
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Paket</TableHead>
              <TableHead>Durasi</TableHead>
              <TableHead>Harga</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.packageName}</TableCell>
                <TableCell>{item.packageDuration}</TableCell>
                <TableCell>
                  Rp {item.totalPrice.toLocaleString("id-ID")}
                </TableCell>
                <TableCell>{item.createdAt}</TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      item.status === "paid" && "bg-green-100 text-green-700",
                      item.status === "expired" && "bg-red-100 text-red-700",
                      item.status === "cancelled" && "bg-red-100 text-red-700",
                    )}
                  >
                    {item.status === "paid"
                      ? "Lunas"
                      : item.status === "expired"
                        ? "Kadaluarsa"
                        : item.status === "cancelled"
                          ? "Dibatalkan"
                          : ""}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}

            {currentData.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="py-4 text-center">
                  Tidak ada riwayat pembayaran
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Sebelumnya
          </Button>
          <p className="text-sm text-gray-600">
            Halaman {page} dari {totalPages}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Selanjutnya
          </Button>
        </div>
      )}
    </div>
  );
}
