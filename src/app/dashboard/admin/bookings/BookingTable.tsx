"use client";

import { Button } from "@/components/ui/button";
import { Eye, Pen } from "lucide-react";
import { CommonTable } from "@/components/common/CommonTable";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { StatusBadge } from "@/components/common/StatusBadge";

interface BookingTableProps {
  data: any[];
  loading?: boolean;
  pagination?: { page: number; totalPages: number };
  onPageChange?: (page: number) => void;
  onDetail: (booking: any) => void;
  onEdit: (booking: any) => void;
}

export function BookingTable({
  data,
  loading,
  pagination,
  onPageChange,
  onDetail,
  onEdit,
}: BookingTableProps) {
  const columns = [
    {
      key: "tenant",
      header: "Nama Penyewa",
      render: (b: any) => b.tenant?.name ?? "-",
    },
    {
      key: "kost",
      header: "Nama Kost",
      render: (b: any) => b.kost?.name ?? "-",
    },
    {
      key: "startDate",
      header: "Tanggal Masuk",
      render: (b: any) =>
        b.startDate
          ? format(new Date(b.startDate), "dd MMM yyyy", { locale: id })
          : "-",
    },
    {
      key: "endDate",
      header: "Tanggal Keluar",
      render: (b: any) =>
        b.endDate
          ? format(new Date(b.endDate), "dd MMM yyyy", { locale: id })
          : "-",
    },
    {
      key: "duration",
      header: "Durasi",
      render: (b: any) => `${b.duration ?? "-"} Bulan`,
    },
    {
      key: "totalPrice",
      header: "Jumlah",
      render: (b: any) =>
        b.totalPrice
          ? `Rp ${b.totalPrice.toLocaleString("id-ID", { minimumFractionDigits: 0 })}`
          : "-",
    },
    {
      key: "status",
      header: "Status",
      render: (b: any) => <StatusBadge status={b.status} />,
    },
    {
      key: "actions",
      header: "Aksi",
      render: (b: any) => (
        <div className="flex items-center justify-center gap-2">
          {b.status === "pending" ||
            b.status === "waiting_for_payment" ||
            (b.status === "waiting_for_checkin" && (
              <Button size="sm" variant="outline" onClick={() => onEdit(b)}>
                <Pen className="h-4 w-4" />
              </Button>
            ))}
          <Button size="sm" variant="ghost" onClick={() => onDetail(b)}>
            <Eye className="h-4 w-4" />
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
      emptyMessage="Tidak ada data booking saat ini."
      pagination={pagination}
      onPageChange={onPageChange}
    />
  );
}
