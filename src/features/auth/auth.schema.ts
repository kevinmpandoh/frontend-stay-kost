import * as z from "zod";

export const loginSchema = z.object({
  email: z.email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export const registerSchema = z
  .object({
    name: z.string().min(3, "Nama minimal 3 karakter"),
    email: z.email("Email tidak valid"),
    phone: z.string().min(10, "Nomor telepon minimal 10 digit"),
    password: z.string().min(6, "Kata sandi minimal 6 karakter"),
    confirmPassword: z.string().min(6, "Konfirmasi sandi minimal 6 karakter"),
    role: z.enum(["tenant", "owner"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi kata sandi tidak sama",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.email("Email tidak valid"),
});
export const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Kata sandi minimal 6 karakter"),
    confirmPassword: z.string().min(6, "Konfirmasi sandi minimal 6 karakter"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi kata sandi tidak sama",
    path: ["confirmPassword"],
  });

export type LoginFormInputs = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
