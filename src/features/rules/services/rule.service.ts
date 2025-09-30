import api from "@/lib/api";

export const ruleService = {
  getAll: async () => {
    const response = await api.get(`/rules`);
    return response.data.data;
  },
};
