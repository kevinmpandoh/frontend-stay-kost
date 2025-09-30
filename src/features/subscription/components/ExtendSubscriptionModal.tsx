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
import { useSubscription } from "@/features/subscription/hooks/useSubscription";
import { cn } from "@/lib/utils";

interface ExtendSubscriptionModalProps {
  open: boolean;
  onClose: () => void;
}

const ExtendSubscriptionModal = ({
  open,
  onClose,
}: ExtendSubscriptionModalProps) => {
  const { currentSubscription, renewSubscription } = useSubscription();
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);

  const handleExtend = () => {
    if (!selectedDuration || !currentSubscription) return;

    renewSubscription.mutate(
      { subscriptionId: currentSubscription._id, duration: selectedDuration },
      {
        onSuccess: () => {
          onClose();
          setSelectedDuration(null);
        },
      },
    );
  };

  if (!currentSubscription) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Perpanjang Langganan</DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <div className="mb-3">
            <h3 className="text-lg font-semibold text-gray-800">
              Paket Saat Ini:
            </h3>
            <p className="text-gray-600">
              {currentSubscription?.package?.name}
            </p>
          </div>
          <p className="mb-3 text-lg font-semibold text-gray-600">
            Pilih Periode Perpanjangan
          </p>

          <div className="flex flex-wrap gap-3">
            {currentSubscription?.package?.durations?.map((d: any) => (
              <div
                key={d.duration}
                className={cn(
                  "cursor-pointer rounded-lg border-2 p-3 text-center",
                  selectedDuration === d.duration
                    ? "border-primary-500 bg-primary-50"
                    : "hover:border-gray-400",
                )}
                onClick={() => setSelectedDuration(d.duration)}
              >
                <p className="text-sm font-medium">{d.duration} Bulan</p>
                {d.oldPrice && (
                  <p className="text-xs text-gray-400 line-through">
                    {d.oldPrice.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      maximumFractionDigits: 0,
                    })}
                  </p>
                )}
                <p className="text-sm font-semibold">
                  {d.price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  })}
                </p>
                {d.discount && (
                  <p className="text-primary-600 text-xs">{d.discount}</p>
                )}
              </div>
              //   <Button
              //     key={d.duration}
              //     onClick={() => setSelectedDuration(d.duration)}
              //     variant={
              //       selectedDuration === d.duration ? "default" : "outline"
              //     }
              //   >
              //     {d.duration} Bulan -{" "}
              //     {d.price.toLocaleString("id-ID", {
              //       style: "currency",
              //       currency: "IDR",
              //       maximumFractionDigits: 0,
              //     })}
              //   </Button>
            ))}
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button
            onClick={handleExtend}
            disabled={!selectedDuration || renewSubscription.isPending}
          >
            {renewSubscription.isPending ? "Memproses..." : "Perpanjang"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExtendSubscriptionModal;
