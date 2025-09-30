"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { reviewService } from "../services/review.service";

export const useAdminReview = () => {
  const queryClient = useQueryClient();

  const searchParams = useSearchParams();

  const queryObject: Record<string, any> = {};
  searchParams.forEach((value, key) => {
    queryObject[key] = value;
  });

  const reviews = useQuery({
    queryKey: ["admin-review", queryObject],
    queryFn: () => reviewService.getAdminReview(queryObject),
  });

  const deleteReview = useMutation({
    mutationKey: ["admin-review"],
    mutationFn: reviewService.deleteReview,
    onSuccess: () => {
      toast.success("Review berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["admin-review"] });
    },
    onError: (error: any) => {
      // handle error, e.g. show toast
      console.error(error);
    },
  });

  return {
    reviews: reviews.data,
    isLoading: reviews.isLoading,
    deleteReview,
  };
};
