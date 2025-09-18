// validations/payoutSchema.ts
import * as yup from "yup";

export const payoutSchema = yup.object({
  bank: yup.string().required("Nama bank wajib diisi"),
  account: yup
    .string()
    .required("Nomor rekening wajib diisi")
    .matches(/^\d+$/, "Nomor rekening harus berupa angka"),
});
