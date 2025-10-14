"use client";

import { Button } from "@/components/ui/button";
import { Eye, MapPin, Pen } from "lucide-react";
import { CommonTable } from "@/components/common/CommonTable";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { StatusBadge } from "@/components/common/StatusBadge";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface KostSubmissionTableProps {
  data: any[];
  loading?: boolean;
  pagination?: { page: number; totalPages: number };
  onPageChange?: (page: number) => void;
  onApprove: (kost: any) => void;
  onReject: (kost: any) => void;
}

export function KostSubmissionTable({
  data,
  loading,
  pagination,
  onPageChange,
  onApprove,
  onReject,
}: KostSubmissionTableProps) {
  const router = useRouter();
  const columns = [
    {
      key: "kost",
      header: "Nama Kost",
      render: (kost: any) => (
        <div className="flex items-center gap-3">
          <Image
            alt="Room"
            className="h-20 w-28 rounded-md object-cover"
            height={80}
            width={110}
            src={kost.photo || "/kost.jpg"}
          />
          <div>
            <span className="block font-medium text-gray-800 dark:text-white/90">
              {`${kost.name}`}
            </span>
            <div className="flex items-center gap-1 text-sm">
              <MapPin size={18} />
              <span className="overflow-auto capitalize">
                {`${kost.address}` || "Lokasi tidak tersedia"}
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "owner",
      header: "Pemilik Kost",
      render: (kost: any) => kost.owner?.name ?? "-",
    },
    {
      key: "createdAt",
      header: "Tanggal Diajukan",
      render: (kost: any) =>
        kost.createdAt
          ? format(new Date(kost.createdAt), "d MMMM yyyy", {
              locale: id,
            })
          : "-",
    },

    {
      key: "status",
      header: "Status",
      render: (kost: any) => <StatusBadge status={kost.status} />,
    },
    {
      key: "actions",
      header: "Aksi",
      render: (kost: any) => (
        <div
          className="flex items-center justify-center gap-2 px-6"
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/dashboard/admin/kost/${kost.id}`)}
          >
            <Eye className="mr-1 h-4 w-4" /> Detail
          </Button>
          {kost.status?.toLowerCase() === "pending" && (
            <>
              <Button
                variant="outline"
                onClick={() => {
                  onReject(kost);
                }}
              >
                Tolak
              </Button>
              <Button
                onClick={() => {
                  onApprove(kost);
                }}
              >
                Terima
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <CommonTable
      columns={columns}
      data={data}
      loading={loading}
      emptyMessage="Tidak ada data kost saat ini."
      pagination={pagination}
      onPageChange={onPageChange}
    />
  );
}
