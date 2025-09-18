"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { kostService } from "../services/kost.service";

export const useKost = (id?: string) => {
  // const queryClient = useQueryClient();
  // const router = useRouter();
  const searchParams = useSearchParams();

  const queryObject: Record<string, any> = {};
  searchParams.forEach((value, key) => {
    queryObject[key] = value;
  });

  const kostList = useQuery({
    queryKey: ["kosts", queryObject],
    queryFn: () => kostService.getKostList(queryObject),
  });

  const kostDetail = useQuery({
    queryKey: ["kosts", id],
    queryFn: () => kostService.getKostDetail(id!),
    enabled: !!id,
    staleTime: 1000 * 60,
  });

  return {
    kostList,
    kostDetail,
  };
};
