"use client";

import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { bookingService } from "@/features/booking/booking.service";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { BookingDetailDialog } from "./BookingDetailDialog";
import { BookingEditDialog } from "./BookingEditDialog";
import { BookingTable } from "./BookingTable";
import PageHeader from "@/components/common/PageHeader";

const AdminBooking = () => {
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const [editingBooking, setEditingBooking] = useState<any | null>(null);
  const queryClient = useQueryClient();

  const searchParams = useSearchParams();
  const router = useRouter();
  const page = parseInt(searchParams.get("page") ?? "1");

  const { data, isLoading } = useQuery({
    queryKey: ["admin-bookings", page],
    queryFn: () => bookingService.getAdminBookings({ page, limit: 10 }),
  });

  const { mutate: updateBooking, isPending } = useMutation({
    mutationFn: ({ id, values }: { id: string; values: any }) =>
      bookingService.updateBooking(id, values),
    onSuccess: () => {
      toast.success("Booking berhasil di edit");
      setEditingBooking(null);
      queryClient.invalidateQueries({ queryKey: ["admin-bookings"] });
    },
  });

  const bookings = data?.data || [];
  const pagination = data?.pagination;

  const setPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/dashboard/admin/bookings?${params.toString()}`);
  };

  return (
    <>
      <PageHeader title="Booking Admin" />

      <BookingTable
        data={bookings}
        loading={isLoading}
        pagination={
          pagination ? { page, totalPages: pagination.totalPages } : undefined
        }
        onPageChange={setPage}
        onDetail={setSelectedBooking}
        onEdit={setEditingBooking}
      />

      <BookingDetailDialog
        open={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
        data={selectedBooking}
      />

      <BookingEditDialog
        open={!!editingBooking}
        onClose={() => setEditingBooking(null)}
        data={editingBooking}
        loading={isPending}
        onSubmit={(values) => updateBooking({ id: editingBooking.id, values })}
      />
    </>
  );
};

export default AdminBooking;
