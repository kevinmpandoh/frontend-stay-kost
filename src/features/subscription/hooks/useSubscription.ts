"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { subscriptionService } from "../services/subscription.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useSubscription = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  // Query subscription aktif
  const {
    data: currentSubscription,

    isError,
    refetch,
  } = useQuery({
    queryKey: ["subscription", "current"],
    queryFn: subscriptionService.getCurrentSubscription,
  });

  const { data: ownerSubscriptions, isLoading: loadingSub } = useQuery({
    queryKey: ["subscription", "me"],
    queryFn: subscriptionService.getOwnerSubscriptions,
  });

  // const { data: invoices, isLoading: isLoadingInvoices } = useQuery({
  //   queryKey: ["subscriptionInvoices"],
  //   queryFn: subscriptionService.getInvoices,
  // });

  // Mutation: create
  const createSubscription = useMutation({
    mutationFn: ({
      packageId,
      duration,
    }: {
      packageId: string;
      duration: number;
    }) => subscriptionService.createSubscription(packageId, duration),
    onSuccess: (res) => {
      toast.success("Subscription berhasil dibuat, silakan lakukan pembayaran");
      router.push(`/payments?invoice=${res.data.invoiceNumber}`);
      queryClient.invalidateQueries({ queryKey: ["subscription", "current"] });
    },
    onError: () => {
      toast.error("Gagal membuat subscription");
    },
  });

  // Mutation: activate
  const activateSubscription = useMutation({
    mutationFn: (subscriptionId: string) =>
      subscriptionService.activate(subscriptionId),
    onSuccess: () => {
      toast.success("Subscription berhasil diaktifkan");
      queryClient.invalidateQueries({ queryKey: ["subscription", "current"] });
    },
    onError: () => {
      toast.error("Gagal mengaktifkan subscription");
    },
  });

  // Mutation: cancel
  // const cancelSubscription = useMutation({
  //   mutationFn: (subscriptionId: string) =>
  //     subscriptionService.cancelInvoice(subscriptionId),
  //   onSuccess: () => {
  //     toast.success("Subscription dibatalkan");
  //     queryClient.invalidateQueries({ queryKey: ["subscription", "current"] });
  //   },
  //   onError: () => {
  //     toast.error("Gagal membatalkan subscription");
  //   },
  // });

  // Mutation: renew
  const renewSubscription = useMutation({
    mutationFn: ({
      subscriptionId,
      duration,
    }: {
      subscriptionId: string;
      duration: number;
    }) => subscriptionService.renew(subscriptionId, duration),
    onSuccess: (res) => {
      toast.success(
        "Subscription berhasil perbarui, silakan lakukan pembayaran",
      );
      router.push(`/payments?invoice=${res.data.invoiceNumber}`);
      queryClient.invalidateQueries({ queryKey: ["subscription", "current"] });
    },
    onError: () => {
      toast.error("Gagal memperpanjang subscription");
    },
  });

  return {
    currentSubscription,

    // invoices,
    // isLoadingInvoices,
    isError,
    refetch,
    createSubscription,
    activateSubscription,
    // cancelSubscription,
    renewSubscription,
    loadingSub,
    ownerSubscriptions,
  };
};
