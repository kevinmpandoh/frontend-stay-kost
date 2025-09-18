import api from "@/lib/api";
import { handleAxiosError } from "@/utils/handleAxiosError";

export const kostService = {
  getKostList: async (params: Record<string, any>) => {
    const res = await api.get("/kost", { params });
    return res.data;
  },

  getKostDetail: async (kostId: string) => {
    try {
      const response = await api.get(`/kost/${kostId}`);

      return response.data.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
};
