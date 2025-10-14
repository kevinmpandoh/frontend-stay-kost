import { useAuthStore } from "@/stores/auth.store";
import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;
    if (status === 401) {
      try {
        // Panggil endpoint refresh
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
          {},
          { withCredentials: true },
        );

        // Ulangi request sebelumnya
        if (error.config) {
          return api.request(error.config);
        }
      } catch (refreshError) {
        console.log(refreshError, "TES");
        // await axios.post(
        //   `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        //   {},
        //   { withCredentials: true },
        // );
        const { logout } = useAuthStore.getState();
        logout();

        // if (typeof window !== "undefined") {
        //   window.location.href = "/login";
        // }
      }
    }

    // if (status === 403) {
    //   // Arahkan ke halaman forbidden
    //   if (typeof window !== "undefined") {
    //     window.location.replace("/forbidden");
    //   }
    // }
    if (status === 400) {
      // Validasi request salah → tampilkan pesan error
      return Promise.reject(error);
    }

    if (status === 500) {
      // Server error → tampilkan pesan umum
      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 500) {
      // Akses store global langsung (jangan dalam komponen)
      console.error("Server error:", err.response.data);
    }
    return Promise.reject(err);
  },
);

export default api;
