import api from "@/lib/api";
import {
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
  VerifyOtpPayload,
} from "./auth.type";
import { handleAxiosError } from "@/utils/handleAxiosError";

export const authService = {
  login: async (payload: LoginPayload) => {
    const response = await api.post(`/auth/login`, payload);
    return response.data;
  },
  loginWithGoogle: async () => {
    const response = await api.get(`/auth/login/google`);
    return response.data;
  },

  loginAdmin: async (payload: LoginPayload) => {
    const response = await api.post(`/auth/admin/login`, payload);
    return response.data;
  },

  register: async (data: RegisterPayload) => {
    try {
      const response = await api.post(`/auth/register`, {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        role: data.role,
      });
      return response.data.data;
    } catch (error) {
      throw handleAxiosError(error);
    }
  },

  async verifyOTP(payload: VerifyOtpPayload) {
    const response = await api.post(`/auth/verify-otp`, payload);
    return response.data;
  },

  async resendOTP(email: string) {
    const response = await api.post(`/auth/resend-otp`, {
      email,
    });
    return response.data;
  },

  forgotPassword: async (email: string) => {
    const response = await api.post(`/auth/forgot-password`, {
      email,
    });
    return response.data;
  },

  async resetPassword(payload: ResetPasswordPayload) {
    const response = await api.post(`/auth/reset-password`, payload);
    return response.data;
  },

  logout: async () => {
    await api.post("/auth/logout");
  },
  getUser: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },
};
