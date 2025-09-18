"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { reviewService } from "../services/review.service";

export const useReview = () => {
  const queryClient = useQueryClient();

  const searchParams = useSearchParams();

  const queryObject: Record<string, any> = {};
  searchParams.forEach((value, key) => {
    queryObject[key] = value;
  });

  const ownerReview = useQuery({
    queryKey: ["owner-review", queryObject],
    queryFn: () => reviewService.getOwnerReview(queryObject),
  });

  const replyReview = useMutation({
    mutationFn: ({
      reviewId,
      message,
    }: {
      reviewId: string;
      message: string;
    }) => reviewService.replyReview(reviewId, message),
    onSuccess: () => {
      toast.success("Balasann Ulasan berhasil dikirim");
      queryClient.invalidateQueries({ queryKey: ["owner-review"] });
    },
  });

  const deleteReview = useMutation({
    mutationKey: ["delete-review"],
    mutationFn: reviewService.deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-review"] });
    },
    onError: (error: any) => {
      // handle error, e.g. show toast
      console.error(error);
    },
  });

  return {
    ownerReview,
    replyReview,
    deleteReview,
  };
};
