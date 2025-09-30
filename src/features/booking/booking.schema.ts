import * as z from "zod";

export const bookingSchema = z.object({
  duration: z.number().min(1, "Minimal 1 bulan"),
  startDate: z.string().nonempty("Tanggal masuk wajib diisi"),
  ktp: z.instanceof(File).nullable().optional(),
  note: z.string().nullable().optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
