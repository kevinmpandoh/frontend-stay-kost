"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { preferenceService } from "../services/preference.serivce";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth.store";
import { kostService } from "@/features/kost/services/kost.service";

export const usePreference = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  const preferences = useQuery({
    queryKey: ["preference"], // supaya cache terpisah berdasarkan status
    queryFn: preferenceService.getPreference,
    enabled: isAuthenticated && user?.role === "tenant",
  });

  const preferenceKost = useQuery({
    queryKey: ["preference-kost"], // supaya cache terpisah berdasarkan status
    queryFn: async () => {
      if (!user || user.role !== "tenant") {
        // Belum login atau bukan tenant → ambil semua kost
        return kostService.getKostList({});
      }
      // Sudah login → cek preferensi
      const preferences = await preferenceService.getPreference();
      if (preferences) {
        return preferenceService.getPreferenceKosts(); // Ada preferensi → rekomendasi
      } else {
        return kostService.getKostList({}); // Tidak ada preferensi → semua kost
      }
    },
    enabled: user?.role === "tenant",
  });

  const savePreferences = useMutation({
    mutationFn: preferenceService.createOrUpdatePreference,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["preference-kost", "preference"],
      });
      toast.success("Preferensi berhasil disimpan");
    },
    onError: (error) => {
      console.error("Gagal menyimpan preferensi:", error);
    },
  });

  const updatePreference = useMutation({
    mutationFn: preferenceService.createOrUpdatePreference,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["preference-kost", "preference"],
      });
    },
    onError: (error) => {
      console.error("Gagal menyimpan preferensi:", error);
    },
  });

  return {
    preferences,
    preferenceKost,
    savePreferences,
    updatePreference,
  };
};
