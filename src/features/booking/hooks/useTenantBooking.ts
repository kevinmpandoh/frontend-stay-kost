"use client";
// hooks/useWishlist.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { bookingService } from "../booking.service";
import { useBookingStore } from "../booking.store";
import { useAuthStore } from "@/stores/auth.store";
import { AxiosError } from "axios";

export const useTenantBooking = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setSuccess } = useBookingStore();
  const { user } = useAuthStore();

  const { data: booking, isLoading } = useQuery({
    queryKey: ["bookings"], // supaya cache terpisah berdasarkan status
    queryFn: bookingService.getTenantBookings,
    enabled: user?.role === "tenant",
  });

  // Booking aktif (khusus status aktif)
  const { data: activeBooking, isLoading: loadingActive } = useQuery({
    queryKey: ["booking-active"],
    queryFn: bookingService.getActiveTenantBooking,
    enabled: user?.role === "tenant",
  });

  // Booking History (khusus status selesai)
  const { data: bookingHistory, isLoading: loadingHistory } = useQuery({
    queryKey: ["booking-tenant-history"],
    queryFn: bookingService.getTenantBookingHistory,
    enabled: user?.role === "tenant",
  });

  const { mutate: add, isPending: creating } = useMutation({
    mutationFn: bookingService.createBooking,
    onSuccess: () => {
      setSuccess(true);
      queryClient.invalidateQueries({ queryKey: ["booking"] });
      router.push("/booking-success");
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        toast.error(
          err.response?.data.message || "Terjadi kesalahan. Silahakn coba lagi",
        );
      }
    },
  });

  const { mutate: checkIn, isPending: checkingIn } = useMutation({
    mutationFn: bookingService.checkInBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] }); // Refresh booking list
      router.push("/user/kost-saya");
    },
    onError: (err: any) => {
      console.log(err);
      toast.error(
        err.response.data.message || "Terjadi kesalahan. Silahakn coba lagi",
      );
    },
  });

  const { mutate: reviewKost, isPending: isReview } = useMutation({
    mutationFn: ({ bookingId, data }: { bookingId: string; data: any }) =>
      bookingService.reviewKost(bookingId, data),
    onSuccess: () => {
      toast.success("Review berhasil diberikan");
      queryClient.invalidateQueries({
        queryKey: ["booking-active"],
      });
    },
  });
  const { mutate: checkOut, isPending: checkingOut } = useMutation({
    mutationFn: bookingService.checkOutBooking,
    onSuccess: () => {
      toast.success("Check-out Kost Berhasil");
      queryClient.invalidateQueries({
        queryKey: ["booking-active"],
      }); // Refresh booking list
    },
  });

  const { mutate: stopBooking, isPending: stopingBooking } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      bookingService.stopBooking(id, data),
    onSuccess: () => {
      toast.success("Permintaan berhenti sewa berhasil diajukan");
      queryClient.invalidateQueries({ queryKey: ["booking-active"] }); // Refresh booking list
    },
  });

  return {
    createBooking: add,
    creating,
    booking,
    isLoading,
    checkIn,
    reviewKost,
    isReview,
    checkingIn,
    activeBooking,
    loadingActive,
    bookingHistory,
    loadingHistory,
    stopBooking,
    stopingBooking,
    checkOut,
    checkingOut,
  };
};
