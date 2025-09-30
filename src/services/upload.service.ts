import api from "@/lib/api";

export const uploadService = {
  uploadDocument: async (data: any) => {
    const res = await api.post("/tenant/booking/upload", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },
  getDocument: (documentId: string) => {
    return api.get(`/tenant/upload/${documentId}`, {
      responseType: "blob",
    });
  },
  deleteDocument: (documentId: string) => {
    return api.delete(`/tenant/upload/${documentId}`);
  },
};
