"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { useCreateKostStore } from "@/stores/createKost.store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/form/input/InputField";
import clsx from "clsx";
import { z } from "zod";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useKostType } from "@/features/roomType/hooks/useKostType";
import { useRouter } from "next/navigation";
import { useEditKostModalStore } from "@/stores/editKostModal";

export const presetUkuran = ["3 X 3", "3 X 4", "Lainnya"] as const;

export const tipeKostSchema = z
  .object({
    namaTipe: z.string().min(1, "Nama tipe kost wajib diisi"),

    ukuran: z.enum(presetUkuran, {
      message: "Ukuran kamar wajib dipilih",
    }),

    panjangCustom: z
      .number()
      .positive("Harus lebih dari 0")
      .transform((val) => (isNaN(val) ? undefined : val))
      .optional(),

    lebarCustom: z
      .number()
      .positive("Harus lebih dari 0")
      .transform((val) => (isNaN(val) ? undefined : val))
      .optional(),

    totalKamar: z.number().min(1, "Minimal 1 kamar"),

    kamarTerisi: z.number().min(0, "Tidak boleh negatif"),
  })
  .refine(
    (data) =>
      data.ukuran !== "Lainnya" ||
      (data.panjangCustom !== undefined && data.lebarCustom !== undefined),
    {
      message: "Jika memilih 'Lainnya', panjang dan lebar wajib diisi",
      path: ["panjangCustom"], // bisa diarahkan ke salah satu field
    },
  )
  .refine((data) => data.kamarTerisi <= data.totalKamar, {
    message: "Kamar terisi tidak boleh melebihi total kamar",
    path: ["kamarTerisi"],
  });

// type TipeKostForm = yup.InferType<typeof schema>;
export type TipeKostForm = z.infer<typeof tipeKostSchema>;

const StepTipeKost = () => {
  const { setCurrentStep, setOnNext, kostId } = useCreateKostStore();

  const { create, edit } = useKostType({});

  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TipeKostForm>({
    resolver: zodResolver(tipeKostSchema),
    // defaultValues: tipeKostData,
  });

  const { kostType, kostTypeId, setKostType } = useCreateKostStore();

  const selectedUkuran = watch("ukuran");

  useEffect(() => {
    if (kostType && Object.keys(kostType).length > 0) {
      setValue("namaTipe", kostType.nama_tipe || "");
      setValue("totalKamar", kostType.jumlah_kamar || 0);
      setValue("kamarTerisi", kostType.jumlah_terisi || 0);

      const ukuranKamar = kostType.ukuran_kamar;

      if (ukuranKamar) {
        const isPreset = presetUkuran.includes(
          ukuranKamar as (typeof presetUkuran)[number],
        );

        if (isPreset) {
          setValue("ukuran", ukuranKamar as (typeof presetUkuran)[number]);
        } else {
          setValue("ukuran", "Lainnya");

          const [panjang, lebar] = ukuranKamar
            .toLowerCase()
            .split("x")
            .map((val) => parseFloat(val.trim()));

          if (!isNaN(panjang)) setValue("panjangCustom", panjang);
          if (!isNaN(lebar)) setValue("lebarCustom", lebar);
        }
      } else {
        setValue("ukuran", "3 X 3"); // fallback default jika undefined
      }
    }
  }, [kostType, setValue]);

  useEffect(() => {
    // setCurrentStep(3); // step ini
    setOnNext(
      handleSubmit((data) => {
        const finalUkuran =
          data.ukuran === "Lainnya"
            ? `${data.panjangCustom}x${data.lebarCustom}`
            : data.ukuran;

        const formData = {
          name: data.namaTipe,
          size: finalUkuran,
          total_rooms: data.totalKamar,
          total_rooms_occupied: data.kamarTerisi,
        };

        if (kostTypeId) {
          // 🟢 Jika sudah ada data → edit
          edit(
            { id: kostTypeId, data: formData },
            {
              onSuccess: () => {
                setKostType({
                  nama_tipe: data.namaTipe,
                  ukuran_kamar: finalUkuran,
                  jumlah_kamar: data.totalKamar, // array string
                  jumlah_terisi: data.kamarTerisi,
                });
              },
            },
          );
        } else {
          create({ data: formData, kostId: kostId! });
        }
      }),
    );
  }, [
    setCurrentStep,
    setOnNext,
    handleSubmit,
    create,
    kostId,
    edit,
    setKostType,
    kostTypeId,
    router,
  ]);

  return (
    <>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Lengkapi Data tipe kost anda</h2>

        {/* Nama Kost */}
        <div className="mb-6 max-w-lg">
          <Label className="text-xl">Nama Tipe Kost</Label>
          <Input
            {...register("namaTipe")}
            type="text"
            error={errors.namaTipe ? true : false}
          />
          {errors.namaTipe && (
            <p className="text-sm text-red-500">{errors.namaTipe.message}</p>
          )}

          <p className="mt-1 text-sm text-[#7A7A7A]">
            Saran: Kost (spasi) Nama kost
          </p>
        </div>

        <div className="space-y-2">
          <Label className="text-xl">Ukuran Kamar</Label>
          <div className="flex gap-4">
            {presetUkuran.map((ukuran) => (
              <Button
                key={ukuran}
                variant={selectedUkuran === ukuran ? "default" : "outline"}
                type="button"
                onClick={() => {
                  setValue("ukuran", ukuran);
                  if (ukuran !== "Lainnya") {
                    setValue("panjangCustom", undefined);
                    setValue("lebarCustom", undefined);
                  }
                }}
                // className="w-[90px] h-[90px]"
                className={clsx(
                  "text-sm",
                  ukuran === "3 X 3" && "h-24 w-24 p-0",
                  ukuran === "3 X 4" && "h-24 w-36 p-0",
                  ukuran === "Lainnya" && "h-24 w-24 rounded-full px-6",
                )}
              >
                {ukuran}
              </Button>
            ))}

            {selectedUkuran === "Lainnya" && (
              <div className="mt-4 flex gap-4">
                <div className="w-1/2 space-y-2">
                  <Label>Panjang (m)</Label>
                  <Input
                    type="number"
                    placeholder="Contoh: 4"
                    {...register("panjangCustom", { valueAsNumber: true })}
                  />
                  {errors.panjangCustom && (
                    <p className="text-sm text-red-500">
                      {errors.panjangCustom.message}
                    </p>
                  )}
                </div>

                <div className="w-1/2 space-y-2">
                  <Label>Lebar (m)</Label>
                  <Input
                    type="number"
                    placeholder="Contoh: 5"
                    {...register("lebarCustom", { valueAsNumber: true })}
                  />
                  {errors.lebarCustom && (
                    <p className="text-sm text-red-500">
                      {errors.lebarCustom.message}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mb-6 max-w-lg space-y-2">
          <Label className="text-xl">Jumlah keseluruhan Kamar</Label>
          <Input
            type="number"
            placeholder="Contoh: 10"
            {...register("totalKamar", { valueAsNumber: true })}
          />
          {errors.totalKamar && (
            <p className="text-sm text-red-500">{errors.totalKamar.message}</p>
          )}
        </div>

        <div className="mb-6 max-w-lg space-y-2">
          <Label className="text-xl">Jumlah Kamar yang terisi</Label>
          <Input
            type="number"
            placeholder="Contoh: 2"
            {...register("kamarTerisi", { valueAsNumber: true })}
          />
          {errors.kamarTerisi && (
            <p className="text-sm text-red-500">{errors.kamarTerisi.message}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default StepTipeKost;
