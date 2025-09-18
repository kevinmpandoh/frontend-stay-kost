import api from "@/lib/api";
import { handleAxiosError } from "@/utils/handleAxiosError";

export const KostOwnerService = {
  getKostOwner: async (): Promise<any> => {
    try {
      const response = await api.get(`/owner/kost/`);
      return response.data.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },

  getKostDetail: async (kostId: string) => {
    try {
      const response = await api.get(`/owner/kost/${kostId}`);

      return response.data.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
  createKost: async (data: any): Promise<any> => {
    try {
      const response = await api.post(`/owner/kost/`, data);
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
  editKost: async (kostId: string, data: any): Promise<any> => {
    try {
      console.log(data, "DATA");
      const response = await api.put(`/owner/kost/${kostId}`, data);
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },

  saveKostAddress: async (kostId: string, data: any): Promise<any> => {
    try {
      const response = await api.patch(`/owner/kost/${kostId}/address`, data);
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },

  createFacilitiesKost: async (kostId: string, data: any): Promise<any> => {
    try {
      const response = await api.patch(
        `/owner/kost/${kostId}/facilities`,
        data,
      );
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
  createFacilitiesKostType: async (
    kostTypeId: string,
    data: any,
  ): Promise<any> => {
    try {
      const response = await api.patch(
        `/room-type/${kostTypeId}/facilities`,
        data,
      );
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
  createKostTypePrice: async (kostTypeId: string, data: any): Promise<any> => {
    try {
      const response = await api.patch(`/room-type/${kostTypeId}/price`, data);
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
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
  submitPhotoKost: async (kostId: string): Promise<any> => {
    try {
      const response = await api.patch(`/owner/kost/${kostId}/photo-kost`);
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
  submitPhotoRoom: async (kostTypeId: string): Promise<any> => {
    try {
      const response = await api.patch(`/room-type/${kostTypeId}/photo-room`);
      return response.data;
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
  deleteKost: async (kostId: string): Promise<any> => {
    try {
      const response = await api.delete(`/owner/kost/${kostId}`);
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
};
