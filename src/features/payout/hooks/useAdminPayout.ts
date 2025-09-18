// hooks/useAdminPayouts.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { payoutService } from "../services/payout.service";
import { AxiosError } from "axios";

export const useAdminPayouts = () => {
  const queryClient = useQueryClient();

  const payoutsQuery = useQuery({
    queryKey: ["admin-payouts"], // supaya cache terpisah berdasarkan status
    queryFn: payoutService.getAllPayout,
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

  return {
    payouts: payoutsQuery.data,
    isLoading: payoutsQuery.isLoading,
    retryPayout,
  };
};
