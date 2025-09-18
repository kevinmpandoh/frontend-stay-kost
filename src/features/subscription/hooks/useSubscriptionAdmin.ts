"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { subscriptionService } from "../services/subscription.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useSubscriptionAdmin = () => {
  const getAllSubscription = useQuery({
    queryKey: ["subscription", "current"],
    queryFn: subscriptionService.getAll,
  });

  return {
    getAllSubscription,
  };
};
