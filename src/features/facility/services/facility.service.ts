import api from "@/lib/api";

export const facilityService = {
  getAll: async () => {
    const response = await api.get(`/facilities`);
    return response.data.data;
  },
};
