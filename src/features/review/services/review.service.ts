import api from "@/lib/api";

export const reviewService = {
  getOwnerReview: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    rating?: number;
  }) => {
    const response = await api.get(`/reviews/owner`, {
      params,
    });
    return response.data.data;
  },
  getAdminReview: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    rating?: number;
  }) => {
    const response = await api.get(`/reviews`, {
      params,
    });
    return response.data.data;
  },

  sendReview: async (bookingId: string, data: any) => {
    await api.post(`/tenant/booking/${bookingId}/review`, data);
  },
  replyReview: async (reviewId: string, reply: any) => {
    await api.post(`/reviews/${reviewId}`, {
      message: reply,
    });
  },
  deleteReview: async (reviewId: string) => {
    await api.delete(`/reviews/${reviewId}`);
  },
};
