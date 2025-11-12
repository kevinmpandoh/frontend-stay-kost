"use client";

import { Calendar, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { parse, isAfter, differenceInSeconds } from "date-fns";
import { id as ind } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/common/StatusBadge";
import { BookingDetailModal } from "./BookingDetailModal";

interface RentalRequestCardData {
  id: string;
  kostId: string;
  tanggalDiajukan: string;
  status: string;
  namaKost: string;
  address: string;
  jenisKost: string;
  tanggalMasuk: string;
  tanggalKeluar: string;
  durasi: string;
  fotoKamar?: string;
  harga: number;
  paymentDeadline?: string;
  invoiceUnpaid?: string;
  rejectReason?: string;
  note?: string;
}

interface Props {
  data: RentalRequestCardData;
  onCancel?: (id: string) => void;
  onCheckIn?: (id: string) => void;
}

// === Countdown Hook ===
function useCountdown(expiredAt: string | null) {
  const calculateTimeLeft = () => {
    if (!expiredAt) return null;
    const difference = +new Date(expiredAt) - +new Date();
    if (difference <= 0) return null;
    return {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const calculateTimeLeft = () => {
      if (!expiredAt) return null;
      const difference = +new Date(expiredAt) - +new Date();
      if (difference <= 0) return null;
      return {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [expiredAt]);

  return timeLeft;
}

const RentalRequestCard: React.FC<Props> = ({ data, onCancel, onCheckIn }) => {
  const [countdown, setCountdown] = useState("");
  const [canCheckIn, setCanCheckIn] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  // Countdown Check-in
  useEffect(() => {
    if (!data.tanggalMasuk) return;
    const parsedCheckIn = parse(data.tanggalMasuk, "d MMMM yyyy", new Date(), {
      locale: ind,
    });

    const interval = setInterval(() => {
      const now = new Date();
      if (isAfter(now, parsedCheckIn) || +now === +parsedCheckIn) {
        setCanCheckIn(true);
        setCountdown("");
        clearInterval(interval);
      } else {
        const diffSeconds = differenceInSeconds(parsedCheckIn, now);
        const h = Math.floor(diffSeconds / 3600)
          .toString()
          .padStart(2, "0");
        const m = Math.floor((diffSeconds % 3600) / 60)
          .toString()
          .padStart(2, "0");
        const s = (diffSeconds % 60).toString().padStart(2, "0");
        setCountdown(`${h}:${m}:${s}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [data.tanggalMasuk]);

  // Countdown Pembayaran
  // useEffect(() => {
  //   console.log("DATA STATUS & DEADLINE:", data.status, data.paymentDeadline);
  //   if (data.status !== "waiting_for_payment" || !data.paymentDeadline) return;

  //   // const expire = parse(
  //   //   data.paymentDeadline,
  //   //   "d MMMM yyyy HH:mm",
  //   //   new Date(),
  //   //   {
  //   //     locale: ind,
  //   //   },
  //   // );

  //   const expire = new Date(data.paymentDeadline);

  //   console.log("PAYMENT DEADLINE:", data.paymentDeadline, expire);
  //   const interval = setInterval(() => {
  //     const now = new Date();
  //     const diff = differenceInSeconds(expire, now);
  //     if (diff <= 0) {
  //       setCountdown("Waktu habis");
  //       clearInterval(interval);
  //     } else {
  //       const h = Math.floor(diff / 3600)
  //         .toString()
  //         .padStart(2, "0");
  //       const m = Math.floor((diff % 3600) / 60)
  //         .toString()
  //         .padStart(2, "0");
  //       const s = (diff % 60).toString().padStart(2, "0");
  //       setCountdown(`${h}:${m}:${s}`);
  //     }
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [data.status, data.paymentDeadline]);

  const formatTimeUnit = (val: number) => String(val).padStart(2, "0");

  const timeLeft = useCountdown(data.paymentDeadline ?? null);

  return (
    <div className="mb-6 max-w-3xl rounded-lg border border-gray-300 bg-white p-4 shadow-sm transition hover:shadow-md">
      {/* Header */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <p className="text-md font-semibold text-black">
          {data.tanggalDiajukan}
        </p>
        <StatusBadge status={data.status} />
      </div>

      {/* Body */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <Link
          href={`/kosts/${data.kostId}`}
          className="flex-shrink-0 sm:w-[150px]"
        >
          <Image
            alt={data.namaKost}
            src={data.fotoKamar || "/kost-image-default.png"}
            width={150}
            height={120}
            className="h-[180px] w-full rounded-md object-cover sm:h-[120px] sm:w-[150px]"
          />
        </Link>

        <div className="flex-1">
          <div className="mb-1 flex items-center gap-2">
            <Badge variant="outline" className="capitalize">
              {data.jenisKost}
            </Badge>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
            <div>
              <h2 className="mb-1 text-xl font-semibold">{data.namaKost}</h2>
              <div className="flex items-center gap-1 text-sm">
                <MapPin size={18} /> <span>{data.address}</span>
              </div>
              <p className="mt-1 text-sm font-semibold text-[#16a34a]">
                Rp {data.harga.toLocaleString("id-ID")}
              </p>
            </div>

            <div className="mb-2 flex flex-wrap gap-4">
              <div className="text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  <span>Tanggal Masuk</span>
                </div>
                <span className="font-semibold text-[#374151]">
                  {data.tanggalMasuk}
                </span>
              </div>

              <div className="text-sm text-[#6b7280]">
                <div className="flex items-center gap-2">
                  <Clock size={18} />
                  <span className="font-semibold">Durasi</span>
                </div>
                <span className="font-semibold text-[#374151]">
                  {data.durasi} Bulan
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          {timeLeft && data.status === "waiting_for_payment" && (
            <div className="rounded-lg bg-yellow-50 px-3 py-2 text-xs text-yellow-800 sm:text-sm">
              Sisa waktu pembayaran:{" "}
              <span className="font-semibold">
                {formatTimeUnit(timeLeft.hours)}:
                {formatTimeUnit(timeLeft.minutes)}:
                {formatTimeUnit(timeLeft.seconds)}
              </span>
            </div>
          )}

          {data.rejectReason && (
            <div className="rounded bg-red-50 px-3 py-2 text-xs text-red-500 sm:text-sm">
              {data.rejectReason}
            </div>
          )}

          {data.status === "waiting_for_checkin" &&
            !canCheckIn &&
            countdown && (
              <div className="text-warning-500 text-sm">
                Check-in tersedia dalam{" "}
                <span className="font-semibold">{countdown}</span>
              </div>
            )}
        </div>

        <div className="flex flex-wrap justify-end gap-2">
          <Button variant="ghost" onClick={() => setOpenModal(true)}>
            Lihat Detail
          </Button>

          {data.status === "pending" && (
            <Button variant="outline" onClick={() => onCancel?.(data.id)}>
              Batalkan Pengajuan
            </Button>
          )}

          {data.status === "waiting_for_payment" && (
            <Button asChild>
              <Link href={`/payments?invoice=${data.invoiceUnpaid}`}>
                Bayar Sekarang
              </Link>
            </Button>
          )}

          {data.status === "waiting_for_checkin" && (
            <Button onClick={() => onCheckIn?.(data.id)} disabled={!canCheckIn}>
              {canCheckIn ? "Check-In Sekarang" : "Belum Bisa Check-In"}
            </Button>
          )}

          {data.status === "active" && (
            <Button asChild>
              <Link href="/user/kost-saya">Kost Saya</Link>
            </Button>
          )}
        </div>
      </div>

      <BookingDetailModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        data={{
          id: data.id,
          kostName: data.namaKost,
          category: data.jenisKost,
          address: data.address,
          imageUrl: data.fotoKamar,
          price: data.harga,
          duration: data.durasi,
          checkInDate: data.tanggalMasuk,
          checkOutDate: data.tanggalKeluar,
          note: data.note,
        }}
      />
    </div>
  );
};

export default RentalRequestCard;
