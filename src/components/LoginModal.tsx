// components/LoginModal.tsx
"use client";

import { useLoginModal } from "@/stores/loginModal.store";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Eye, EyeOff, KeyRound, Mail } from "lucide-react";
import Link from "next/link";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GoogleIcon } from "@/assets/icons";
import { AppLogo } from "@/components/common/AppLogo";
import { useAuth } from "@/hooks/useAuth";
import { LoginFormInputs, loginSchema } from "@/features/auth/auth.schema";
import { usePathname } from "next/navigation";

const LoginModal = () => {
  const { isOpen, close } = useLoginModal();
  const pathname = usePathname();

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

  // Tentukan warna berdasarkan role
  const roleColor =
    role === "owner"
      ? "bg-yellow-500 hover:bg-yellow-600 text-white"
      : "bg-primary hover:bg-primary/90 text-white";

  const onSubmit = (data: LoginFormInputs) => {
    login.mutate({ ...data, role });
  };

  const handleLoginWithGoogle = async () => {
    try {
      window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/login/google`;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      close();
    }
  }, [pathname]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setRole("tenant");
        close();
      }}
    >
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="mt-2 text-center text-xl font-semibold">
            <AppLogo className="mx-auto h-20 w-20" />
            Login sebagai
          </DialogTitle>
        </DialogHeader>

        {/* Tabs Role */}
        <Tabs
          defaultValue="tenant"
          onValueChange={(v) => setRole(v as "tenant" | "owner")}
        >
          <TabsList className="mb-4 grid w-full grid-cols-2">
            <TabsTrigger value="tenant">Penyewa Kost</TabsTrigger>
            <TabsTrigger value="owner">Pemilik Kost</TabsTrigger>
          </TabsList>
        </Tabs>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              size="lg"
              {...register("email")}
              type="email"
              leftIcon={<Mail size={20} className="text-gray-500" />}
              error={errors.email?.message}
              placeholder="Masukkan email kamu"
            />
          </div>

          <div className="space-y-2">
            <Label>Kata Sandi</Label>
            <Input
              size="lg"
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

          <div className="text-right">
            <Link
              href="/forgot-password"
              className={`${role === "tenant" ? "text-primary-500" : "text-warning-500"} text-sm`}
            >
              Lupa Password?
            </Link>
          </div>

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
            <div className="my-4 flex items-center">
              <hr className="flex-grow border-gray-300" />
              <span className="px-2 text-gray-500">atau</span>
              <hr className="flex-grow border-gray-300" />
            </div>
            <button
              onClick={handleLoginWithGoogle}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-2"
            >
              <GoogleIcon />
              Masuk dengan Google
            </button>
          </>
        )}

        <div className="mt-4 text-center text-sm text-gray-500">
          Belum punya akun?{" "}
          <Link
            href="/register"
            className={`${role === "tenant" ? "text-primary-500" : "text-warning-500"}`}
          >
            Daftar Sekarang
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
