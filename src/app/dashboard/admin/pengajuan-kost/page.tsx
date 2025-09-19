"use client";

import React, { useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import RejectKostModal from "./RejectKostModal";
import { kostAdminService } from "@/features/kost/services/kostAdmin.service";
import PageHeader from "@/components/common/PageHeader";
import { KostSubmissionTable } from "./KostSubmissionTable";
import { useConfirm } from "@/hooks/useConfirmModal";
import SearchInput from "@/components/common/SearchInput";
import FilterBar from "@/components/common/FitlerBar";

const AdminKostSubmissionsPage = () => {
  const router = useRouter();
  const [selectedKost, setSelectedKost] = useState<any>(null);

  const [showRejectModal, setShowRejectModal] = useState(false);
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "1");
  const confirm = useConfirm();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["kost-submissions"],
    queryFn: () => kostAdminService.getKostSubmission(),
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
      queryClient.invalidateQueries({ queryKey: ["kost-submissions"] }); // Refresh booking list
    },
  });

  const kosts = data?.data || [];
  const pagination = data?.pagination;

  if (isLoading) return <p>Loading...</p>;

  const setPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/dashboard/admin/bookings?${params.toString()}`);
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

  const handleReject = async (reason: string) => {
    rejectKost({ kostId: selectedKost.id, reason });

    setShowRejectModal(false);
    refetch();
  };

  return (
    <>
      {/* <h1 className="mb-4 text-2xl font-bold">Pengajuan Kost Baru</h1> */}
      <PageHeader title="Pengajuan Kost Baru" />

      {/* <FilterBar>
        <SearchInput />
      </FilterBar> */}

      <KostSubmissionTable
        data={kosts}
        loading={isLoading}
        pagination={
          pagination ? { page, totalPages: pagination.totalPages } : undefined
        }
        onPageChange={setPage}
        onApprove={handleAccept}
        onReject={(kost) => {
          setSelectedKost(kost);
          setShowRejectModal(true);
        }}
      />

      {/* Modal Tolak dengan alasan */}
      <RejectKostModal
        open={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        onConfirm={handleReject}
      />
    </>
  );
};

export default AdminKostSubmissionsPage;
