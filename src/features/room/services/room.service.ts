import api from "@/lib/api";
import { handleAxiosError } from "@/utils/handleAxiosError";

export const roomService = {
  getRoomsByKostType: async (kostTypeId: string, status?: string) => {
    const response = await api.get(
      `/rooms/${kostTypeId}?status=${status ?? ""}`,
    );
    return response.data.data;
  },

  createRoom: async (
    kostTypeId: string,
    data: {
      number: string;
      floor: number;
      status: string;
    },
  ) => {
    try {
      const response = await api.post(`/rooms/${kostTypeId}`, data);
      return response.data.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },

  updateRoom: async (
    roomId: string,
    data: { number: string; floor: number },
  ) => {
    try {
      const response = await api.put(`/rooms/${roomId}`, data);
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },

  deleteRoom: async (roomId: string) => {
    try {
      const response = await api.delete(`/rooms/${roomId}`);
      return response.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
};
