"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useSubscription } from "@/features/subscription/hooks/useSubscription";
import { usePackages } from "../hooks/usePackage";

interface UpgradeSubscriptionModalProps {
  open: boolean;
  onClose: () => void;
}

const UpgradeSubscriptionModal = ({
  open,
  onClose,
}: UpgradeSubscriptionModalProps) => {
  const { data: packages, isLoading } = usePackages();
  const { createSubscription } = useSubscription();

  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(
    null,
  );
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);

  const handleSubmit = () => {
    if (!selectedPackageId || !selectedDuration) return;

    createSubscription.mutate(
      { packageId: selectedPackageId, duration: selectedDuration },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  useEffect(() => {
    if (packages && packages.length > 0 && !selectedPackageId) {
      setSelectedPackageId(packages[0]._id);
      if (packages[0].durations?.length > 0) {
        setSelectedDuration(packages[0].durations[0].duration);
      }
    }
  }, [packages, selectedPackageId]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Pilih Paket Langganan</DialogTitle>
          <DialogDescription>
            Pilih paket dan durasi sesuai kebutuhan kamu.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <p className="p-4 text-center text-sm text-gray-500">Loading...</p>
        ) : (
          <>
            {/* List Packages */}
            <div className="grid grid-cols-2 gap-4">
              {packages?.map((pkg: any) => (
                <div
                  key={pkg._id}
                  className={cn(
                    "relative cursor-pointer rounded-lg border-2 p-4",
                    selectedPackageId === pkg._id &&
                      "border-primary-500 bg-primary-50",
                  )}
                  onClick={() => {
                    setSelectedPackageId(pkg._id);
                    setSelectedDuration(null); // reset duration
                  }}
                >
                  <div className="flex items-start justify-between">
                    <span className="bg-primary-500 rounded px-2 py-1 text-sm text-white">
                      {pkg.name}
                    </span>
                    {selectedPackageId === pkg._id && (
                      <Check className="text-primary-600 h-5 w-5" />
                    )}
                  </div>
                  <p className="mt-2 text-lg font-semibold">
                    {pkg.durations[0].price.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      maximumFractionDigits: 0,
                    })}
                    /bulan
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-gray-700">
                    {pkg.features.map((f: string, idx: number) => (
                      <li key={idx}>✔ {f}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Pilih Durasi */}
            {selectedPackageId && (
              <div className="mt-6">
                <p className="mb-3 text-lg font-semibold">Pilih Periode</p>
                <div className="grid grid-cols-4 gap-3">
                  {packages
                    ?.find((p: any) => p._id === selectedPackageId)
                    ?.durations.map((d: any) => (
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
                        <p className="text-sm font-medium">
                          {d.duration} Bulan
                        </p>
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
                          <p className="text-primary-600 text-xs">
                            {d.discount}
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}
          </>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              !selectedPackageId ||
              !selectedDuration ||
              createSubscription.isPending
            }
          >
            {createSubscription.isPending ? "Memproses..." : "Bayar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpgradeSubscriptionModal;
