import api from "@/lib/api";
import { handleAxiosError } from "@/utils/handleAxiosError";

export const kostService = {
  getKostList: async (params: Record<string, any>) => {
    try {
      const res = await api.get("/kost", { params });
      return res.data;
    } catch (error: any) {
      // 🧠 fallback kalau error 400
      if (error.response && error.response.status === 400) {
        return { data: [], pagination: { page: 1, totalPages: 1 } };
      }
      throw error;
    }
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
