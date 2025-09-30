// components/review/ReplyReviewModal.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (message: string) => void;
  loading?: boolean;
};

export const ReplyReviewModal = ({
  open,
  onClose,
  onSubmit,
  loading,
}: Props) => {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!message.trim()) return;
    onSubmit(message);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Balas Review Penyewa</DialogTitle>
        </DialogHeader>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Masukkan balasan Anda..."
          rows={5}
        />
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Mengirim..." : "Kirim Balasan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
