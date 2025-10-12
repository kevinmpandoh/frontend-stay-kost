"use client";

import React, { useState } from "react";
import { ReviewDetailModal } from "./ReviewDetailModal";
import SearchInput from "@/components/common/SearchInput";
import { useConfirm } from "@/hooks/useConfirmModal";
import { useAdminReview } from "@/features/review/hooks/useAdminReview";
import { ReviewTable } from "./ReviewTable";
import PageHeader from "@/components/common/PageHeader";
import FilterBar from "@/components/common/FitlerBar";
import FilterSelect from "@/components/common/FilterSelect";
import { useRouter, useSearchParams } from "next/navigation";

const AdminReviews = () => {
  const [detailReview, setDetailReview] = useState<any | null>(null);
  const { deleteReview } = useAdminReview();
  const confirm = useConfirm();
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = parseInt(searchParams.get("page") ?? "1");

  const { reviews: data, isLoading } = useAdminReview();

  const reviews = data?.data || [];
  const pagination = data?.pagination;

  const handleDelete = async (reviewId: string) => {
    const ok = await confirm({
      title: "Anda yakin ingin menghapus review ini?",
      description:
        "Apakah kamu yakin ingin menghapus data ini? Tindakan ini tidak bisa dibatalkan.",
      confirmText: "Hapus",
      cancelText: "Batal",
    });

    if (ok) {
      deleteReview.mutate(reviewId);
    }
  };

  const setPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/dashboard/admin/kost?${params.toString()}`);
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <PageHeader title="Rating dan Ulasan Kost" />

      <FilterBar>
        <SearchInput placeholder="Cari Nama Penyewa" paramKey="search" />

        <FilterSelect
          paramKey="rating"
          placeholder="Pilih Rating"
          options={[
            { value: "all", label: "Semua" },
            { value: "5", label: "5" },
            { value: "4", label: "4" },
            { value: "3", label: "3" },
            { value: "2", label: "2" },
            { value: "1", label: "1" },
          ]}
        />
      </FilterBar>

      <div className="rounded-lg bg-white p-6">
        <ReviewTable
          data={reviews}
          loading={isLoading}
          pagination={
            pagination
              ? { page: page, totalPages: pagination.totalPages }
              : undefined
          }
          onDetail={(review) => setDetailReview(review)}
          onDelete={handleDelete}
          onPageChange={setPage}
        />
      </div>

      <ReviewDetailModal
        open={!!detailReview}
        data={detailReview}
        onClose={() => setDetailReview(null)}
      />
    </>
  );
};

export default AdminReviews;
