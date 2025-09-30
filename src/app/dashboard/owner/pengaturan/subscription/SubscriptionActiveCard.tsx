"use client";

import { CheckCircle, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SubscriptionProps {
  currentSubscription: any;
  pendingInvoice?: boolean;
  openUpgrade: () => void;
  setOpenExtend: (open: boolean) => void;
}

export default function SubscriptionActiveCard({
  currentSubscription,
  pendingInvoice,
  openUpgrade,
  setOpenExtend,
}: SubscriptionProps) {
  const pkg = currentSubscription?.package;

  const isFree = pkg?.type === "free";
  const endDate = currentSubscription?.endDate
    ? new Date(currentSubscription?.endDate)
    : null;
  const daysLeft = endDate
    ? Math.ceil((endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <div
      className={cn(
        "space-y-4 rounded-2xl border p-6 shadow-sm transition hover:shadow-md",
        isFree
          ? "border-gray-200 bg-gray-50"
          : "border-warning-200 bg-gradient-to-br from-yellow-50 to-white",
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            {!isFree && <Crown className="h-4 w-4 text-yellow-500" />}
            <p
              className={cn(
                "font-semibold",
                isFree ? "text-gray-800" : "text-yellow-800",
              )}
            >
              Paket: {pkg?.name || "Free"}
            </p>
          </div>
          <p className="text-sm text-gray-600">
            {isFree ? (
              "Aktif tanpa batas waktu"
            ) : (
              <>
                Aktif hingga{" "}
                {endDate ? endDate.toLocaleDateString("id-ID") : "-"}
              </>
            )}
          </p>
        </div>

        {/* Badge Sisa Hari */}
        {daysLeft && (
          <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">
            {daysLeft} Hari lagi
          </span>
        )}
      </div>

      {/* Progress bar kalau bukan free */}
      {!isFree && daysLeft !== null && (
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="absolute top-0 left-0 h-full bg-yellow-500 transition-all"
            style={{
              width: `${Math.max(0, (daysLeft / 30) * 100)}%`,
            }}
          />
        </div>
      )}

      {/* Fitur */}
      <ul className="mt-2 space-y-2 text-base font-semibold text-gray-700">
        <li className="flex items-center gap-2">
          <CheckCircle className="text-primary-500 h-4 w-4" />
          {pkg?.maxKost
            ? `Maksimal ${pkg?.maxKost ?? ""} Kost`
            : "Kost tidak terbatas"}
        </li>
        <li className="flex items-center gap-2">
          <CheckCircle className="text-primary-500 h-4 w-4" />
          {pkg?.maxRoomType
            ? `Maksimal ${pkg?.maxRoomType ?? ""} Tipe Kamar`
            : "Tipe Kamar tidak terbatas"}
        </li>
        <li className="flex items-center gap-2">
          <CheckCircle className="text-primary-500 h-4 w-4" />
          {pkg?.maxRoom
            ? `Maksimal ${pkg?.maxRoom ?? ""} Kamar`
            : "Kamar tidak terbatas"}
        </li>
      </ul>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 pt-2">
        <Button
          variant={isFree ? "default" : "outline"}
          onClick={openUpgrade}
          disabled={!!pendingInvoice}
        >
          {isFree ? "Upgrade ke Premium" : "Upgrade Paket"}
        </Button>
        {!isFree && (
          <Button
            onClick={() => setOpenExtend(true)}
            disabled={!!pendingInvoice}
          >
            Perpanjang Langganan
          </Button>
        )}
      </div>
    </div>
  );
}
