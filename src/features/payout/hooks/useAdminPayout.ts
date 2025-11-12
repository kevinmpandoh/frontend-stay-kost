// hooks/useAdminPayouts.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { payoutService } from "../services/payout.service";
import { AxiosError } from "axios";
import { useSearchParams } from "next/navigation";

export const useAdminPayouts = () => {
  const queryClient = useQueryClient();

  const searchParams = useSearchParams();

  const queryObject: Record<string, any> = {};
  searchParams.forEach((value, key) => {
    queryObject[key] = value;
  });

  const payoutsQuery = useQuery({
    queryKey: ["admin-payouts", queryObject], // supaya cache terpisah berdasarkan status
    queryFn: () => payoutService.getAllPayout(queryObject),
  });

  const retryPayout = useMutation({
    mutationFn: payoutService.retryPayout,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-payouts"],
      });
      toast.success("Payout berhasil diproses");
    },
    onError: (error) => {
      if (error instanceof AxiosError)
        toast.error(
          error?.response?.data?.message ||
            "Gagal mengubah rekening bank. silahkan coba lagi",
        );
    },
  });

  const checkStatusPayout = useMutation({
    mutationFn: payoutService.checkStatusPayout,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-payouts"],
      });
      toast.success("Cek status payout berhasil");
    },
    onError: (error) => {
      if (error instanceof AxiosError)
        toast.error(
          error?.response?.data?.message ||
            "Gagal mengecek status payout. silahkan coba lagi",
        );
    },
  });

  return {
    payouts: payoutsQuery.data,
    isLoading: payoutsQuery.isLoading,
    retryPayout,
    checkStatusPayout,
  };
};
