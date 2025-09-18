"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";
import { userService } from "@/features/user/services/user.service";

const schema = z
  .object({
    old_password: z.string().min(1, "Password lama wajib diisi"),
    new_password: z.string().min(6, "Password baru minimal 6 karakter"),
    confirm_password: z.string().min(1, "Konfirmasi password wajib diisi"),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Konfirmasi password tidak cocok",
    path: ["confirm_password"],
  });

type FormValues = z.infer<typeof schema>;

const ChangePasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: FormValues) =>
      userService.changePassword({
        password: values.old_password,
        newPassword: values.new_password,
      }),
    onSuccess: () => {
      reset();
    },
    onError: (error: any) => {
      const res = error?.response?.data;

      if (res?.errors?.password) {
        setError("old_password", {
          type: "server",
          message: res.errors.password,
        });
      } else {
        toast.error(res?.message || "Terjadi kesalahan.");
      }
    },
  });

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">Ubah Password</h1>
      <form onSubmit={handleSubmit((v) => mutate(v))} className="space-y-4">
        <div>
          <Label>Password Lama</Label>
          <Input type="password" {...register("old_password")} />
          {errors.old_password && (
            <p className="text-sm text-red-500">
              {errors.old_password.message}
            </p>
          )}
        </div>
        <div>
          <Label>Password Baru</Label>
          <Input type="password" {...register("new_password")} />
          {errors.new_password && (
            <p className="text-sm text-red-500">
              {errors.new_password.message}
            </p>
          )}
        </div>
        <div>
          <Label>Konfirmasi Password Baru</Label>
          <Input type="password" {...register("confirm_password")} />
          {errors.confirm_password && (
            <p className="text-sm text-red-500">
              {errors.confirm_password.message}
            </p>
          )}
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Menyimpan..." : "Simpan"}
        </Button>
      </form>
    </>
  );
};

export default ChangePasswordPage;
