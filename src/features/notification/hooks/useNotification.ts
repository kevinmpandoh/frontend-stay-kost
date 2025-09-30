// features/notification/hooks/useNotification.ts
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notificationService } from "../services/notification.service";
import { toast } from "sonner";

export const useNotification = () => {
  const queryClient = useQueryClient();

  // ambil semua notifikasi
  const {
    data: notifications,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: notificationService.getNotifications,
  });

  // mark as read
  const markAsRead = useMutation({
    mutationFn: notificationService.markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: () => {
      toast.error("Gagal menandai notifikasi");
    },
  });

  // mark all as read
  const markAllAsRead = useMutation({
    mutationFn: notificationService.markAllAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success("Semua notifikasi ditandai sebagai sudah dibaca");
    },
  });

  // delete notification
  const deleteNotification = useMutation({
    mutationFn: notificationService.deleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success("Notifikasi berhasil dihapus");
    },
  });

  return {
    notifications,
    isLoading,
    isError,
    markAsRead: markAsRead.mutate,
    markAllAsRead: markAllAsRead.mutate,
    deleteNotification: deleteNotification.mutate,
  };
};
