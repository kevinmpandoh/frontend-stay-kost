"use client";
import { paymentService } from "@/features/payment/services/payment.service";
import { useAuthStore } from "@/stores/auth.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const usePayment = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const router = useRouter();
  const { data: tenantPayment, isLoading } = useQuery({
    queryKey: ["payment-tenant", user?.id], // cache terpisah per user
    queryFn: () => paymentService.getTenantPayments(),
    enabled: !!user && user.role === "tenant",
  });

  const { mutate: confirmPayment, isPending: confirmingPayment } = useMutation({
    mutationFn: (paymentId: string) => paymentService.confirmPayment(paymentId),
    onSuccess: (response) => {
      const paymentStatus = response?.status;
      if (paymentStatus === "success") {
        toast.success("Tagihan berhasil dibayarkan.");
        if (response.type === "tenant") {
          router.push("/user/pengajuan-sewa");
          return;
        } else if (response.type === "owner") {
          router.push("/dashboard/owner/pengaturan/subscription");
          return;
        }
      } else if (paymentStatus === "pending") {
        toast.info("Pembayaran belum masuk. Silakan cek kembali nanti.");
      } else {
        toast.error("Pembayaran tidak valid atau gagal.");
      }
      queryClient.invalidateQueries({ queryKey: ["invoice-payment"] });
    },
    onError: (error: unknown) => {
      if (
        error &&
        typeof error === "object" &&
        "isAxiosError" in error &&
        (error as AxiosError).isAxiosError
      ) {
        const axiosError = error as AxiosError<{ message: string }>;
        toast.error(
          axiosError.response?.data?.message ||
            "Gagal mengonfirmasi pembayaran.",
        );
      } else {
        toast.error("Terjadi kesalahan yang tidak diketahui.");
      }
    },
  });

  const { mutate: changeMethod, isPending: changingMethod } = useMutation({
    mutationFn: ({
      paymentId,
      provider,
      method,
      channel,
    }: {
      paymentId: string;
      provider: string;
      method: string;
      channel: string;
    }) =>
      paymentService.changePaymentMethod({
        paymentId,
        provider,
        method,
        channel,
      }),
    onSuccess: () => {
      toast.success("Berhasil mengganti metode pembayaran.");
      queryClient.invalidateQueries({
        queryKey: ["invoice-payment"],
      });
      // refetchPayment(); // Refresh data payment
    },
    onError: (error: unknown) => {
      if (
        error &&
        typeof error === "object" &&
        "isAxiosError" in error &&
        (error as AxiosError).isAxiosError
      ) {
        const axiosError = error as AxiosError<{ message: string }>;
        toast.error(
          axiosError.response?.data?.message ||
            "Gagal mengganti metode pembayaran.",
        );
      } else {
        toast.error("Terjadi kesalahan yang tidak diketahui.");
      }
    },
  });

  // const { mutate: changeMethod, isPending: changingMethod } = useMutation({
  //   mutationFn: ({
  //     paymentId,
  //     provider,
  //   }: {
  //     paymentId: string;
  //     provider: string;
  //   }) => paymentService.changePaymentMethod({ paymentId, provider }),
  //   onSuccess: () => {
  //     toast.success("Berhasil mengganti metode pembayaran.");
  //     queryClient.invalidateQueries({
  //       queryKey: ["billing", "payment"],
  //     });
  //     // refetchPayment(); // Refresh data payment
  //   },
  //   onError: (error: unknown) => {
  //     if (
  //       error &&
  //       typeof error === "object" &&
  //       "isAxiosError" in error &&
  //       (error as AxiosError).isAxiosError
  //     ) {
  //       const axiosError = error as AxiosError<{ message: string }>;
  //       toast.error(
  //         axiosError.response?.data?.message ||
  //           "Gagal mengganti metode pembayaran.",
  //       );
  //     } else {
  //       toast.error("Terjadi kesalahan yang tidak diketahui.");
  //     }
  //   },
  // });

  return {
    tenantPayment,
    isLoading,
    confirmPayment,
    confirmingPayment,
    changeMethod,
    changingMethod,
  };
};
