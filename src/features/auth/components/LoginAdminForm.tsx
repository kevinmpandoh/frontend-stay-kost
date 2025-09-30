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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LoginAdminForm() {
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
  const { loginAdmin } = useAuth();

  const onSubmit = (data: LoginFormInputs) => {
    loginAdmin.mutate({ ...data });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md px-2">
        <CardHeader>
          <CardTitle>
            <AppLogo className="mx-auto h-28 w-28" />
            <h2 className="text-center text-xl font-semibold">Login Admin</h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="mb-4">
            <div className="mb-4 space-y-2">
              <Label>Email</Label>
              <Input
                size={"lg"}
                {...register("email")}
                type="email"
                leftIcon={<Mail size={20} className="text-gray-500" />}
                error={errors.email?.message}
                placeholder="Masukkan email kamu"
              />
            </div>

            <div className="mb-4 space-y-2">
              <Label>Kata Sandi</Label>
              <Input
                size={"lg"}
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

            {/* Tombol Login */}
            <Button
              type="submit"
              className="w-full"
              disabled={loginAdmin.isPending}
            >
              {loginAdmin.isPending ? "Memproses..." : "Masuk"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
