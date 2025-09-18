import api from "@/lib/api";
import { handleAxiosError } from "@/utils/handleAxiosError";

export const kostAdminService = {
  getKostSubmission: async () => {
    const res = await api.get("/admin/kost");
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
