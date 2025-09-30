import * as yup from "yup";
export const authValidation = {
  loginSchema: yup.object().shape({
    email: yup
      .string()
      .email("Email tidak valid")
      .required("Email wajib diisi"),
    password: yup
      .string()
      .min(6, "Kata sandi minimal 6 karakter")
      .required("Kata sandi wajib diisi"),
  }),
  registerSchema: yup.object().shape({
    name: yup.string().required("Nama lengkap wajib diisi"),
    phone: yup
      .string()
      .min(10, "Password minimal 10 karakter")
      .max(15, "Password maksimal 15 karakter")
      .required("Nomor handphone wajib diisi"),
    email: yup
      .string()
      .email("Format email tidak valid")
      .required("Email wajib diisi"),
    password: yup
      .string()
      .min(6, "Password minimal 6 karakter")
      .required("Password wajib diisi"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), ""], "Konfirmasi password harus sama")
      .required("Konfirmasi password wajib diisi"),
  }),

  forgotPasswordSchema: yup.object().shape({
    email: yup
      .string()
      .email("Email tidak valid")
      .required("Email wajib diisi"),
  }),
  resetPasswordSchema: yup.object().shape({
    password: yup
      .string()
      .min(6, "Password minimal 6 karakter")
      .required("Password wajib diisi"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), ""], "Konfirmasi password harus sama")
      .required("Konfirmasi password wajib diisi"),
  }),
};
