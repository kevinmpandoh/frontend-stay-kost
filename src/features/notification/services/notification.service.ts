// features/notification/services/notification.service.ts
import api from "@/lib/api";

export const notificationService = {
  // ambil semua notifikasi
  getNotifications: async () => {
    const res = await api.get("/notifications");
    return res.data.data; // asumsi backend balikan { data: [...] }
  },

  // tandai notifikasi tertentu sebagai sudah dibaca
  markAsRead: async (id: string) => {
    const res = await api.put(`/notifications/${id}/read`);
    return res.data;
  },

  // tandai semua notifikasi sebagai sudah dibaca
  markAllAsRead: async () => {
    const res = await api.put("/notifications/read-all");
    return res.data;
  },

  // hapus notifikasi tertentu
  deleteNotification: async (id: string) => {
    const res = await api.delete(`/notifications/${id}`);
    return res.data;
  },
};
