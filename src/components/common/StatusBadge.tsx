"use client";

import { BookingStatus } from "@/features/booking/types/booking.type";
import { cn } from "@/lib/utils";
// import { BookingStatus } from "@/features/booking/booking.types";
// import { InvoiceStatus } from "@/features/invoice/invoice.types"; // misalnya ada
// import { KostStatus } from "@/features/kost/kost.types"; // misalnya ada

interface StatusBadgeProps {
  status: string;
  type?: "booking" | "invoice" | "kost"; // supaya lebih spesifik
  className?: string;
}

const statusLabels: Record<string, string> = {
  // Booking
  [BookingStatus.PENDING]: "Menunggu Konfirmasi",
  [BookingStatus.EXPIRED]: "Kedaluwarsa",
  [BookingStatus.APPROVED]: "Disetujui",
  [BookingStatus.REJECTED]: "Ditolak",
  [BookingStatus.WAITING_FOR_PAYMENT]: "Menunggu Pembayaran",
  [BookingStatus.WAITING_FOR_CHECKIN]: "Menunggu Check-in",
  [BookingStatus.ACTIVE]: "Aktif",
  [BookingStatus.WAITING_FOR_CHECKOUT]: "Menunggu Check-out",
  [BookingStatus.COMPLETED]: "Selesai",
  [BookingStatus.CANCELLED]: "Dibatalkan",

  // Invoice
  //   [InvoiceStatus.PAID]: "Dibayar",
  //   [InvoiceStatus.UNPAID]: "Belum Dibayar",
  //   [InvoiceStatus.OVERDUE]: "Terlambat",

  //   // Kost
  //   [KostStatus.ACTIVE]: "Aktif",
  //   [KostStatus.INACTIVE]: "Tidak Aktif",
};

const statusColors: Record<string, { bg: string; text: string }> = {
  // Booking
  [BookingStatus.PENDING]: { bg: "bg-yellow-100", text: "text-yellow-800" },
  [BookingStatus.EXPIRED]: { bg: "bg-gray-200", text: "text-gray-700" },
  [BookingStatus.APPROVED]: { bg: "bg-green-100", text: "text-green-800" },
  [BookingStatus.REJECTED]: { bg: "bg-red-100", text: "text-red-800" },
  [BookingStatus.WAITING_FOR_PAYMENT]: {
    bg: "bg-warning-100",
    text: "text-warning-800",
  },
  [BookingStatus.WAITING_FOR_CHECKIN]: {
    bg: "bg-warning-100",
    text: "text-warning-800",
  },
  [BookingStatus.ACTIVE]: { bg: "bg-green-200", text: "text-green-900" },
  [BookingStatus.WAITING_FOR_CHECKOUT]: {
    bg: "bg-orange-100",
    text: "text-orange-800",
  },
  [BookingStatus.COMPLETED]: { bg: "bg-gray-100", text: "text-gray-800" },
  [BookingStatus.CANCELLED]: { bg: "bg-gray-100", text: "text-gray-800" },
  "Sedang Menyewa": { bg: "bg-green-200", text: "text-green-900" },
  success: { bg: "bg-green-200", text: "text-green-900" },

  //   // Invoice
  //   [InvoiceStatus.PAID]: { bg: "bg-green-100", text: "text-green-800" },
  //   [InvoiceStatus.UNPAID]: { bg: "bg-red-100", text: "text-red-800" },
  //   [InvoiceStatus.OVERDUE]: { bg: "bg-orange-100", text: "text-orange-800" },

  //   // Kost
  //   [KostStatus.ACTIVE]: { bg: "bg-green-100", text: "text-green-800" },
  //   [KostStatus.INACTIVE]: { bg: "bg-gray-100", text: "text-gray-700" },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const label = statusLabels[status] ?? status;
  const colors = statusColors[status] ?? {
    bg: "bg-gray-100",
    text: "text-gray-800",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold capitalize select-none",
        colors.bg,
        colors.text,
        className,
      )}
    >
      {label}
    </span>
  );
}
