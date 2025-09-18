import api from "@/lib/api";
import { PreferencePayload } from "../preference.type";

export const preferenceService = {
  createOrUpdatePreference: (data: PreferencePayload) =>
    api.post("/preferences", data),
  getPreference: async () => {
    const res = await api.get("/preferences");
    return res.data.data;
  },
  getPreferenceKosts: async () => {
    const res = await api.get("/preferences/kost");
    return res.data;
  },
};
