import api from "@/lib/api";
import { handleAxiosError } from "@/utils/handleAxiosError";

export const photoRoomService = {
  getPhotoRoom: async (kostId: string): Promise<any> => {
    try {
      const response = await api.get(`/room-type/${kostId}/photos`);
      return response.data.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
  uploadPhotoRoom: async (kostTypeId: string, data: any): Promise<any> => {
    try {
      const response = await api.post(`/photo-rooms/upload`, data);
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
  deletePhotoKost: async (kostId: string, photoId: string): Promise<any> => {
    try {
      const response = await api.delete(
        `/owner/kost/${kostId}/photos/${photoId}`,
      );
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
  deletePhotoRoom: async (
    kostTypeId: string,
    photoId: string,
  ): Promise<any> => {
    try {
      const response = await api.delete(
        `/room-type/${kostTypeId}/photos/${photoId}`,
      );
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
};
