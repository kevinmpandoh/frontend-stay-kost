"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Badge from "@/components/ui/badge2";
import Avatar from "@/components/ui/avatar2";

interface DetailPengajuanModalProps {
  open: boolean;
  onClose: () => void;
  booking: any | null;
}

const DetailPengajuanModal: React.FC<DetailPengajuanModalProps> = ({
  open,
  onClose,
  booking,
}) => {
  if (!booking) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detail Pengajuan Sewa</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Tenant info */}
          <div className="flex items-center gap-4">
            <Avatar src={"/profile-default.png"} />
            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                {booking.tenant?.name}
              </h3>
              <p className="text-sm text-gray-500">{booking.tenant?.email}</p>
            </div>
          </div>

          {/* Kost info */}
          <div className="rounded-lg border bg-gray-50 p-4">
            <h4 className="mb-2 text-sm font-semibold text-gray-600">
              Kost yang diajukan
            </h4>
            <p className="text-gray-800">{booking.kost?.namaKost}</p>
            <p className="text-sm text-gray-500">
              Tipe kamar: {booking.kost?.roomTypeName}
            </p>
          </div>

          {/* Status */}
          <div>
            <h4 className="mb-2 text-sm font-semibold text-gray-600">Status</h4>
            <Badge
              color={
                booking.status === "pending"
                  ? "warning"
                  : booking.status === "waiting_for_payment"
                    ? "info"
                    : booking.status === "completed"
                      ? "success"
                      : "error"
              }
            >
              {booking.status}
            </Badge>
          </div>

          {/* Detail sewa */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border p-3">
              <h5 className="text-sm text-gray-500">Tanggal Masuk</h5>
              <p className="text-base font-semibold">{booking.tanggalMasuk}</p>
            </div>
            <div className="rounded-lg border p-3">
              <h5 className="text-sm text-gray-500">Durasi</h5>
              <p className="text-base font-semibold">{booking.durasi} bulan</p>
            </div>
            <div className="rounded-lg border p-3">
              <h5 className="text-sm text-gray-500">Total Harga</h5>
              <p className="text-base font-semibold">
                Rp {booking.totalPrice?.toLocaleString("id-ID")}
              </p>
            </div>
            <div className="rounded-lg border p-3">
              <h5 className="text-sm text-gray-500">Metode Pembayaran</h5>
              <p className="text-base font-semibold">
                {booking.paymentMethod || "-"}
              </p>
            </div>
          </div>

          {/* Footer actions */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Tutup
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailPengajuanModal;
