"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { useTenantBooking } from "../hooks/useTenantBooking";
import { format } from "date-fns";
import DatePicker from "@/app/(public)/kosts/[kostId]/booking/components/DatePicker";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  bookingId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const StopRentModal = ({ bookingId, open, onOpenChange }: Props) => {
  const { stopBooking, stopingBooking } = useTenantBooking();
  const [stopDate, setStopDate] = useState<Date | undefined>();
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    if (!stopDate || !reason) return;

    stopBooking(
      {
        id: bookingId,
        data: {
          reason,
          stopDate: format(stopDate, "yyyy-MM-dd"), // kirim ke backend format standar
        },
      },
      {
        onSuccess: () => {
          onOpenChange(false);
          setStopDate(undefined);
          setReason("");
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Ajukan Berhenti Sewa</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-base font-medium">Tanggal Berhenti</Label>
            <DatePicker
              value={stopDate}
              onChange={setStopDate}
              placeholder="Pilih tanggal berhenti"
              minDate={new Date()} // ⬅️ biar nggak bisa pilih sebelum hari ini
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason" className="text-base font-medium">
              Alasan
            </Label>
            <Textarea
              id="reason"
              className="w-full"
              placeholder="Masukkan alasan berhenti sewa..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="pt-4">
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button onClick={handleSubmit} disabled={stopingBooking}>
            {stopingBooking ? "Memproses..." : "Kirim"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StopRentModal;
