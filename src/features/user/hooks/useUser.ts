"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { userService } from "../services/user.service";
import { useAuthStore } from "@/stores/auth.store";
import { User } from "../user.type";
import { AxiosError } from "axios";

export const useUser = () => {
  const queryClient = useQueryClient();
  const { user, setUser } = useAuthStore();

  const userCurrent = useQuery({
    queryKey: ["user-current"], // supaya cache terpisah berdasarkan status
    queryFn: () => userService.getCurrentUser(),
  });

  const updateCurrentUser = useMutation({
    mutationFn: userService.updateCurrent,
    onSuccess: (res) => {
      setUser(res);
      toast.success("Profile berhasil di ubah");
      queryClient.invalidateQueries({ queryKey: ["user-current"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Gagal mengubah profile");
    },
  });

  const banks = useQuery({
    queryKey: ["banks"],
    queryFn: userService.getBanks,
    staleTime: Infinity, // data tidak akan pernah dianggap usang
    enabled: user?.role === "owner",
  });

  const updateBankAccount = useMutation({
    mutationFn: userService.updateBankAccount,
    onSuccess: () => {
      toast.success("Akun Bank berhasil diubah");
      queryClient.invalidateQueries({ queryKey: ["user-current"] });
    },
    onError: (error) => {
      if (error instanceof AxiosError)
        toast.error(
          error?.response?.data?.message ||
            "Gagal mengubah rekening bank. silahkan coba lagi",
        );
    },
  });

  const { mutate: changePassword, isPending: isChanging } = useMutation({
    mutationFn: userService.changePassword,
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

      const response = await userService.uploadProfile(formData);
      return response;
    },
    onSuccess: (data) => {
      if (data?.url) {
        // Update state user
        setUser({ ...user, photo: data.url } as User);
        // Optionally, refetch profile data
        queryClient.invalidateQueries({ queryKey: ["user-current"] });
      }
    },
    onError: (err) => {
      console.error("Upload gagal:", err);
    },
  });

  return {
    userCurrent,
    updateCurrentUser,
    changePassword,
    updateBankAccount,
    isChanging,
    banks,
    uploadPhoto: uploadPhotoMutation,
  };
};
