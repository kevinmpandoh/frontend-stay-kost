import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";

import { roomTypeService } from "@/features/roomType/services/roomType.service";
import { useConfirm } from "@/hooks/useConfirmModal";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

const KostTypeCard = ({ kostType, kostId }: any) => {
  const [showDetails, setShowDetails] = useState(false);

  const confirm = useConfirm();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: roomTypeService.deleteRoomType,
    onSuccess: () => {
      toast.success("Tipe kost berhasil dihapus");
      queryClient.invalidateQueries({
        queryKey: ["kost", kostId],
      });
      // bisa refetch atau update lokal list
    },
    onError: () => {
      toast.error("Gagal menghapus tipe kost");
    },
  });

  const handleDelete = async (roomTypeId: string) => {
    const ok = await confirm({
      title: "Hapus Tipe Kamar ini?",
      description:
        "Apakah kamu yakin ingin menghapus data ini? Tindakan ini tidak bisa dibatalkan.",
      confirmText: "Hapus",
      cancelText: "Batal",
    });

    if (ok) {
      deleteMutation.mutate(roomTypeId);
    }
  };

  return (
    <div className="w-full max-w-[370px] flex-shrink-0 rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="px-4 pt-4">
        <StatusBadge status={kostType.status} />
      </div>
      <Image
        alt="Room image"
        className="mt-3 h-44 w-full rounded-lg object-cover px-4"
        src={kostType?.foto?.[0]?.url || "/kost.jpg"}
        height={220}
        width={320}
      />
      <div className="px-4 pt-4 pb-6">
        <h3 className="text-lg leading-5 font-bold text-black">
          {kostType?.nama_tipe}
        </h3>
        <p className="mt-1 text-sm text-gray-400">
          Ukuran Kamar: {kostType?.ukuran_kamar} M
        </p>

        <div className="mt-4 flex space-x-4 rounded-md border border-gray-200 p-2 px-4 text-xs text-gray-600">
          <div className="flex-1">
            <p className="text-base text-gray-400">Kamar Terisi</p>
            <p className="text-base font-semibold text-black">
              {kostType?.kamar_terisi} Kamar
            </p>
          </div>
          <div className="flex-1">
            <p className="text-base text-gray-400">Kamar Kosong</p>
            <p className="text-base font-semibold text-black">
              {kostType?.kamar_kosong} Kamar
            </p>
          </div>
        </div>

        {/* FASILITAS & REVIEW hanya tampil saat showDetails = true */}
        {showDetails && (
          <>
            <div className="mt-4 flex space-x-4 rounded-md border border-gray-200 p-2 px-4 text-xs text-gray-600">
              <div className="flex-1">
                <p className="text-base text-gray-500">Review</p>
                {kostType.total_review > 0 ? (
                  <div className="text-base font-semibold">
                    {kostType.average_rating}{" "}
                    <span className="text-primary-500">★</span> (
                    {kostType.total_review} Reviews)
                  </div>
                ) : (
                  "-"
                )}
              </div>
            </div>

            <div className="mt-4 text-xs text-gray-700">
              <p className="mb-1 text-sm font-semibold">Fasilitas Kamar</p>
              <div className="flex flex-wrap gap-x-2 gap-y-1 text-sm text-gray-600">
                {kostType.fasilitas.length > 0 ? (
                  kostType.fasilitas.map((fasilitas: any, index: number) => (
                    <span
                      key={index}
                      className="rounded-full bg-gray-100 px-2 py-1 text-gray-700"
                    >
                      {fasilitas.nama}
                    </span>
                  ))
                ) : (
                  <div>-</div>
                )}
              </div>
            </div>
          </>
        )}

        <div className="mt-4 text-xs text-gray-700">
          <p className="mb-1 text-base font-semibold">Harga</p>
          <div className="w-full text-xl font-bold">
            {kostType.harga ? (
              <>
                Rp
                <span className="ml-2 text-xl">
                  {kostType?.harga?.toLocaleString("id-ID")}
                </span>
                <span className="font-normal">/bulan</span>
              </>
            ) : (
              <div>-</div>
            )}
          </div>
        </div>

        <div className="mt-4 w-full space-y-1.5">
          {kostType.status === "draft" && (
            <div className="flex w-full justify-center space-x-2">
              <Button
                className="w-[48%]"
                size="default"
                variant="outline"
                onClick={() => handleDelete(kostType.id)}
              >
                Hapus
              </Button>
              <Button className="w-[48%]" size="default" variant="outline">
                <Link
                  href={`/dashboard/kost-type/create?kost_id=${kostId}&kost_type_id=${kostType.id}&step=${kostType.progress_step}`}
                >
                  Lengkapi Data
                </Link>
              </Button>
            </div>
          )}

          {kostType.status === "active" && (
            <>
              <Button className="w-full" size="default" variant="outline">
                <Link href={`rooms/${kostType.id}`}>
                  Atur Ketersediaan Kamar
                </Link>
              </Button>
              <div className="flex w-full justify-center space-x-2">
                <Button
                  className="w-[48%]"
                  size="default"
                  variant="outline"
                  onClick={() => handleDelete(kostType.id)}
                >
                  Hapus
                </Button>
                <Button className="w-[48%]" size="default" variant="outline">
                  <Link
                    href={`/dashboard/kost-type/edit?kost_id=${kostId}&kost_type_id=${kostType.id}`}
                  >
                    Edit
                  </Link>
                </Button>
              </div>
              <Button
                className="w-full"
                size="default"
                variant="link"
                onClick={() => setShowDetails((prev) => !prev)}
              >
                {showDetails ? "Sembunyikan" : "Lihat Selengkapnya"}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default KostTypeCard;
