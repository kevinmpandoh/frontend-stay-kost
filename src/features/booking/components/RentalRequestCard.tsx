import { Calendar, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { parse, isAfter, differenceInSeconds } from "date-fns";
import { id as ind } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { statusColorMap } from "@/constants/statusBadge";

import { RentalRequestCardProps } from "../types/booking.type";
import { BookingDetailModal } from "./BookingDetailModal";
import { useTenantBooking } from "../hooks/useTenantBooking";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Badge } from "@/components/ui/badge";

const RentalRequestCard: React.FC<RentalRequestCardProps> = ({
  id,
  kostId,
  date,
  status,
  kostName,
  address,
  category,
  checkInDate,
  checkOutDate,
  duration,
  imageUrl,
  price,
  paymentDeadline,
  invoiceUnpaid,
  reason,
  note,
}) => {
  const { checkIn, checkingIn } = useTenantBooking(); // gunakan hook

  const [canCheckIn, setCanCheckIn] = useState(false);
  const [countdown, setCountdown] = useState("");
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (!checkInDate) return;
    // parsing tanggalMasuk misal "27 Mei 2025"
    const parsedCheckInDate = parse(checkInDate, "d MMMM yyyy", new Date(), {
      locale: ind,
    });

    const interval = setInterval(() => {
      const now = new Date();
      if (isAfter(now, parsedCheckInDate) || +now === +parsedCheckInDate) {
        setCanCheckIn(true);
        setCountdown("");
        clearInterval(interval);
      } else {
        const diffSeconds = differenceInSeconds(parsedCheckInDate, now);
        const hours = Math.floor(diffSeconds / 3600)
          .toString()
          .padStart(2, "0");
        const minutes = Math.floor((diffSeconds % 3600) / 60)
          .toString()
          .padStart(2, "0");
        const seconds = (diffSeconds % 60).toString().padStart(2, "0");
        setCountdown(`${hours}:${minutes}:${seconds}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [checkInDate]);

  useEffect(() => {
    if (status !== "waiting_for_payment" || !paymentDeadline) return;

    try {
      const expire = parse(paymentDeadline, "d MMMM yyyy HH:mm", new Date(), {
        locale: ind,
      });

      const interval = setInterval(() => {
        const now = new Date();
        const diff = differenceInSeconds(expire, now);

        if (diff <= 0) {
          setCountdown("Waktu habis");
          clearInterval(interval);
        } else {
          const hours = Math.floor(diff / 3600)
            .toString()
            .padStart(2, "0");
          const minutes = Math.floor((diff % 3600) / 60)
            .toString()
            .padStart(2, "0");
          const seconds = (diff % 60).toString().padStart(2, "0");
          setCountdown(`${hours}:${minutes}:${seconds}`);
        }
      }, 1000);

      return () => clearInterval(interval);
    } catch (err) {
      console.error("Gagal parse expireDate:", paymentDeadline, err);
    }
  }, [status, paymentDeadline]);

  const handleCheckIn = () => {
    if (id) {
      checkIn(id);
    }
  };

  return (
    <div className="mb-6 max-w-3xl rounded-lg border border-gray-300 p-4">
      <div className="mb-2 flex items-start justify-between">
        <p className="text-md font-semibold text-black">{date}</p>
        <StatusBadge status={status} />
      </div>
      <div className="flex gap-4">
        <Link href={`/kosts/${kostId}`}>
          <Image
            alt="Room"
            className="h-[100px] w-[120px] flex-shrink-0 rounded-md object-cover"
            height="90"
            src={imageUrl || "/kost.jpg"}
            width="120"
          />
        </Link>
        <div className="flex-1">
          <div className="mb-1 flex items-center gap-2">
            <Badge variant={"outline"} className="capitalize">
              {category}
            </Badge>
          </div>
          <div className="flex justify-between">
            <div className="mb-2 flex flex-col">
              <h2 className="mb-1 text-xl font-semibold text-black">
                {kostName}
              </h2>
              <div className="flex items-center gap-1 text-sm">
                <MapPin size={18} />
                <span>{address}</span>
              </div>
              <p className="mt-1 text-sm font-semibold text-[#16a34a]">
                Rp {price?.toLocaleString("id-ID")}
              </p>
            </div>
            <div className="mb-2 flex gap-8">
              <div className="mb-1 flex flex-col gap-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  <span>Tanggal Masuk</span>
                </div>

                <span className="font-semibold text-[#374151]">
                  {checkInDate}
                </span>
              </div>
              <div className="mb-1 flex flex-col gap-2 text-sm text-[#6b7280]">
                <div className="flex items-center gap-2">
                  <Clock size={18} />
                  <span className="font-semibold">Durasi</span>
                </div>
                <span className="font-semibold text-[#374151]">
                  {duration} Bulan
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 flex w-full items-center justify-between gap-4">
        {/* Kiri (countdown atau reason) */}
        <div className="flex items-center gap-4">
          {countdown && status === "waiting_for_payment" && (
            <div
              className="rounded-lg bg-yellow-50 px-4 py-2 text-sm text-yellow-800 dark:bg-gray-800 dark:text-yellow-300"
              role="alert"
            >
              Sisa waktu pembayaran:{" "}
              <span className="font-semibold">
                {countdown || "Waktu Habis"}
              </span>
            </div>
          )}
          {reason && (
            <div className="rounded bg-red-50 px-2 py-1.5 text-sm text-red-500">
              {reason}
            </div>
          )}
          {status === "waiting_for_checkin" && !canCheckIn && countdown && (
            <div className="text-warning-500 mt-1 text-sm">
              Check-in tersedia dalam{" "}
              <span className="font-semibold">{countdown}</span>
            </div>
          )}
        </div>

        {/* Kanan (semua tombol) */}
        <div className="flex items-center gap-2.5">
          <Button variant="ghost" onClick={() => setOpenModal(true)}>
            Lihat Detail
          </Button>

          {status === "pending" && (
            <Button type="button" variant="outline" asChild>
              <Link href="/kosts">Cari Kost Lain</Link>
            </Button>
          )}

          {status === "waiting_for_payment" && (
            <Button asChild type="button">
              <Link
                href={`/payments?invoice=${invoiceUnpaid}`}
                // className="rounded bg-[#3b49df] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#2a37b8]"
              >
                Bayar Sekarang
              </Link>
            </Button>
          )}

          {status === "waiting_for_checkin" && (
            <Button
              onClick={handleCheckIn}
              disabled={!canCheckIn || checkingIn}
              type="button"
            >
              {checkingIn
                ? "Memproses..."
                : canCheckIn
                  ? "Check-In Sekarang"
                  : "Belum Bisa Check-In"}
            </Button>
          )}

          {status === "Aktif" && (
            <Button>
              <Link href="/user/kost-saya">Kost Saya</Link>
            </Button>
          )}
        </div>
      </div>
      <BookingDetailModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        data={{
          id,
          kostName,
          category,
          address,
          imageUrl,
          price: price || 0,
          duration,
          checkInDate,
          checkOutDate, // bisa dari props
          note: note,
        }}
      />
    </div>
  );
};

export default RentalRequestCard;
