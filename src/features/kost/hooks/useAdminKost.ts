"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { kostAdminService } from "../services/kostAdmin.service";

export const useAdminKost = () => {
  const queryClient = useQueryClient();

  const searchParams = useSearchParams();

  const queryObject: Record<string, any> = {};
  searchParams.forEach((value, key) => {
    queryObject[key] = value;
  });

  const kosts = useQuery({
    queryKey: ["kost-submissions", queryObject],
    queryFn: () => kostAdminService.getListKost(queryObject),
  });

  const approveKost = useMutation({
    mutationFn: (kostId: string) => kostAdminService.approveKost(kostId),
    onSuccess: () => {
      toast.success("Data kost berhasil diterima");
      queryClient.invalidateQueries({ queryKey: ["kost-submissions"] }); // Refresh booking list
    },
  });
  const rejectKost = useMutation({
    mutationFn: ({ kostId, reason }: { kostId: string; reason: string }) =>
      kostAdminService.rejectKost(kostId, reason),
    onSuccess: () => {
      toast.success("Data kost berhasil ditolak");
      queryClient.invalidateQueries({ queryKey: ["kost-submissions"] }); // Refresh booking list
    },
  });

  return {
    data: kosts.data,
    loadingKosts: kosts.isLoading,
    approveKost,
    rejectKost,
  };
};
