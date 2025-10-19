"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Eye, EyeOff, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "../../../hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, ResetPasswordValues } from "../auth.schema";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const [showPassword, setShowPassword] = useState(false);

  const { resetPassword } = useAuth();

  // useEffect(() => {
  //   if (!token) {
  //     router.push("/login");
  //   }
  // }, [token, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
  });
  const onSubmit = async (data: ResetPasswordValues) => {
    if (!token) {
      setError("password", { type: "manual", message: "Token tidak valid." });
      return;
    }

    resetPassword.mutate(
      { newPassword: data.password, token },
      {
        onSuccess: () => {
          reset();
        },
      },
    );

    // catch (error) {
    //   if (error instanceof AxiosError) {
    //     console.log(error, "ERROR");
    //     const errorMessage =
    //       error.response?.data?.message || "Terjadi kesalahan, coba lagi.";
    //     setError("password", { type: "manual", message: errorMessage });
    //   } else {
    //     console.error("Error:", error);
    //   }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md px-2">
        {/* <CardHeader>
          <CardTitle>
            <h2 className="mb-6 text-center text-2xl font-semibold">Login</h2>
          </CardTitle>
        </CardHeader> */}
        <CardContent>
          <div className="flex flex-col justify-center">
            <h2 className="mb-4 text-2xl font-bold">Ganti Password</h2>
            <p className="mb-6 text-gray-600">
              Masukkan kata sandi baru untuk mengubahnya
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4 space-y-2.5">
                <Label>Kata Sandi Baru</Label>
                <Input
                  placeholder="Masukkan Password Kamu"
                  type={showPassword ? "text" : "password"}
                  rightIcon={
                    showPassword ? <EyeOff size={20} /> : <Eye size={20} />
                  }
                  leftIcon={<KeyRound size={20} />}
                  onRightIconClick={() => setShowPassword(!showPassword)}
                  {...register("password")}
                  error={errors.password?.message}
                />
              </div>
              <div className="mb-10 space-y-2.5">
                <Label>Konfirmasi Kata Sandi</Label>
                <Input
                  placeholder="Masukkan Password Kamu"
                  type={showPassword ? "text" : "password"}
                  rightIcon={
                    showPassword ? <EyeOff size={20} /> : <Eye size={20} />
                  }
                  leftIcon={<KeyRound size={20} />}
                  onRightIconClick={() => setShowPassword(!showPassword)}
                  {...register("confirmPassword")}
                  error={errors.confirmPassword?.message}
                />
              </div>

              <Button
                type="submit"
                disabled={resetPassword.isPending}
                className={`w-full`}
              >
                {resetPassword.isPending ? "Mengubah..." : "Ubah Password"}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPasswordForm;
