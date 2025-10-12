import api from "@/lib/api";
import { handleAxiosError } from "@/utils/handleAxiosError";

export const kostAdminService = {
  getListKost: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    rating?: number;
  }) => {
    const res = await api.get("/admin/kost", {
      params,
    });
    return res.data;
  },

  getKostById: async (kostId: string) => {
    const res = await api.get(`/admin/kost/${kostId}`);
    return res.data.data;
  },

  approveKost: async (kostId: string): Promise<any> => {
    try {
      const response = await api.patch(`/admin/kost/${kostId}/approve`);
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
  rejectKost: async (kostId: string, reason: string): Promise<any> => {
    try {
      const response = await api.patch(`/admin/kost/${kostId}/reject`, {
        rejectionReason: reason,
      });
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
};
