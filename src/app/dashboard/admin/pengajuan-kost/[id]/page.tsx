"use client";

import { useParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import RejectKostModal from "../RejectKostModal";
import { kostAdminService } from "@/features/kost/services/kostAdmin.service";

import { useConfirm } from "@/hooks/useConfirmModal";

const AdminKostDetailPage = () => {
  const { id } = useParams();

  const queryClient = useQueryClient();
  const confirm = useConfirm();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["admin-kost-detail", id],
    queryFn: () => kostAdminService.getKostById(id as string),
    enabled: !!id,
  });
  const { mutate: approveKost } = useMutation({
    mutationFn: (kostId: string) => kostAdminService.approveKost(kostId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kost-submissions"] }); // Refresh booking list
    },
  });

  const { mutate: rejectKost } = useMutation({
    mutationFn: ({ kostId, reason }: { kostId: string; reason: string }) =>
      kostAdminService.rejectKost(kostId, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kost"] }); // Refresh booking list
    },
  });

  const kost = data;

  // const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  // const handleAccept = async () => {
  //   // await kostService.acceptKost(id as string);
  //   setShowAcceptModal(false);
  //   refetch();
  // };

  const handleReject = async (reason: string) => {
    rejectKost({ kostId: "asd", reason });
    // await kostService.rejectKost(id as string, reason);
    setShowRejectModal(false);
    refetch();
  };

  const handleAccept = async (kost: any) => {
    const ok = await confirm({
      title: "Terima Pengajuan Kost?",

      description: `Apakah Anda yakin ingin menerima pengajuan kost "${kost?.name}"?`,

      confirmText: "Terima",

      cancelText: "Batal",
    });

    if (ok) {
      approveKost(kost.id);

      refetch();
    }
  };

  if (isLoading || !kost) return <p>Loading...</p>;

  return (
    <div className="mx-auto max-w-4xl rounded-md bg-white p-6 shadow">
      <h1 className="mb-2 text-2xl font-bold">{kost.name}</h1>
      <p className="mb-4 text-sm text-gray-600">{kost.address.detail}</p>

      <div className="mb-4 flex items-center gap-3">
        <Image
          src={kost.owner?.avatarUrl || "/profile-default.png"}
          width={40}
          height={40}
          alt="Owner"
          className="rounded-full"
        />
        <div>
          <p className="font-semibold">{kost.owner?.name}</p>
          <p className="text-sm text-gray-500">{kost.owner?.email}</p>
        </div>
      </div>

      <p className="mb-2 text-sm text-gray-500">
        Diajukan pada: 1 Desember 2024
      </p>

      <h2 className="mt-4 mb-1 text-lg font-semibold">Deskripsi</h2>
      <p className="mb-4">{kost.description}</p>

      <h2 className="mb-1 text-lg font-semibold">Jenis Kost</h2>
      <p className="mb-4">{kost.type}</p>

      <h2 className="mb-1 text-lg font-semibold">Fasilitas</h2>
      <ul className="mb-4 list-inside list-disc">
        {kost.facilities?.map((f: any, index: number) => (
          <li key={index}>{f.name}</li>
        ))}
      </ul>

      <h2 className="mb-2 text-lg font-semibold">Foto Kost</h2>
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {kost.photos?.map((photo: any, idx: number) => (
          <Image
            key={idx}
            src={photo.url}
            width={200}
            height={150}
            alt={`photo-${idx}`}
            className="h-[150px] w-full rounded-md object-cover"
          />
        ))}
      </div>

      {kost.status === "pending" && (
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setShowRejectModal(true)}>
            Tolak
          </Button>
          <Button onClick={() => handleAccept(kost)}>Terima</Button>
        </div>
      )}

      {/* Modal Konfirmasi Terima */}
      {/* <ApproveKostModal
        open={showAcceptModal}
        onCancel={() => setShowAcceptModal(false)}
        onConfirm={handleAccept}
        title="Terima Pengajuan Kost"
        description="Apakah Anda yakin ingin menerima pengajuan kost ini?"
      /> */}

      {/* Modal Tolak dengan Alasan */}
      <RejectKostModal
        open={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        onConfirm={handleReject}
      />
    </div>
  );
};

export default AdminKostDetailPage;
