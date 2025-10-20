"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { AlertTriangle, CheckCircle, MapPin, XCircle } from "lucide-react";
import StopRentModal from "./StopRentModal";
import { Badge } from "@/components/ui/badge";

type Props = {
  data: any;
};

const TenantContract = ({ data }: Props) => {
  const [openStopDialog, setOpenStopDialog] = useState(false);

  return (
    <div className="mx-auto w-full">
      {/* Header Kost */}
      <div className="mb-6 flex flex-col border-b-2 pb-4 sm:flex-row sm:space-x-4">
        <Image
          alt="Room"
          className="mb-4 h-40 w-full rounded-lg object-cover sm:mb-0 sm:h-32 sm:w-44"
          height="150"
          src={data.photo}
          width="200"
        />
        <div className="flex flex-col justify-start space-y-1">
          <Badge variant="outline" className="w-fit capitalize">
            {data.type}
          </Badge>
          <h2 className="text-lg leading-snug font-semibold sm:text-xl">
            {data.kostName}
          </h2>
          <div className="mt-1 flex items-center gap-2 text-sm text-gray-600 sm:text-base">
            <MapPin size={16} /> <span>{data.address}</span>
          </div>
          <p className="text-xs text-gray-600 sm:text-sm">{data.room}</p>
        </div>
      </div>

      {/* Informasi Kontrak */}
      <div className="mb-6 space-y-3 text-sm sm:text-base">
        <div className="flex justify-between">
          <span>Harga Sewa</span>
          <span className="font-semibold">
            Rp {data.price.toLocaleString("id-ID")}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Mulai Sewa</span>
          <span className="font-semibold">1 Desember 2024</span>
        </div>
        <div className="flex justify-between">
          <span>Durasi Sewa</span>
          <span className="font-semibold">2 Bulan</span>
        </div>
        <div className="flex justify-between">
          <span>Sewa Berakhir</span>
          <span className="font-semibold">1 Februari 2025</span>
        </div>
      </div>

      {/* Alert Status Berhenti Sewa */}
      {data.stopRequest && data.stopRequest.status && (
        <div
          className={`flex flex-col gap-2 rounded-md p-3 text-xs sm:flex-row sm:items-start sm:text-sm ${
            data.stopRequest.status === "rejected"
              ? "bg-red-50 text-red-800"
              : data.stopRequest.status === "approved"
                ? "bg-green-50 text-green-800"
                : "bg-yellow-50 text-yellow-800"
          }`}
        >
          {/* Icon */}
          <div className="flex items-center">
            {data.stopRequest.status === "rejected" && (
              <XCircle className="h-5 w-5 shrink-0 text-red-600" />
            )}
            {data.stopRequest.status === "approved" && (
              <CheckCircle className="h-5 w-5 shrink-0 text-green-600" />
            )}
            {data.stopRequest.status === "pending_approval" && (
              <AlertTriangle className="h-5 w-5 shrink-0 text-yellow-600" />
            )}
          </div>

          {/* Text */}
          <div>
            <p className="mb-1 font-semibold">
              {data.stopRequest.status === "rejected" &&
                "Berhenti sewa ditolak"}
              {data.stopRequest.status === "approved" &&
                "Berhenti sewa disetujui"}
              {data.stopRequest.status === "pending_approval" &&
                "Berhenti sewa telah diajukan"}
            </p>
            <p>
              Kamu telah mengajukan berhenti sewa pada tanggal{" "}
              <span className="font-semibold">{data.stopRequest.stopDate}</span>
              .
              {data.stopRequest.status === "pending_approval" &&
                " Tunggu pemilik kost untuk menyetujuinya."}
              {data.stopRequest.status === "rejected" &&
                " Permintaan kamu ditolak oleh pemilik kost."}
              {data.stopRequest.status === "approved" &&
                " Permintaan kamu sudah disetujui."}
            </p>
          </div>
        </div>
      )}

      {/* Tombol Aksi */}
      <div className="mt-6 flex flex-col justify-between gap-3 border-t-2 border-slate-100 pt-4 sm:flex-row">
        <Button
          variant="destructive"
          size="lg"
          type="button"
          className="w-full sm:flex-1"
          disabled={
            !!(
              data.stopRequest &&
              ["pending_approval", "approved"].includes(data.stopRequest.status)
            )
          }
          onClick={() => setOpenStopDialog(true)}
        >
          Ajukan Berhenti Sewa
        </Button>

        {/* <Button variant="outline" size="lg" className="w-full sm:flex-1">
          Download Kontrak PDF
        </Button> */}
      </div>

      {/* Modal Berhenti Sewa */}
      <StopRentModal
        bookingId={data.bookingId}
        open={openStopDialog}
        onOpenChange={setOpenStopDialog}
      />
    </div>
  );
};

export default TenantContract;
