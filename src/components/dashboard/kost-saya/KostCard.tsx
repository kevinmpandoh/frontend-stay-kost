import { StatusBadge } from "@/components/common/StatusBadge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import ConfirmDeleteModal from "@/components/ui/ConfirmModalDelete";
import { DEFAULT_FACILITY_ICON, FACILITY_ICONS } from "@/constants/facilities";

import { KostOwnerService } from "@/features/kost/services/kostOwner.service";
import { useConfirm } from "@/hooks/useConfirmModal";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AlertCircle, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

export interface Kost {
  id: string;
  photo: string | null;
  name: string;
  type: string;
  address: string;
  status: string;
  rejectionReason?: string;
  roomTypeName: string[];
  fasilitas: string[];
  rating: number;
  total_kamar: number;
  kamar_tersedia: number;
  kamar_terisi: number;
  progressStep: number;
}

const KostCard = ({ kost }: { kost: Kost }) => {
  const queryClient = useQueryClient();
  const confirm = useConfirm();

  const deleteMutation = useMutation({
    mutationFn: KostOwnerService.deleteKost,
    onSuccess: () => {
      toast.success("Kost berhasil dihapus");
      queryClient.invalidateQueries({
        queryKey: ["kost", kost.id],
      });
    },
    onError: () => {
      toast.error("Gagal menghapus tipe kost");
    },
  });

  const handleDelete = async (kostId: string) => {
    const ok = await confirm({
      title: "Anda yakin ingin menghapus review ini?",
      description:
        "Apakah kamu yakin ingin menghapus data ini? Tindakan ini tidak bisa dibatalkan.",
      confirmText: "Hapus",
      cancelText: "Batal",
    });

    if (ok) {
      deleteMutation.mutate(kostId);
    }
  };

  return (
    <div className="mb-6 w-full rounded-lg border border-gray-300 bg-white px-6 py-4 shadow">
      <div className="mb-2 flex items-center justify-between">
        <div className="min-w-[280px]">
          {kost.status === "rejected" && kost.rejectionReason && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4 text-center" />
              <AlertDescription>{kost.rejectionReason}</AlertDescription>
            </Alert>
          )}
        </div>
        <StatusBadge status={kost.status} />
      </div>
      <div className="mb-4 flex w-full gap-4">
        <Image
          alt="Room"
          className="h-[180px] w-[250px] flex-shrink-0 rounded-md object-cover"
          height="90"
          src={kost.photo || "/kost.jpg"}
          width="120"
        />
        <div className="flex w-full flex-col">
          <div className="flex flex-col">
            <div className="mb-1 flex items-center gap-2">
              <Badge className="capitalize" variant={"outline"}>
                {kost.type}
              </Badge>
            </div>
            <div className="flex justify-between gap-5">
              <div className="mb-2 ml-2 flex flex-col space-y-2">
                <h2 className="mb-1 text-lg font-semibold text-black">
                  {kost.name}
                </h2>
                <div className="capitalizes flex items-center gap-1 text-sm">
                  {kost.address && (
                    <>
                      <MapPin size={18} />
                      <span className="capitalize">{kost.address}</span>
                    </>
                  )}
                </div>
                {/* Fasilitas */}
                <div className="my-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {kost.fasilitas.map((key, index) => {
                    const facility = FACILITY_ICONS[key];
                    const Icon = facility?.icon || DEFAULT_FACILITY_ICON;
                    const label = facility?.label || key;
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm font-semibold text-slate-600"
                      >
                        <Icon className="text-primary h-5 w-5" />
                        <span>{label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mb-2 flex">
                {/* <div className="flex flex-col justify-center gap-2 border-l-2 border-gray-200 px-8 text-base text-gray-600">
                  <h3 className="text-lg font-semibold">Kamar</h3>

                  <span className="font-semibold text-[#374151]">
                    Tersedia: {kost.kamar_tersedia}
                  </span>
                  <span className="font-semibold text-[#374151]">
                    Kosong: {kost.kamar_terisi}
                  </span>
                </div> */}

                {/* <div className="flex flex-col justify-center gap-2 border-l-2 border-gray-200 px-8 text-base text-[#6b7280]">
                  <h3 className="text-lg font-semibold">Rata-Rata Rating</h3>
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 text-[#3b82f6]" />

                    <span className="font-semibold text-[#374151]">
                      4.8 (120 Ulasan)
                    </span>
                  </div>
                </div> */}

                <div className="flex flex-col items-center justify-center gap-2 border-l-2 border-gray-200 px-5 text-base text-[#6b7280]">
                  <h3 className="text-lg font-semibold">Tipe Kamar</h3>

                  <span className="font-semibold text-[#374151]">
                    {kost.roomTypeName.join(", ")}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-end gap-2 pt-4">
            <Button
              size="default"
              variant={"destructive"}
              onClick={() => handleDelete(kost.id)}
            >
              Hapus
            </Button>
            {kost.status === "approved" && (
              <>
                <Button variant={"outline"}>
                  <Link
                    href={`/dashboard/edit-kost?kost_id=${kost.id}`}
                    type="button"
                  >
                    Edit Data Kost
                  </Link>
                </Button>
                <Button>
                  <Link
                    href={`kost-saya/${kost.id}`}
                    // className="text-[#3b49df] font-semibold text-sm border border-[#3b49df] rounded px-4 py-1 hover:bg-[#e6e8ff] transition"
                    type="button"
                  >
                    Kelola Data Kost
                  </Link>
                </Button>
              </>
            )}

            {kost.status === "draft" && (
              <>
                <Button variant={"outline"}>
                  <Link
                    href={`/dashboard/tambah-kost?kost_id=${kost.id}&step=${kost.progressStep}`}
                    // className="text-[#3b49df] font-semibold text-sm border border-[#3b49df] rounded px-4 py-1 hover:bg-[#e6e8ff] transition"
                    type="button"
                  >
                    Lengkapi Data Kost
                  </Link>
                </Button>
              </>
            )}

            {kost.status === "rejected" && (
              <>
                <Button variant={"outline"}>
                  <Link
                    href={`/dashboard/tambah-kost?kost_id=${kost.id}`}
                    // className="text-[#3b49df] font-semibold text-sm border border-[#3b49df] rounded px-4 py-1 hover:bg-[#e6e8ff] transition"
                    type="button"
                  >
                    Edit Kost
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KostCard;
