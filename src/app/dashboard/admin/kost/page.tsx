"use client";

import React, { useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import RejectKostModal from "./RejectKostModal";
import PageHeader from "@/components/common/PageHeader";
import { KostSubmissionTable } from "./KostSubmissionTable";
import { useConfirm } from "@/hooks/useConfirmModal";
import SearchInput from "@/components/common/SearchInput";
import FilterBar from "@/components/common/FitlerBar";
import FilterSelect from "@/components/common/FilterSelect";
import { useAdminKost } from "@/features/kost/hooks/useAdminKost";
import StatusFilter from "@/components/common/StatusFilter";

const statusList = [
  { key: "all", label: "Semua" },
  { key: "pending", label: "Butuh Konfirmasi" },
  { key: "approved", label: "Diterima" },
  { key: "rejected", label: "Ditolak" },
  { key: "draft", label: "Draft" },
];

const AdminKostSubmissionsPage = () => {
  const router = useRouter();
  const [selectedKost, setSelectedKost] = useState<any>(null);

  const [showRejectModal, setShowRejectModal] = useState(false);
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "1");
  const confirm = useConfirm();

  const { data, loadingKosts, rejectKost, approveKost } = useAdminKost();

  const kosts = data?.data || [];
  const pagination = data?.pagination;

  if (loadingKosts) return <p>Loading...</p>;

  const setPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/dashboard/admin/kost?${params.toString()}`);
  };

  const handleAccept = async (kost: any) => {
    const ok = await confirm({
      title: "Terima Pengajuan Kost?",
      description: `Apakah Anda yakin ingin menerima pengajuan kost "${kost?.name}"?`,
      confirmText: "Terima",
      cancelText: "Batal",
    });

    if (ok) {
      approveKost.mutate(kost.id);
    }
  };

  const handleReject = async (reason: string) => {
    rejectKost.mutate({ kostId: selectedKost.id, reason });

    setShowRejectModal(false);
  };

  return (
    <>
      {/* <h1 className="mb-4 text-2xl font-bold">Pengajuan Kost Baru</h1> */}
      <PageHeader title="Pengajuan Kost Baru" />

      <FilterBar>
        <SearchInput placeholder="Cari Kost" paramKey="search" />

        <FilterSelect
          paramKey="type"
          placeholder="Pilih Tipe Kost"
          options={[
            { value: "all", label: "Semua" },
            { value: "putra", label: "Putra" },
            { value: "putri", label: "Putri" },
            { value: "campur", label: "Campur" },
          ]}
        />
      </FilterBar>

      <div className="mb-4">
        <StatusFilter statusList={statusList} paramKey="status" />
      </div>

      <KostSubmissionTable
        data={kosts}
        loading={loadingKosts}
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
