"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { findPaymentMethod } from "@/utils/findPaymentMethod";

interface PayoutDetailDialogProps {
  open: boolean;
  onClose: () => void;
  data: any; // payout data
  onRetry?: (id: string) => void; // callback retry/kirim
  onCheckStatus?: (id: string) => void; // callback cek status
  loading?: boolean;
}

export const PayoutDetailDialog: React.FC<PayoutDetailDialogProps> = ({
  open,
  onClose,
  data,
  onRetry,
  onCheckStatus,
  loading,
}) => {
  if (!data) return null;

  const methodInfo = findPaymentMethod(data.channel || data.method);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detail Payout</DialogTitle>
        </DialogHeader>

        <div className="mt-2 space-y-4">
          {/* Owner Info */}
          <div className="flex items-center gap-4">
            <Image
              width={60}
              height={60}
              src={data.owner?.photo || "/profile-default.png"}
              alt={data.owner?.name || "Owner"}
              className="rounded-full"
            />
            <div>
              <p className="font-medium text-gray-800">
                {data.owner?.name || "-"}
              </p>
              <p className="text-sm text-gray-500">
                {data.owner?.email || "-"}
              </p>
            </div>
          </div>

          {/* Bank Info */}
          <div className="rounded border p-3">
            <p className="mb-2 font-medium">Rekening Bank</p>
            <div className="flex items-center gap-3">
              {methodInfo && (
                <Image
                  src={methodInfo.logo}
                  width={40}
                  height={40}
                  alt={methodInfo.name}
                  className="rounded"
                />
              )}
              <div>
                <p className="font-medium">{data.accountName || "-"}</p>
                <p className="text-gray-500">{data.accountNumber || "-"}</p>
                <p className="text-gray-500">
                  {data.channel?.toUpperCase() || data.method?.toUpperCase()}
                </p>
              </div>
            </div>
          </div>

          {/* Payout Info */}
          <div className="rounded border p-3">
            <p className="mb-2 font-medium">Detail Payout</p>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Invoice Payout</TableCell>
                  <TableCell>{data.payoutNumber || "-"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Jumlah</TableCell>
                  <TableCell>
                    Rp{" "}
                    {data.amount?.toLocaleString("id-ID", {
                      minimumFractionDigits: 0,
                    }) || "-"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Fee Platform</TableCell>
                  <TableCell>
                    Rp{" "}
                    {data.platformFee?.toLocaleString("id-ID", {
                      minimumFractionDigits: 0,
                    }) || "-"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Net Amount</TableCell>
                  <TableCell>
                    Rp{" "}
                    {data.netAmount?.toLocaleString("id-ID", {
                      minimumFractionDigits: 0,
                    }) || "-"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Status</TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        "text-sm capitalize",
                        data.status === "success" &&
                          "bg-green-100 text-green-700",
                        data.status === "failed" && "bg-red-100 text-red-700",
                        data.status === "pending" &&
                          "bg-yellow-100 text-yellow-700",
                        data.status === "processed" &&
                          "bg-blue-100 text-blue-700",
                      )}
                    >
                      {data.status}
                    </Badge>
                  </TableCell>
                </TableRow>
                {data.failedReason && (
                  <TableRow>
                    <TableCell>Error Message</TableCell>
                    <TableCell className="text-red-600">
                      {data.failedReason}
                    </TableCell>
                  </TableRow>
                )}
                <TableRow>
                  <TableCell>Requested At</TableCell>
                  <TableCell>
                    {data.requestedAt
                      ? format(
                          new Date(data.requestedAt),
                          "dd MMM yyyy HH:mm",
                          { locale: id },
                        )
                      : "-"}
                  </TableCell>
                </TableRow>
                {data.updatedAt && (
                  <TableRow>
                    <TableCell>Updated At</TableCell>
                    <TableCell>
                      {format(new Date(data.updatedAt), "dd MMM yyyy HH:mm", {
                        locale: id,
                      })}
                    </TableCell>
                  </TableRow>
                )}
                {data.transferredAt && (
                  <TableRow>
                    <TableCell>Transferred At</TableCell>
                    <TableCell>
                      {format(
                        new Date(data.transferredAt),
                        "dd MMM yyyy HH:mm",
                        { locale: id },
                      )}
                    </TableCell>
                  </TableRow>
                )}
                {data.note && (
                  <TableRow>
                    <TableCell>Catatan</TableCell>
                    <TableCell>{data.note}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Tutup
          </Button>
          {(data.status === "failed" || data.status === "pending") && (
            <Button
              onClick={() => onRetry && onRetry(data._id)}
              disabled={loading}
            >
              {loading
                ? "Memproses..."
                : data.status === "failed"
                  ? "Retry Payout"
                  : "Kirim Payout"}
            </Button>
          )}

          {data.status === "processed" && (
            // Cek Status Payout sudah SUCCESS/FAILED
            <Button
              onClick={() => onCheckStatus && onCheckStatus(data._id)}
              disabled={loading}
            >
              {loading ? "Memproses..." : "Cek Status Payout"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
