"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { reviewService } from "@/features/review/services/review.service";
import React, { useState } from "react";
import { ReviewDetailModal } from "./ReviewDetailModal";
import { useRouter, useSearchParams } from "next/navigation";
import SearchInput from "@/components/common/SearchInput";
import { useConfirm } from "@/hooks/useConfirmModal";
import { useAdminReview } from "@/features/review/hooks/useAdminReview";
import { ReviewTable } from "./ReviewTable";
import PageHeader from "@/components/common/PageHeader";
import FilterBar from "@/components/common/FitlerBar";
import FilterSelect from "@/components/common/FilterSelect";

const AdminReviews = () => {
  const [search, setSearch] = useState(""); // untuk dikirim ke backend
  const [rating, setRating] = useState<string | undefined>();
  const [detailReview, setDetailReview] = useState<any | null>(null);
  const { deleteReview } = useAdminReview();
  const confirm = useConfirm();
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = parseInt(searchParams.get("page") ?? "1");

  const { data, isLoading } = useQuery({
    queryKey: ["admin-review", page, search, rating],
    queryFn: () =>
      reviewService.getAdminReview({
        page,
        limit: 10,
        search: search || undefined,
        rating: rating && rating !== "all" ? parseInt(rating) : undefined,
      }),
  });

  const reviews = data?.data || [];
  const pagination = data?.pagination;

  const setPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/dashboard/admin/reviews?${params.toString()}`);
  };

  const handleSearch = (value: string) => {
    setPage(1); // reset page
    setSearch(value);
  };

  const handleResetSearch = () => {
    setPage(1);
    setSearch("");
  };

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

  const handleRatingChange = (val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("rating", val);
    params.set("page", "1");
    router.push(`/dashboard/admin/reviews?${params.toString()}`);
    setRating(val);
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <PageHeader title="Rating dan Ulasan Kost" />

      <FilterBar>
        <SearchInput
          placeholder="Cari Nama Penyewa"
          paramKey="search"
          // onSearch={handleSearch}
          // onReset={handleResetSearch}
        />

        <FilterSelect
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

        {/* <Select value={rating} onValueChange={handleRatingChange}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter Rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua</SelectItem>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="4">4</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="1">1</SelectItem>
          </SelectContent>
        </Select> */}
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
          onPageChange={setPage}
          onDetail={(review) => setDetailReview(review)}
          onDelete={handleDelete}
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
