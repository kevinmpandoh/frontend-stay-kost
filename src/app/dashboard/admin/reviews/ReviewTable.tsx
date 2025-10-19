"use client";

import { Button } from "@/components/ui/button";
import { Info, Star, Trash } from "lucide-react";
import { CommonTable } from "@/components/common/CommonTable";
import Image from "next/image";

interface ReviewTableProps {
  data: any[];
  loading?: boolean;
  pagination?: { page: number; totalPages: number };
  onPageChange?: (page: number) => void;
  onDetail: (review: any) => void;
  onDelete: (id: string) => void;
}

export function ReviewTable({
  data,
  loading,
  pagination,
  onPageChange,
  onDetail,
  onDelete,
}: ReviewTableProps) {
  const columns = [
    {
      key: "tenantName",
      header: "Nama Penyewa",
      render: (review: any) => (
        <div className="flex items-center gap-2">
          <Image
            src="/profile-default.png"
            alt="foto"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span>{review.tenantName ?? "Penyewa"}</span>
        </div>
      ),
    },
    { key: "roomType", header: "Nama Kost" },
    {
      key: "rating",
      header: "Rating",
      render: (review: any) => (
        <div className="flex items-center gap-1">
          {Array.from({ length: review.rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
      ),
    },
    {
      key: "comment",
      header: "Komentar",
      render: (review: any) => (
        <p className="w-64 truncate">{review.comment || "-"}</p>
      ),
    },
    {
      key: "createdAt",
      header: "Tanggal",
      render: (review: any) =>
        // format(new Date(review?.createdAt), "dd MMM yyyy", { locale: id }),
        review?.createdAt,
    },
    {
      key: "actions",
      header: "Aksi",
      render: (review: any) => (
        <div className="flex justify-center space-x-1.5">
          <Button size={"lg"} variant="ghost" onClick={() => onDetail(review)}>
            <Info />
          </Button>
          <Button
            size={"lg"}
            variant={"ghost"}
            className="text-red-600"
            onClick={() => onDelete(review.id)}
          >
            <Trash />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <CommonTable
      columns={columns}
      data={data}
      loading={loading}
      emptyMessage="Belum ada review"
      pagination={pagination}
      onPageChange={onPageChange}
    />
  );
}
