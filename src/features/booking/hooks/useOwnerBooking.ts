"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { bookingService } from "../booking.service";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export const useOwnerBooking = (bookingId?: string) => {
  const queryClient = useQueryClient();

  const searchParams = useSearchParams();

  const queryObject: Record<string, any> = {};
  searchParams.forEach((value, key) => {
    queryObject[key] = value;
  });

  const { data: bookings, isLoading } = useQuery({
    queryKey: ["owner-bookings", queryObject],
    queryFn: () => bookingService.getOwnerBookings(queryObject),
  });

  // // Booking aktif (khusus status aktif)

  const { mutate: approveBooking, isPending: approving } = useMutation({
    mutationFn: ({ id, room }: { id: string; room: string }) =>
      bookingService.approveBookings(id, room),
    onSuccess: () => {
      toast.success("Pengajuan sewa berhasil diterima");
      queryClient.invalidateQueries({ queryKey: ["owner-bookings"] }); // Refresh booking list
    },
  });
  const { mutate: rejectBooking, isPending: rejecting } = useMutation({
    mutationFn: ({ bookingId, data }: { bookingId: string; data: any }) =>
      bookingService.rejectBookings(bookingId, data),
    onSuccess: () => {
      toast.success("Pengajuan sewa berhasil ditolak");
      queryClient.invalidateQueries({ queryKey: ["owner-bookings"] }); // Refresh booking list
    },
  });
  const { mutate: checkOut, isPending: checkingOut } = useMutation({
    mutationFn: bookingService.checkOutBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["booking"] }); // Refresh booking list
    },
  });

  const { mutate: stopBooking, isPending: stopingBooking } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      bookingService.stopBooking(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["booking"] }); // Refresh booking list
    },
  });

  const acceptMutation = useMutation({
    mutationFn: (bookingId: string) => bookingService.acceptStopRent(bookingId),
    onSuccess: () => {
      toast.success("Pengajuan berhasil disetujui");
      queryClient.invalidateQueries({
        queryKey: ["bookingActive"],
      });
    },
    onError: () => {
      toast.error("Gagal menyetujui pengajuan");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: ({
      reason,
      bookingId,
    }: {
      reason: string;
      bookingId: string;
    }) => bookingService.rejectStopRent(bookingId, reason),
    onSuccess: () => {
      toast.success("Pengajuan berhasil ditolak");
      queryClient.invalidateQueries({
        queryKey: ["bookingActive"],
      });
    },
    onError: (err) => {
      console.log(err, "ERRORNYA");
      toast.error("Gagal menolak pengajuan");
    },
  });

  return {
    bookings,
    isLoading,

    approveBooking,
    approving,
    rejectBooking,
    rejecting,
    stopBooking,
    stopingBooking,
    checkOut,
    checkingOut,
    acceptMutation,
    rejectMutation,
  };
};
