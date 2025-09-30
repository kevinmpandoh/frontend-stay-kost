import api from "@/lib/api";
import { handleAxiosError } from "@/utils/handleAxiosError";

export const photoKostService = {
  createPhotoKost: async (kostId: string, data: any): Promise<any> => {
    try {
      const response = await api.post(`/owner/kost/${kostId}/photos`, data);
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
  getPhotoKost: async (kostId: string): Promise<any> => {
    try {
      const response = await api.get(`/owner/kost/${kostId}/photo-kost`);
      return response.data.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
  getPhotoRoom: async (kostId: string): Promise<any> => {
    try {
      const response = await api.get(`/room-type/${kostId}/photo-room`);
      return response.data.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },

  uploadPhotoKost: async (kostId: string, data: any): Promise<any> => {
    try {
      const response = await api.post(`/photo-kosts/upload`, data);
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
  uploadPhotoRoom: async (kostTypeId: string, data: any): Promise<any> => {
    try {
      const response = await api.post(`/room-type/${kostTypeId}/upload`, data);
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
  deletePhotoKost: async (photoId: string): Promise<any> => {
    try {
      const response = await api.delete(`/photo-kosts/${photoId}`);
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
};
