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
      data: {
        rating,
        comment: review,
      },
    });
  };

  const handleCheckOut = async () => {
    const ok = await confirm({
      title: "Check Out Kost?",
      description: `Apakah Anda yakin ingin Check Out kost?`,
      confirmText: "Ya",
      cancelText: "Tidak",
    });

    if (ok) {
      checkOut(data.bookingId);
    }
  };

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

  if (!data || data.length > 0) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center space-y-4">
        <Image
          src={"/Empty.svg"}
          alt="Empty state illustration"
          width={240}
          height={240}
          className="mb-4 h-48 w-48"
        />
        <p className="text-lg text-gray-500">Belum ada Kost yang aktif.</p>
        <Button asChild>
          <Link
            href={"/kosts"}
            // className="rounded-md bg-blue-600 px-4 py-2 text-white transition duration-200 hover:bg-blue-700"
          >
            Cari Kost
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="flex h-full flex-col justify-between">
        <div>
          <div>
            <h1 className="mb-6 text-2xl font-bold text-gray-900 select-none">
              Kost Saya
            </h1>
            <div className="mb-6 flex flex-col sm:flex-row sm:items-start sm:space-x-6">
              <Image
                alt="Room with white bed, yellow curtains, and wooden furniture"
                className="mb-4 h-28 w-40 rounded-md object-cover sm:mb-0"
                height="90"
                src={data.photo || "/default-image.jpg"}
                width="120"
              />
              <div>
                <Badge variant={"outline"} className="capitalize">
                  {data.type}
                </Badge>
                <h2 className="text-xl leading-6 font-bold text-gray-900">
                  {data.kostName}
                </h2>
                <p className="mb-1 flex items-center space-x-1 text-sm text-gray-600">
                  <MapPin size={18} />
                  <span>{data.address}</span>
                </p>
                {data.reviewed && data.review && (
                  <div className="">
                    <div className="flex items-center gap-2 text-base text-gray-600">
                      <p>Rating Kamu:</p>
                      <p className="flex items-center gap-1">
                        <Star
                          className="text-primary-500 fill-primary-500"
                          size={18}
                        />{" "}
                        {data.review.rating}
                      </p>
                    </div>
                  </div>
                )}
                <Button variant={"ghost"}>
                  <Link
                    // className="text-sm font-semibold text-gray-900 underline underline-offset-2 hover:text-gray-700"
                    href={`/kosts/${data.roomTypeId}`}
                  >
                    Lihat Detail Kost
                  </Link>
                </Button>
              </div>
            </div>
            <hr className="my-8" />
          </div>

          {data.stopRequest && data.stopRequest.status === "approved" && (
            <div
              className={`flex items-center gap-2 rounded-md p-4 ${
                data.stopRequest.status === "rejected"
                  ? "bg-red-50 text-red-800"
                  : data.stopRequest.status === "approved"
                    ? "bg-green-50 text-green-800"
                    : "bg-yellow-50 text-yellow-800"
              }`}
            >
              <div>
                <p className="text-lg font-semibold">
                  Sewa kamu akan segera berakhir
                </p>
                <p>
                  Kamu telah mengajukan berhenti sewa pada tanggal{" "}
                  <span className="font-semibold">
                    {data.stopRequest.stopDate}
                  </span>
                  .
                </p>

                {data.stopRequest.status === "approved" && (
                  <Button
                    disabled={checkingOut || !data?.stopRequest.canCheckOut}
                    onClick={handleCheckOut}
                    className="mt-4"
                  >
                    Check Out
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* <div className="my-4 rounded border-2 border-slate-200 px-4 py-3 shadow">
            <div className="flex justify-between">
              <p className="text-sm">Pembayaran ke-1</p>
              <span className="rounded bg-red-100 px-2 py-0.5 text-xs text-red-600">
                Telat {data.lateDays || 0} Hari
              </span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Jatuh Tempo {data.dueDate || "1 Desember 2025"}
              </p>
              <div className="flex flex-col items-center gap-2">
                <span className="font-semibold text-gray-800">
                  Rp {data.price.toLocaleString("id-ID")}
                </span>
                <Button size="lg" className="w-full">
                  Bayar Tagihan
                </Button>
              </div>
            </div>
          </div> */}
        </div>
        <div className="mt-4 grid grid-cols-4 gap-2 border-t p-4">
          <button
            onClick={() => setShowTagihanModal(true)}
            className="flex h-32 flex-col items-center justify-center gap-1 rounded-lg border p-3 text-base font-semibold text-gray-700 hover:bg-gray-50"
          >
            <Wallet className="h-8 w-8" />
            Tagihan Kost
          </button>

          <button
            onClick={() => setShowKontrakModal(true)}
            className="flex h-32 flex-col items-center justify-center gap-1 rounded-lg border p-3 text-base font-semibold text-gray-700 hover:bg-gray-50"
          >
            <Clipboard className="h-8 w-8" />
            Kontrak Kost
          </button>

          <button
            onClick={() => startChat({ roomTypeId: data.roomTypeId })}
            className="flex h-32 flex-col items-center justify-center gap-1 rounded-lg border p-3 text-base font-semibold text-gray-700 hover:bg-gray-50"
          >
            <MessageSquareText className="h-8 w-8" />
            Chat Pemilik
          </button>

          {data && !loadingActive && !data.reviewed && (
            <button
              onClick={() => setShowReviewModal(true)}
              className="flex h-32 flex-col items-center justify-center gap-1 rounded-lg border p-3 text-base font-semibold text-gray-700 hover:bg-gray-50"
            >
              <Star className="h-8 w-8" />
              Review Kost
            </button>
          )}
        </div>
      </div>

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
