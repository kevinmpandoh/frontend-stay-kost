// components/review/ReviewDetailModal.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Image from "next/image";
import { Star } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  data: any | null;
};

export const ReviewDetailModal = ({ open, onClose, data }: Props) => {
  if (!data) return null;

  const ratingStars = Array.from({ length: data.rating });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detail Review</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-sm text-gray-700">
          <div className="flex items-center gap-3">
            <Image
              src={"/profile-default.png"}
              alt="Foto Penyewa"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <div className="font-semibold">
                {data.penyewa?.nama || "Penyewa"}
              </div>
              <div className="text-xs text-gray-500">Kamar: {data.room}</div>
            </div>
          </div>

          <div>
            <strong>Kost:</strong> {data.roomType ?? "-"}
          </div>

          <div className="flex items-center gap-1">
            <strong>Rating:</strong>
            {ratingStars.map((_, i) => (
              <Star
                key={i}
                className="h-4 w-4 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>

          <div>
            <strong>Tanggal Review:</strong>
            <br />
            {data.createdAt}
          </div>

          <div>
            <strong>Komentar:</strong>
            <p className="mt-1 whitespace-pre-line">{data.comment}</p>
          </div>

          {data.reply && data.reply.message && (
            <div className="rounded border bg-gray-50 p-3">
              <strong>Balasan:</strong> <br />
              <span>{data.reply.message}</span>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Tutup
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
