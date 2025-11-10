import api from "@/lib/api";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { BookingResponse } from "./types/booking.type";

export const bookingService = {
  createBooking: async (data: any) => {
    const result = await api.post("/bookings", data);
    return result.data;
  },

  cancelBooking: async (id: string) => {
    const result = await api.patch(`/bookings/${id}/cancel`);
    return result.data;
  },

  getTenantBookings: async () => {
    const response = await api.get(`/bookings/tenant`);
    return response.data.data ?? null;
  },
  getAdminBookings: async (params: Record<string, any>) => {
    const response = await api.get(`/bookings/admin`, { params });
    return response.data;
  },

  getOwnerBookings: async (params: Record<string, any>) => {
    // const query = status && status !== "all" ? `?status=${status}` : "";

    const response = await api.get(`/bookings/owner`, { params });
    return response.data.data;
  },

  getDetailBooking: async (bookingId: string) => {
    const response = await api.get<BookingResponse>(`/bookings/${bookingId}/`);
    return response.data;
  },

  approveBookings: async (bookingId: string, room: string) => {
    const response = await api.patch(`/bookings/${bookingId}/approve`, {
      room,
    });
    return response.data.data;
  },
  rejectBookings: async (bookingId: string, data: any) => {
    const response = await api.patch(`/bookings/${bookingId}/reject`, data);
    return response.data;
  },

  getTenantBookingHistory: async () => {
    const response = await api.get("/bookings/tenant/history");
    return response.data.data;
  },
  checkInBooking: async (bookingId: string) => {
    const res = await api.post(`/bookings/${bookingId}/check-in`);
    return res.data;
  },
  checkOutBooking: async (bookingId: string) => {
    const res = await api.post(`/bookings/${bookingId}/check-out`);
    return res.data;
  },

  getActiveTenantBooking: async () => {
    const res = await api.get("/bookings/tenant/active");
    return res.data.data;
  },
  getActiveOwnerBooking: async () => {
    const res = await api.get("/bookings/owner/active");
    return res.data.data;
  },

  stopBooking: async (bookingId: string, data: any) => {
    const res = await api.post(`/bookings/${bookingId}/stop-rent`, data);
    return res.data;
  },

  stopRentTenant: async (bookingId: string, data: any) => {
    const res = await api.post(`/bookings/${bookingId}/stop-rent-tenant`, data);
    return res.data;
  },

  acceptStopRent: async (bookingId: string) => {
    return api.patch(`/bookings/${bookingId}/accept-stop-rent`);
  },

  rejectStopRent: (bookingId: string, reason: string) => {
    try {
      return api.patch(`/bookings/${bookingId}/reject-stop-rent`, {
        rejectionReason: reason,
      });
    } catch (error) {
      throw handleAxiosError(error);
    }
  },

  updateBooking: async (bookingId: string, payload: any) => {
    const res = await api.patch(`/bookings/${bookingId}`, payload);
    return res.data;
  },

  reviewKost: async (bookingId: string, payload: any) => {
    const res = await api.post(`/bookings/${bookingId}/review`, payload);
    return res.data;
  },
};
