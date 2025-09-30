"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface BookingDetailDialogProps {
  open: boolean;
  onClose: () => void;
  data: any;
}

export const BookingDetailDialog = ({
  open,
  onClose,
  data,
}: BookingDetailDialogProps) => {
  if (!data) return null;

  const tenant = data.tenant || {};
  const kost = data.kost || {};

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Detail Booking</DialogTitle>
        </DialogHeader>

        <div className="space-y-2 text-sm">
          <p>
            <strong>Nama Penyewa:</strong> {tenant.name ?? "-"}
          </p>
          <p>
            <strong>Nama Kost:</strong> {kost.name ?? "-"}
          </p>
          <p>
            <strong>Tanggal Masuk:</strong> {data.startDate ?? "-"}
          </p>
          <p>
            <strong>Tanggal Keluar:</strong> {data.endDate ?? "-"}
          </p>
          <p>
            <strong>Durasi:</strong> {data.duration ?? "-"} Bulan
          </p>
          <p>
            <strong>Jumlah Bayar:</strong> Rp{" "}
            {data.totalPrice?.toLocaleString("id-ID")}
          </p>
          <p>
            <strong>Status:</strong> {data.status}
          </p>
        </div>

        <DialogFooter className="mt-4">
          <Button onClick={onClose}>Tutup</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
