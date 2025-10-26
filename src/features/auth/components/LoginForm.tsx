"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginFormInputs, loginSchema } from "../auth.schema";
import { useAuth } from "../../../hooks/useAuth";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, KeyRound, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleIcon } from "@/assets/icons";
import { AppLogo } from "@/components/common/AppLogo";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const [role, setRole] = useState<"tenant" | "owner">("tenant");

  const onSubmit = (data: LoginFormInputs) => {
    login.mutate({ ...data, role });
  };

  const handleLoginWithGoogle = async () => {
    try {
      // await loginWithGoogle(role);
      window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/login/google`;
    } catch (error) {
      console.log(error, "ERRORR");
    }
  };

  const roleColor =
    role === "owner"
      ? "bg-yellow-500 hover:bg-yellow-600 text-white"
      : "bg-primary hover:bg-primary/90 text-white";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md px-2">
        <CardHeader>
          <CardTitle>
            <Link href={"/"}>
              <AppLogo className="mx-auto h-28 w-28" />
            </Link>
            <h2 className="text-center text-xl font-semibold">Login sebagai</h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="tenant"
            onValueChange={(v) => setRole(v as "tenant" | "owner")}
          >
            <TabsList className="mb-4 grid w-full grid-cols-2">
              <TabsTrigger value="tenant">Penyewa Kost</TabsTrigger>
              <TabsTrigger value="owner">Pemilik Kost</TabsTrigger>
            </TabsList>
          </Tabs>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="mb-4">
            <div className="mb-4 space-y-2">
              <Label>Email</Label>
              <Input
                size={"lg"}
                {...register("email")}
                type="email"
                className={
                  role === "owner" ? "focus-visible:ring-warning-400" : ""
                }
                leftIcon={<Mail size={20} className="text-gray-500" />}
                error={errors.email?.message}
                placeholder="Masukkan email kamu"
              />
            </div>

            <div className="space-y-2">
              <Label>Kata Sandi</Label>
              <Input
                size={"lg"}
                placeholder="Masukkan Password Kamu"
                type={showPassword ? "text" : "password"}
                className={
                  role === "owner" ? "focus-visible:ring-warning-400" : ""
                }
                rightIcon={
                  showPassword ? <EyeOff size={20} /> : <Eye size={20} />
                }
                leftIcon={<KeyRound size={20} />}
                onRightIconClick={() => setShowPassword(!showPassword)}
                {...register("password")}
                error={errors.password?.message}
              />
            </div>
            <div className="mt-2 mb-4 text-right">
              <Link
                href={`/forgot-password`}
                className={`${role === "tenant" ? "text-primary-500" : "text-warning-500"} text-sm`}
              >
                Lupa Password?
              </Link>
            </div>
            {/* Tombol Login */}
            <Button
              type="submit"
              className={`w-full ${roleColor}`}
              disabled={login.isPending}
            >
              {login.isPending ? "Memproses..." : "Masuk"}
            </Button>
          </form>
          {role === "tenant" && (
            <>
              <div className="mb-4 flex items-center">
                <hr className="flex-grow border-gray-300" />
                <span className="px-4 text-gray-500">atau</span>
                <hr className="flex-grow border-gray-300" />
              </div>
              <button
                onClick={handleLoginWithGoogle}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 py-2"
              >
                <GoogleIcon />
                Masuk dengan Google
              </button>
            </>
          )}

          <div className="mt-4 text-center">
            <span className="text-gray-500">
              Belum punya akun?{" "}
              <Link
                href="/register"
                className={`${role === "tenant" ? "text-primary-500" : "text-warning-500"}`}
              >
                Daftar Sekarang
              </Link>
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
