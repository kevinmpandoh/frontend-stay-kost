// hooks/usePayout.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { payoutService } from "../services/payout.service";

export const usePayout = () => {
  return useQuery({
    queryKey: ["payoutInfo"],
    queryFn: payoutService.getPayoutInfo,
  });
};

export const useUpdatePayout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: payoutService.updatePayoutInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payoutInfo"] });
    },
  });
};
