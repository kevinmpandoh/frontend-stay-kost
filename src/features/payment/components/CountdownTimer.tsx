import { Timer } from "lucide-react";
import React from "react";

export const CountdownTimer = ({
  expiry_time,
  timeLeft,
}: {
  expiry_time: string;
  timeLeft: {
    hours: number;
    minutes: number;
    seconds: number;
  } | null;
}) => {
  const deadline = new Date(expiry_time).toLocaleString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const formatTimeUnit = (val: number) => String(val).padStart(2, "0");

  return (
    <div className="mb-4 flex items-center justify-between rounded-md bg-amber-50 p-4">
      <div className="flex items-center gap-3">
        <Timer className="text-warning-500 mt-1 h-8 w-8" />
        <div className="text-brown-800">
          <p className="mb-1 text-sm text-slate-700">
            Selesaikan pembayaran sebelum:
          </p>
          <p className="text-md text-brown-900 font-semibold">{deadline}</p>
        </div>
      </div>
      <div>
        {timeLeft ? (
          <p className="text-md text-brown-900 font-semibold">
            {formatTimeUnit(timeLeft.hours)}:{formatTimeUnit(timeLeft.minutes)}:
            {formatTimeUnit(timeLeft.seconds)}
          </p>
        ) : (
          <p className="font-semibold text-red-600">Waktu habis</p>
        )}
      </div>
    </div>
  );
};
