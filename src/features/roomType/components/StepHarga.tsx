import { Input } from "@/components/form/input/InputField";
import { Label } from "@/components/ui/label";
import { useKostType } from "@/features/roomType/hooks/useKostType";
import { useCreateKostStore } from "@/stores/createKost.store";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const step1Schema = yup.object({
  harga_perbulan: yup
    .number()
    .min(10000, "Harga tidak boleh kurang dari Rp 10.000")
    .max(15000000, "Harga tidak boleh lebih dari Rp 15.000.000")
    .required("Harga kost wajib diisi"),
});

type Step8FormValues = yup.InferType<typeof step1Schema>;

const StepHarga = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Step8FormValues>({
    resolver: yupResolver(step1Schema),
  });

  const { setCurrentStep, setOnNext, hargaPerBulan, kostTypeId, reset } =
    useCreateKostStore();
  const { saveKostTypePrice } = useKostType({});

  useEffect(() => {
    if (hargaPerBulan) {
      setValue("harga_perbulan", hargaPerBulan || 0);
    }
  }, [hargaPerBulan, setValue]);

  useEffect(() => {
    setOnNext(
      handleSubmit((data) => {
        if (!kostTypeId) return;
        saveKostTypePrice(
          {
            kostTypeId,
            data: { price: data.harga_perbulan },
          },
          {
            onSuccess: () => {
              reset();
            },
          },
        );
      }),
    );
  }, [
    setOnNext,
    setCurrentStep,
    handleSubmit,
    reset,
    saveKostTypePrice,
    kostTypeId,
  ]);
  return (
    <>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Atur Harga Kost Anda</h2>

        {/* Nama Kost */}
        <div className="mb-6 max-w-lg space-y-2">
          <Label className="text-xl">Harga per Bulan</Label>
          <Input
            {...register("harga_perbulan")}
            type="number"
            error={errors.harga_perbulan ? true : false}
          />
          {errors.harga_perbulan && (
            <p className="text-sm text-red-500">
              {errors.harga_perbulan.message}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default StepHarga;
