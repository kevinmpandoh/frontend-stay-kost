// services/payoutService.ts

import api from "@/lib/api";

export const payoutService = {
  getPayoutInfo: async () => {
    const res = await api.get("/owner/payout");
    return res.data.data;
  },
  updatePayoutInfo: async (data: any) => {
    const res = await api.put("/owner/payout", data);
    return res.data;
  },
  getBanks: async () => {
    const res = await api.get("/owner/banks");
    return res.data.data.beneficiary_banks;
  },
  getAllPayout: async (params: Record<string, any>) => {
    const res = await api.get("/payouts", {
      params,
    });
    return res.data;
  },
  retryPayout: async (payoutId: string) => {
    const res = await api.post(`/payouts/${payoutId}/send`);
    return res.data;
  },
};
