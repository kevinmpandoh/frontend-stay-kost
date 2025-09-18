"use client";

import {
  changeOwnerPassword,
  getOwnerCurrent,
  uploadProfile,
} from "@/services/owner.service";
import { useAuthStore } from "@/stores/auth.store";
import { User } from "@/types/user.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useOwner = () => {
  const queryClient = useQueryClient();
  const { user, setUser } = useAuthStore();
  //   const { mutate: updateProfile, isPending: updatetingProfile } = useMutation({
  //     mutationFn: tenantService.updateTenantCurrent,
  //     onSuccess: (res) => {
  //       setUser(res.data);
  //       queryClient.invalidateQueries({ queryKey: ["currentTenant", "me"] });
  //     },
  //   });

  const getCurrentOwner = useQuery({
    queryKey: ["ownerCurrent"], // supaya cache terpisah berdasarkan status
    queryFn: () => getOwnerCurrent(),
  });

  const { mutate: changePassword, isPending: isChanging } = useMutation({
    mutationFn: changeOwnerPassword,
    onSuccess: () => {
      toast.success("Password berhasil diubah");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Gagal mengubah password");
    },
  });

  const uploadPhotoMutation = useMutation({
    mutationFn: async (file: File) => {
      if (!user?.id) throw new Error("User tidak ditemukan");
      const formData = new FormData();
      formData.append("photo_profile", file);
      formData.append("tenantId", user.id); // ⬅️ tambahkan tenantId ke form

      const response = await uploadProfile(formData);
      return response;
    },
    onSuccess: (data) => {
      if (data?.url) {
        // Update state user
        setUser({ ...user, foto_profile: data.url } as User);
        // Optionally, refetch profile data
      }
      queryClient.invalidateQueries({ queryKey: ["ownerCurrent"] });
    },
    onError: (err) => {
      console.error("Upload gagal:", err);
    },
  });

  return {
    changePassword,
    isChanging,
    getCurrentOwner,
    uploadPhoto: uploadPhotoMutation,
  };
};
