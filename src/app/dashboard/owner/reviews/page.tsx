"use client";

import React, { useState } from "react";
import { ReviewDetailModal } from "../../../../features/review/components/ReviewDetailModal";
import { useRouter, useSearchParams } from "next/navigation";
import { useReview } from "@/features/review/hooks/useReview";
import PageHeader from "@/components/common/PageHeader";
import { ReviewTable } from "./ReviewTable";
import SearchInput from "@/components/common/SearchInput";
import FilterSelect from "@/components/common/FilterSelect";

const ReviewOwner = () => {
  const [detailReview, setDetailReview] = useState<any | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  const { ownerReview } = useReview();
  const { data, isLoading } = ownerReview;

  const page = parseInt(searchParams.get("page") ?? "1");

  const setPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/dashboard/owner/reviews?${params.toString()}`);
  };

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  const reviews = data?.data || [];
  const pagination = data?.pagination;

  return (
    <>
      <PageHeader title="Rating dan Ulasan" />

      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <SearchInput placeholder="Cari Nama Penyewa" paramKey="search" />

        <FilterSelect
          placeholder="Pilih Rating"
          paramKey="rating"
          options={[
            { value: "all", label: "Semua" },
            { value: "5", label: "5" },
            { value: "4", label: "4" },
            { value: "3", label: "3" },
            { value: "2", label: "2" },
            { value: "1", label: "1" },
          ]}
        />
      </div>

      <div className="rounded-lg bg-white p-6">
        <ReviewTable
          data={reviews}
          loading={isLoading}
          pagination={
            pagination
              ? { page: page, totalPages: pagination.totalPages }
              : undefined
          }
          onPageChange={setPage}
          onDetail={(review) => setDetailReview(review)}
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

export default ReviewOwner;
