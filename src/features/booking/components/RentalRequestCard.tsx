import { Calendar, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { parse, isAfter, differenceInSeconds } from "date-fns";
import { id as ind } from "date-fns/locale";
import { Button } from "@/components/ui/button";

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
    <div className="mb-6 max-w-3xl rounded-lg border border-gray-300 bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <p className="text-md font-semibold text-black">{date}</p>
        <StatusBadge status={status} />
      </div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Link href={`/kosts/${kostId}`} className="flex-shrink-0 sm:w-[150px]">
          <Image
            alt="Room"
            className="h-[180px] w-full flex-shrink-0 rounded-md object-cover sm:h-[120px] sm:w-[150px]"
            height="120"
            src={imageUrl || "/kost.jpg"}
            width="150"
          />
        </Link>
        <div className="flex-1">
          <div className="mb-1 flex items-center gap-2">
            <Badge variant={"outline"} className="capitalize">
              {category}
            </Badge>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
            <div>
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
            <div className="mb-2 flex flex-wrap gap-4">
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

      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Info countdown / alasan */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          {countdown && status === "waiting_for_payment" && (
            <div className="rounded-lg bg-yellow-50 px-3 py-2 text-xs text-yellow-800 sm:text-sm">
              Sisa waktu pembayaran:{" "}
              <span className="font-semibold">{countdown}</span>
            </div>
          )}
          {reason && (
            <div className="rounded bg-red-50 px-3 py-2 text-xs text-red-500 sm:text-sm">
              {reason}
            </div>
          )}
          {status === "waiting_for_checkin" && !canCheckIn && countdown && (
            <div className="text-sm text-orange-500">
              Check-in tersedia dalam{" "}
              <span className="font-semibold">{countdown}</span>
            </div>
          )}
        </div>

        {/* Tombol aksi */}
        <div className="flex flex-wrap justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={() => setOpenModal(true)}>
            Lihat Detail
          </Button>

          {status === "pending" && (
            <Button type="button" variant="outline" size="sm" asChild>
              <Link href="/kosts">Cari Kost Lain</Link>
            </Button>
          )}

          {status === "waiting_for_payment" && (
            <Button asChild type="button" size="sm">
              <Link href={`/payments?invoice=${invoiceUnpaid}`}>
                Bayar Sekarang
              </Link>
            </Button>
          )}

          {status === "waiting_for_checkin" && (
            <Button
              onClick={handleCheckIn}
              disabled={!canCheckIn || checkingIn}
              size="sm"
            >
              {checkingIn
                ? "Memproses..."
                : canCheckIn
                  ? "Check-In Sekarang"
                  : "Belum Bisa Check-In"}
            </Button>
          )}

          {status === "Aktif" && (
            <Button size="sm" asChild>
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
