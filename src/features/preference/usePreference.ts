"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { usePreferenceStore } from "./preference.store";
import { preferenceService } from "./preference.serivce";

export const usePreference = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    location,
    price,
    jenisKost,
    kostFacilities,
    roomFacilities,
    keamanan,
    reset,
  } = usePreferenceStore();
  const preferences = useQuery({
    queryKey: ["preference"], // supaya cache terpisah berdasarkan status
    queryFn: preferenceService.getPreference,
  });

  const savePreferences = useMutation({
    mutationFn: () =>
      preferenceService.createOrUpdatePreference({
        address: {
          type: location?.via,
          province: location?.provinsi,
          city: location?.kabupaten,
          district: location?.kecamatan,
          coordinates: {
            lat: location?.lat,
            lng: location?.lng,
          },
        },
        price: {
          min: price.min,
          max: price.max,
        },
        kostType: jenisKost,
        kostFacilities,
        roomFacilities,
        rules: keamanan,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kosts", "preference"] });
      reset();
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
