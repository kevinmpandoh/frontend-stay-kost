"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SendPayoutDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export const SendPayoutDialog = ({
  open,
  onClose,
  onConfirm,
  loading,
}: SendPayoutDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Konfirmasi Kirim Payout</DialogTitle>
        </DialogHeader>
        <p>Apakah Anda yakin ingin mengirim payout ke pemilik kost?</p>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button onClick={onConfirm} disabled={loading}>
            {loading ? "Memproses..." : "Kirim Ulang"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
