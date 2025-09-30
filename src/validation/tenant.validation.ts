import * as yup from "yup";

export const editProfileSchema = yup.object({
  name: yup
    .string()
    .min(2, "Nama minimal 2 karakter")
    .required("Nama wajib diisi"),
  gender: yup
    .string()
    .oneOf(["male", "female"], "Pilih jenis kelamin")
    .required("Jenis kelamin wajib diisi"),
  job: yup.string().required("Pekerjaan wajib diisi"),
  otherJob: yup.string().when("pekerjaan", {
    is: "Lainnya",
    then: () => yup.string().required("Pekerjaan lainnya wajib diisi"),
    otherwise: () => yup.string().nullable(),
  }),
  hometown: yup
    .string()
    .min(2, "Kota Asal minimal 2 karakter")
    .required("Kota Asal wajib diisi"),
  birthDate: yup
    .date()
    .typeError("Tanggal lahir tidak valid")
    .required("Tanggal lahir wajib diisi")
    .max(new Date(), "Tanggal lahir tidak boleh di masa depan"),
  emergencyContact: yup
    .string()
    .matches(/^08\d{8,11}$/, "Nomor HP harus valid (contoh: 08xxxxxxxxxx)")
    .min(10, "Minimal 8 digit")
    .max(15, "Maksimal 15 digit")
    .required("Kontak darurat wajib diisi"),
});

export const changePasswordSchema = yup.object({
  old_password: yup.string().required("Password lama wajib diisi"),
  new_password: yup
    .string()
    .min(6, "Password minimal 6 karakter")
    .required("Password baru wajib diisi"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("new_password")], "Konfirmasi password tidak cocok")
    .required("Konfirmasi password wajib diisi"),
});
