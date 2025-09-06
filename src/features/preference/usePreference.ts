"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { usePreferenceStore } from "./preference.store";
import { preferenceService } from "./preference.serivce";
import { toast } from "sonner";

export const usePreference = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const preferences = useQuery({
    queryKey: ["preference"], // supaya cache terpisah berdasarkan status
    queryFn: preferenceService.getPreference,
  });

  const savePreferences = useMutation({
    mutationFn: preferenceService.createOrUpdatePreference,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kosts", "preference"] });
      toast.success("Preferensi berhasil disimpan");
      router.push("/");
    },
    onError: (error) => {
      console.error("Gagal menyimpan preferensi:", error);
    },
  });

  const updatePreference = useMutation({
    mutationFn: preferenceService.createOrUpdatePreference,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kosts", "preference"] });
    },
    onError: (error) => {
      console.error("Gagal menyimpan preferensi:", error);
    },
  });

  return {
    preferences,
    savePreferences,
    updatePreference,
  };
};
