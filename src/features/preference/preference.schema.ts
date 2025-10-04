// features/preference/preference.schema.ts
import { z } from "zod";

export const preferenceSchema = z.object({
  price: z.number().min(0, "Harga minimum harus >= 0"),
  kostFacilities: z.array(z.string()),
  roomFacilities: z.array(z.string()),
  kostType: z.enum(["putra", "putri", "campur"]),
  rules: z.array(z.string()),
  address: z.object({
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
  }),
});

export type PreferenceForm = z.infer<typeof preferenceSchema>;
