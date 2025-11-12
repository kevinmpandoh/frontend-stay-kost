import api from "@/lib/api";
import { handleAxiosError } from "@/utils/handleAxiosError";

export const userService = {
  getCurrentUser: async () => {
    const response = await api.get(`/users/current`);
    return response.data.user;
  },
  updateCurrent: async (data: any) => {
    const response = await api.put(`/users/current`, data);
    return response.data;
  },
  updateBankAccount: async (data: any) => {
    const response = await api.put(`/users/bank-account`, data);
    return response.data.data;
  },

  getBanks: async () => {
    const response = await api.get(`/users/banks`);
    return response.data.data;
  },

  changePassword: async (data: any) => {
    const response = await api.put(`/users/change-password`, data);
    return response.data.data;
  },

  getAllTenants: async (): Promise<any> => {
    try {
      const response = await api.get(`/users/tenants`);
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },

  getAllOwners: async () => {
    const res = await api.get("/users/owners");
    return res.data;
  },
  getAllAdmins: async () => {
    const res = await api.get("/users/admins");
    return res.data;
  },
  uploadProfile: async (formData: FormData): Promise<any> => {
    try {
      const response = await api.post(`/users/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
};
