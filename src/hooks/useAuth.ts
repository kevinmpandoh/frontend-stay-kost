import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authService } from "../features/auth/services/auth.service";
import { useAuthStore } from "@/stores/auth.store";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useRegisterStore } from "../features/auth/register.store";

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setUser, login: loginStore } = useAuthStore();
  const { setRegisterInfo, clearRegisterInfo } = useRegisterStore();

  // login
  const login = useMutation({
    mutationFn: async (data: {
      email: string;
      password: string;
      role: string;
    }) => {
      return authService.login(data);
    },
    onSuccess: (data) => {
      // setUser(data.user);

      toast.success("Login Berhasil");
      if (data.user.role === "tenant") {
        router.push("/");
      }
      if (data.user.role === "owner") {
        router.push("/dashboard/owner");
      }
      loginStore({ user: data.user });
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        toast.error(
          err?.response?.data?.message || "Login gagal. Silahkan coba lagi",
        );
      }
    },
  });

  // login
  const loginAdmin = useMutation({
    mutationFn: authService.loginAdmin,
    onSuccess: (data) => {
      toast.success("Login Berhasil");

      loginStore({ user: data.user });
      router.push("/dashboard/admin");
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        toast.error(
          err?.response?.data?.message || "Login gagal. Silahkan coba lagi",
        );
      }
    },
  });

  const loginWithGoogle = useMutation({
    mutationFn: authService.loginWithGoogle,
    onSuccess: (res) => {
      setUser(res.data);
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        toast.error(
          err?.response?.data?.message || "Login gagal. Silahkan coba lagi",
        );
      }
      toast.error("Login dengan google gagal. Silahkan coba lagi");
    },
  });

  // register
  const register = useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      setRegisterInfo({ email: data.email, phone: data.phone });

      // Redirect ke halaman OTP
      router.push("/register/verify");
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        toast.error(
          err?.response?.data?.message || "Login gagal. Silahkan coba lagi",
        );
      }
      toast.error("Pendaftara gagal. Silahkan coba lagi");
    },
  });

  // Verify OTP
  const resendOTP = useMutation({
    mutationFn: authService.resendOTP,
    onSuccess: () => {
      toast.success(
        "OTP Baru telah dikirimkan ke email. Silahkan cek dan coba lagi",
      );
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        toast.error(
          err?.response?.data?.message ||
            "Gagal mengirimkan OTP. sialhkan coba lagi",
        );
      }
    },
  });

  // Verify OTP
  const verifyOTP = useMutation({
    mutationFn: authService.verifyOTP,
    onSuccess: (data) => {
      toast.success("Pendafaran berhasil");
      setUser(data.user);
      clearRegisterInfo();
      if (data.user.role === "owner") {
        router.push("/dashboard");
      }
      if (data.user.role === "tenant") {
        router.push("/preferences");
      }
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        toast.error(err?.response?.data?.message || "Silahkan coba lagi");
      }
    },
  });

  const forgotPassword = useMutation({
    mutationFn: authService.forgotPassword,
    onSuccess: () => {
      toast.success("Link reset password telah dikirimkan ke email Anda.");
    },
    onError: (err: unknown) => {
      if (err instanceof AxiosError) {
        toast.error(err?.response?.data?.message || "Silahkan coba lagi");
      }
    },
  });

  const resetPassword = useMutation({
    mutationFn: authService.resetPassword,
    onSuccess: () => {
      toast.success("Password berhasil diubah! Silakan login kembali.");
      router.push("/login");
    },
    onError: (err: unknown) => {
      if (err instanceof AxiosError) {
        toast.error(err?.response?.data?.message || "Silahkan coba lagi");
      }
    },
  });

  // logout
  const logout = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      setUser(null);
      router.push("/");
      // queryClient.removeQueries(); // optional: hapus semua cache
    },
    onError: () => {
      setUser(null);
      router.push("/");
    },
  });

  return {
    login,
    loginAdmin,
    loginWithGoogle,
    register,
    verifyOTP,
    resendOTP,
    forgotPassword,
    resetPassword,
    logout,
  };
};
