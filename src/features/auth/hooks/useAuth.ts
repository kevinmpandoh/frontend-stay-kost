import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authService } from "../auth.service";
import { useAuthStore } from "@/store/auth.store";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useRegisterStore } from "../register.store";

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setUser, login: loginStore } = useAuthStore();
  const { setRegisterInfo, clearRegisterInfo } = useRegisterStore();

  // login
  const login = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      return authService.login(data);
    },
    onSuccess: (data) => {
      loginStore(data.user);
      toast.success("Login Berhasil");
      if (data.user.role === "tenant") {
        router.push("/");
      }
      if (data.user.role === "owner") {
        router.push("/dashboard/owner");
      }
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        toast.error(err?.response?.data?.message || "Gagal mengubah password");
      }
      // console.error("Login error", err);
    },
  });

  // login
  const loginAdmin = useMutation({
    mutationFn: authService.loginAdmin,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      setUser(data.user);
      router.push("/dashboard");
    },
  });

  const loginWithGoogle = useMutation({
    mutationFn: authService.loginWithGoogle,
    onSuccess: (res) => {
      setUser(res.data);
      queryClient.invalidateQueries({ queryKey: ["me"] });

      // if (role === "owner") {
      //   router.push("/dashboard");
      // } else {
      //   router.push("/");
      // }
    },
    onError: (err: unknown) => {
      throw err;
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
      console.log(data, "DATANYA");
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
      queryClient.removeQueries(); // optional: hapus semua cache
      router.push("/");
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
