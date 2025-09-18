// hooks/usePayout.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPayoutInfo,
  updatePayoutInfo,
} from "@/features/payout/services/payout.service";

export const usePayout = () => {
  return useQuery({
    queryKey: ["payoutInfo"],
    queryFn: getPayoutInfo,
  });
};

export const useUpdatePayout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePayoutInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payoutInfo"] });
    },
  });
};
