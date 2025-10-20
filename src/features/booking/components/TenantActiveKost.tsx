"use client";

import {
  Clipboard,
  MapPin,
  MessageSquareText,
  Star,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ReviewModal } from "./ReviewModal";
import { TagihanModal } from "./TagihanModal";
import { KontrakModal } from "./KontrakModal";
import { useChat } from "@/features/chat/hooks/useChat";
import { useTenantBooking } from "../hooks/useTenantBooking";
import { useConfirm } from "@/hooks/useConfirmModal";
import { Badge } from "@/components/ui/badge";

export function TenantActiveKost() {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showTagihanModal, setShowTagihanModal] = useState(false);
  const [showKontrakModal, setShowKontrakModal] = useState(false);

  const {
    activeBooking: data,
    loadingActive,
    checkOut,
    checkingOut,
    reviewKost,
  } = useTenantBooking();

  const confirm = useConfirm();
  const { startChat } = useChat();

  const handleReviewSubmit = (rating: number, review: string) => {
    reviewKost({
      bookingId: data.bookingId,
      data: { rating, comment: review },
    });
  };

  const handleCheckOut = async () => {
    const ok = await confirm({
      title: "Check Out Kost?",
      description: `Apakah Anda yakin ingin Check Out kost?`,
      confirmText: "Ya",
      cancelText: "Tidak",
    });
    if (ok) checkOut(data.bookingId);
  };

  // Loading state
  if (loadingActive) {
    return (
      <div className="space-y-4">
        <div className="h-28 w-full animate-pulse rounded-md bg-gray-200" />
        <div className="space-y-3">
          <div className="h-6 w-1/3 animate-pulse rounded-md bg-gray-200" />
          <div className="h-4 w-1/2 animate-pulse rounded-md bg-gray-200" />
          <div className="h-4 w-1/4 animate-pulse rounded-md bg-gray-200" />
        </div>
      </div>
    );
  }

  // Empty state
  if (!data || data.length > 0) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center space-y-4 text-center">
        <Image
          src={"/Empty.svg"}
          alt="Empty state"
          width={180}
          height={180}
          className="mb-2 h-40 w-40"
        />
        <p className="text-base text-gray-500 sm:text-lg">
          Belum ada Kost yang aktif.
        </p>
        <Button asChild size="lg">
          <Link href={"/kosts"}>Cari Kost</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="flex h-full flex-col justify-between">
        {/* Bagian Atas - Informasi Kost */}
        <div>
          <h1 className="mb-6 text-xl font-bold text-gray-900 select-none sm:text-2xl">
            Kost Saya
          </h1>

          <div className="mb-6 flex flex-col sm:flex-row sm:items-start sm:gap-6">
            <Image
              alt="Foto Kost"
              className="mb-4 h-40 w-full rounded-md object-cover sm:mb-0 sm:h-32 sm:w-48"
              src={data.photo || "/default-image.jpg"}
              width={180}
              height={120}
            />

            <div className="flex-1">
              <Badge variant="outline" className="mb-1 capitalize">
                {data.type}
              </Badge>
              <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
                {data.kostName}
              </h2>

              <p className="mb-1 flex items-center gap-1 text-sm text-gray-600">
                <MapPin size={16} />
                <span className="line-clamp-1">{data.address}</span>
              </p>

              {data.reviewed && data.review && (
                <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                  <p>Rating Kamu:</p>
                  <p className="flex items-center gap-1">
                    <Star
                      className="fill-yellow-400 text-yellow-400"
                      size={16}
                    />
                    {data.review.rating}
                  </p>
                </div>
              )}

              <Button variant="ghost" size="sm" asChild className="mt-2">
                <Link href={`/kosts/${data.roomTypeId}`}>
                  Lihat Detail Kost
                </Link>
              </Button>
            </div>
          </div>

          {/* Informasi Stop Request */}
          {data.stopRequest && (
            <div
              className={`mb-6 rounded-md p-4 ${
                data.stopRequest.status === "rejected"
                  ? "bg-red-50 text-red-800"
                  : data.stopRequest.status === "approved"
                    ? "bg-green-50 text-green-800"
                    : "bg-yellow-50 text-yellow-800"
              }`}
            >
              <p className="text-base font-semibold sm:text-lg">
                Sewa kamu akan segera berakhir
              </p>
              <p className="text-sm sm:text-base">
                Kamu telah mengajukan berhenti sewa pada{" "}
                <span className="font-semibold">
                  {data.stopRequest.stopDate}
                </span>
                .
              </p>

              {data.stopRequest.status === "approved" && (
                <Button
                  onClick={handleCheckOut}
                  disabled={checkingOut || !data?.stopRequest.canCheckOut}
                  className="mt-3 w-full sm:w-auto"
                >
                  {checkingOut ? "Memproses..." : "Check Out"}
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Bagian Bawah - Tombol Aksi */}
        <div className="mt-4 grid grid-cols-2 gap-3 border-t pt-4 sm:grid-cols-4">
          <button
            onClick={() => setShowTagihanModal(true)}
            className="flex h-28 flex-col items-center justify-center gap-1 rounded-lg border p-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 sm:h-32 sm:text-base"
          >
            <Wallet className="h-7 w-7 sm:h-8 sm:w-8" />
            Tagihan Kost
          </button>

          <button
            onClick={() => setShowKontrakModal(true)}
            className="flex h-28 flex-col items-center justify-center gap-1 rounded-lg border p-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 sm:h-32 sm:text-base"
          >
            <Clipboard className="h-7 w-7 sm:h-8 sm:w-8" />
            Kontrak Kost
          </button>

          <button
            onClick={() => startChat({ roomTypeId: data.roomTypeId })}
            className="flex h-28 flex-col items-center justify-center gap-1 rounded-lg border p-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 sm:h-32 sm:text-base"
          >
            <MessageSquareText className="h-7 w-7 sm:h-8 sm:w-8" />
            Chat Pemilik
          </button>

          {data && !loadingActive && !data.reviewed && (
            <button
              onClick={() => setShowReviewModal(true)}
              className="flex h-28 flex-col items-center justify-center gap-1 rounded-lg border p-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 sm:h-32 sm:text-base"
            >
              <Star className="h-7 w-7 sm:h-8 sm:w-8" />
              Review Kost
            </button>
          )}
        </div>
      </div>

      {/* Modal */}
      <ReviewModal
        open={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        onSubmit={handleReviewSubmit}
      />
      <TagihanModal
        open={showTagihanModal}
        onClose={() => setShowTagihanModal(false)}
        invoices={data.invoices}
      />
      {data && (
        <KontrakModal
          open={showKontrakModal}
          onClose={() => setShowKontrakModal(false)}
          data={data}
        />
      )}
    </>
  );
}
