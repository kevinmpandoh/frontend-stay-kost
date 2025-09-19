import api from "@/lib/api";

export const chatService = {
  getChat: async () => {
    const response = await api.get(`/chat`);
    return response.data.data;
  },
  getMessageByChat: async (chatRoomId: string) => {
    const response = await api.get(`/chat/${chatRoomId}`);
    return response.data.data;
  },

  sendMessage: async (chatRoomId: string, message: string) => {
    await api.post(`/chat/${chatRoomId}/send`, {
      message,
    });
  },

  startChat: async (payload: { roomTypeId: string; tenantId?: string }) => {
    const response = await api.post(`/chat/start`, payload);
    return response.data.data;
  },
  getChatTenant: async (roomTypeId: string, tenantId: string) => {
    const response = await api.get(`/chat/owner/${roomTypeId}/${tenantId}`);
    return response.data.data;
  },
};
