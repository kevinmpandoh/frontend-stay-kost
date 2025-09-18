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
      <div className="mb-6 flex space-x-4 border-b-2 py-4">
        <Image
          alt="Room"
          className="flex-shrink-0 rounded-lg object-cover"
          height="150"
          src={data.photo}
          width="200"
        />
        <div className="flex flex-col justify-start">
          <Badge variant={"outline"} className="capitalize">
            {data.type}
          </Badge>

          <h2 className="text-xl leading-tight font-semibold">
            {data.kostName}
          </h2>
          <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
            <MapPin size={18} /> {data.address}
          </div>
          <p className="text-sm text-gray-600">{data.room}</p>
        </div>
      </div>

      <div className="mb-6 space-y-3">
        <div className="flex justify-between text-base">
          <span>Harga Sewa</span>
          <span className="font-semibold">
            Rp {data.price.toLocaleString("id-ID")}
          </span>
        </div>
        <div className="flex justify-between text-base">
          <span>Mulai Sewa</span>
          <span className="font-semibold">1 Desember 2024</span>
        </div>
        <div className="flex justify-between text-base">
          <span>Durasi Sewa</span>
          <span className="font-semibold">2 Bulan</span>
        </div>
        <div className="flex justify-between text-base">
          <span>Sewa Berakhir</span>
          <span className="font-semibold">1 Februari 2025</span>
        </div>
      </div>

      {/* Alert Status (opsional) */}
      {data.stopRequest && data.stopRequest.status && (
        <div
          className={`flex items-center gap-2 rounded-md p-3 text-sm ${
            data.stopRequest.status === "rejected"
              ? "bg-red-50 text-red-800"
              : data.stopRequest.status === "approved"
                ? "bg-green-50 text-green-800"
                : "bg-yellow-50 text-yellow-800"
          }`}
        >
          {data.stopRequest.status === "rejected" && (
            <XCircle className="h-5 w-5 shrink-0 text-red-600" />
          )}
          {data.stopRequest.status === "approved" && (
            <CheckCircle className="h-5 w-5 shrink-0 text-green-600" />
          )}
          {data.stopRequest.status === "pending_approval" && (
            <AlertTriangle className="h-5 w-5 shrink-0 text-yellow-600" />
          )}

          <div>
            <p className="font-semibold">
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

      <div className="mt-4 flex justify-between gap-2 border-t-2 border-slate-100 pt-4">
        <Button
          variant="destructive"
          size="lg"
          type="button"
          className="flex-1"
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

        {/* <Button variant="outline" size="lg" className="flex-1">
          Download Kontrak PDF
        </Button> */}
      </div>

      {/* Dialog Button */}
      {/* Dialog khusus berhenti sewa */}
      <StopRentModal
        bookingId={data.bookingId}
        open={openStopDialog}
        onOpenChange={setOpenStopDialog}
      />
    </div>
  );
};

export default TenantContract;
