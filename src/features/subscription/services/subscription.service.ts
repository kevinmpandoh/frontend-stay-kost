import api from "@/lib/api";

export const subscriptionService = {
  // Ambil subscription aktif user (owner)
  getCurrentSubscription: async () => {
    const response = await api.get("/subscriptions/current");
    return response.data.data;
  },

  // Owner pilih paket → create subscription (status pending, invoice dibuat)
  createSubscription: async (packageId: string, duration: number) => {
    const response = await api.post("/subscriptions", { packageId, duration });
    return response.data;
  },
  getOwnerSubscriptions: async () => {
    const response = await api.get("/subscriptions/me");
    return response.data.data;
  },

  getInvoices: async () => {
    const res = await api.get("/subscriptions/invoices");
    return res.data.data;
  },

  // Ambil semua subscription (khusus admin)
  getAll: async () => {
    const response = await api.get("/subscriptions");
    return response.data;
  },

  // Aktifkan subscription (dipakai admin / callback Midtrans)
  activate: async (subscriptionId: string) => {
    const response = await api.post(
      `/subscriptions/${subscriptionId}/activate`,
    );
    return response.data.data;
  },

  // Batalkan subscription
  cancelInvoice: async (invoiceId: string) => {
    const res = await api.post(`/subscriptions/invoices/${invoiceId}/cancel`);
    return res.data;
  },

  // Perpanjang subscription
  renew: async (subscriptionId: string, duration: number) => {
    const response = await api.post(`/subscriptions/${subscriptionId}/renew`, {
      duration,
    });
    return response.data;
  },
};
