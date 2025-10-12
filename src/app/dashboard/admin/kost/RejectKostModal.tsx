// components/admin/RejectKostModal.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const RejectKostModal = ({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}) => {
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    if (reason.trim()) {
      onConfirm(reason);
      setReason("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tolak Pengajuan Kost</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Masukkan alasan penolakan"
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Batal
            </Button>
            <Button onClick={handleSubmit} disabled={!reason.trim()}>
              Kirim
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RejectKostModal;
