// services/package.service.ts
import api from "@/lib/api";

export const packageService = {
  getAllPackageAvailable: async () => {
    const res = await api.get("/packages/available");
    return res.data.data;
  },
};
