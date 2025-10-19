"use client";
import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, ForgotPasswordValues } from "../auth.schema";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const ForgotPasswordForm = () => {
  const { forgotPassword } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: ForgotPasswordValues) => {
    forgotPassword.mutate(data.email, {
      onSuccess: () => {
        reset();
      },
    });
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
            <Link href="/login" className="mb-4 flex gap-2 text-gray-500">
              <ArrowLeft /> <span>Kembali</span>
            </Link>
            <h2 className="mb-4 text-2xl font-semibold">Lupa Password</h2>
            <p className="mb-6 text-gray-600">
              Masukkan Email yang terdaftar. Kami akan mengirimkan kode
              verifikasi untuk atur ulang kata sandi.
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4 space-y-2.5">
                <Label>Email</Label>
                <Input
                  size={"md"}
                  {...register("email")}
                  type="email"
                  leftIcon={<Mail size={20} className="text-gray-500" />}
                  error={errors.email?.message}
                  placeholder="Masukkan email kamu"
                />
              </div>

              <Button
                type="submit"
                disabled={forgotPassword.isPending}
                className="w-full"
              >
                {forgotPassword.isPending ? "Memproses..." : "Masuk"}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPasswordForm;
