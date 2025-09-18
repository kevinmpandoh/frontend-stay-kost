"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: (reason?: string) => void;
  mode: "accept" | "reject";
};

const ModalKonfirmasiBerhenti = ({ open, onClose, onConfirm, mode }: Props) => {
  const [reason, setReason] = useState("");

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "accept"
              ? "Setujui Pengajuan Berhenti Sewa?"
              : "Tolak Pengajuan Berhenti Sewa"}
          </DialogTitle>
        </DialogHeader>

        {mode === "reject" && (
          <Textarea
            placeholder="Alasan penolakan..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        )}

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button onClick={() => onConfirm(reason)}>
            {mode === "accept" ? "Setujui" : "Tolak"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalKonfirmasiBerhenti;
