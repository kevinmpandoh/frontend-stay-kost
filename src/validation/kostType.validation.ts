import { z } from "zod";

const presetUkuran = ["3 X 3", "3 X 4", "Lainnya"] as const;

export const tipeKostSchema = z
  .object({
    namaTipe: z.string({
      required_error: "Nama tipe kost wajib diisi",
    }),
    ukuran: z.enum(presetUkuran, {
      required_error: "Ukuran wajib dipilih",
    }),
    panjangCustom: z
      .number({
        invalid_type_error: "Panjang wajib berupa angka",
      })
      .positive("Harus lebih dari 0")
      .optional()
      .or(z.nan()), // Zod butuh ini agar tidak error saat kosong

    lebarCustom: z
      .number({
        invalid_type_error: "Lebar wajib berupa angka",
      })
      .positive("Harus lebih dari 0")
      .optional()
      .or(z.nan()),

    totalKamar: z
      .number({
        invalid_type_error: "Jumlah kamar wajib berupa angka",
      })
      .min(1, "Minimal 1 kamar"),

    kamarTerisi: z
      .number({
        invalid_type_error: "Kamar terisi wajib berupa angka",
      })
      .min(0, "Tidak boleh negatif"),
  })
  .superRefine((data, ctx) => {
    // Custom rule: panjang & lebar wajib kalau ukuran == "Lainnya"
    if (data.ukuran === "Lainnya") {
      if (!data.panjangCustom || Number.isNaN(data.panjangCustom)) {
        ctx.addIssue({
          path: ["panjangCustom"],
          code: z.ZodIssueCode.custom,
          message: "Panjang wajib diisi",
        });
      }
      if (!data.lebarCustom || Number.isNaN(data.lebarCustom)) {
        ctx.addIssue({
          path: ["lebarCustom"],
          code: z.ZodIssueCode.custom,
          message: "Lebar wajib diisi",
        });
      }
    }

    // Custom rule: kamarTerisi tidak boleh melebihi totalKamar
    if (data.kamarTerisi > data.totalKamar) {
      ctx.addIssue({
        path: ["kamarTerisi"],
        code: z.ZodIssueCode.custom,
        message: "Kamar terisi tidak boleh melebihi total kamar",
      });
    }
  });

export type TipeKostForm = z.infer<typeof tipeKostSchema>;
