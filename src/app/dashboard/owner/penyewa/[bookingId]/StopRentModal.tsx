"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { bookingService } from "@/features/booking/booking.service";

const StopRentSchema = z.object({
  tanggal_berhenti: z.string().min(1, "Tanggal berhenti wajib diisi"),
  alasan: z.string().min(5, "Alasan minimal 5 karakter"),
});

type StopRentForm = z.infer<typeof StopRentSchema>;

interface StopRentModalProps {
  open: boolean;
  onClose: () => void;
  bookingId: string;
}

const StopRentModal = ({ open, onClose, bookingId }: StopRentModalProps) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StopRentForm>({
    resolver: zodResolver(StopRentSchema),
  });

  const { mutate: stopRent, isPending } = useMutation({
    mutationFn: (payload: StopRentForm) =>
      bookingService.stopRentTenant(bookingId, {
        stopDate: payload.tanggal_berhenti,
        reason: payload.alasan,
      }),
    onSuccess: () => {
      toast.success("Pengajuan berhenti sewa berhasil dikirim");
      queryClient.invalidateQueries({ queryKey: ["tenant-detail", bookingId] });
      onClose();
      reset();
    },
    onError: () => {
      toast.error("Gagal mengajukan berhenti sewa");
    },
  });

  const onSubmit = (data: StopRentForm) => {
    stopRent(data);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajukan Berhenti Sewa</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="tanggal_berhenti">Tanggal Berhenti</Label>
            <input
              type="date"
              id="tanggal_berhenti"
              {...register("tanggal_berhenti")}
              className="input w-full"
            />
            {errors.tanggal_berhenti && (
              <p className="text-sm text-red-500">
                {errors.tanggal_berhenti.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="alasan">Alasan</Label>
            <Textarea
              id="alasan"
              {...register("alasan")}
              placeholder="Masukkan alasan ingin berhenti sewa"
            />
            {errors.alasan && (
              <p className="text-sm text-red-500">{errors.alasan.message}</p>
            )}
          </div>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Mengirim..." : "Kirim Pengajuan"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StopRentModal;
