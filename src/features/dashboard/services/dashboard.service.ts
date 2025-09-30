import api from "@/lib/api";

export const dashboardService = {
  getOwnerDashboard: async () => {
    const response = await api.get("/dashboard/owner");
    return response.data.data;
  },
  getAdminDashboard: async () => {
    const response = await api.get("/dashboard/admin");
    return response.data.data;
  },
};
