"use client";

import { useQuery } from "@tanstack/react-query";
import { subscriptionService } from "../services/subscription.service";

export const useSubscriptionAdmin = () => {
  const getAllSubscription = useQuery({
    queryKey: ["subscription", "current"],
    queryFn: subscriptionService.getAll,
  });

  return {
    getAllSubscription,
  };
};
