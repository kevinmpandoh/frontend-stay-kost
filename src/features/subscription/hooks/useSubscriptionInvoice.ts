"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { subscriptionService } from "../services/subscription.service";

export const useSubscriptionInvoice = () => {
  const queryClient = useQueryClient();

  const {
    data: invoices,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["subscriptionInvoices"],
    queryFn: subscriptionService.getInvoices,
  });

  const { mutate: cancelInvoice, isPending: cancelling } = useMutation({
    mutationFn: subscriptionService.cancelInvoice,
    onSuccess: () => {
      toast.success("Invoice berhasil dibatalkan");
      queryClient.invalidateQueries({ queryKey: ["subscriptionInvoices"] });
    },
    onError: () => {
      toast.error("Gagal membatalkan invoice");
    },
  });

  return {
    invoices,
    isLoading,
    error,
    cancelInvoice,
    cancelling,
  };
};
