"use client";

import { useEffect } from "react";
import { useFacilities } from "@/features/facility/hooks/useFacility";
import { FACILITY_ICONS, DEFAULT_FACILITY_ICON } from "@/constants/facilities"; // sesuaikan path-nya
import { cn } from "@/lib/utils";
import { useCreateKostStore } from "@/stores/createKost.store";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { useEditKostModalStore } from "@/stores/editKostModal";
import { useOwnerKost } from "@/features/kost/hooks/useOwnerKost";

export const step3Schema = yup.object({
  fasilitas_kost: yup
    .array()
    .of(yup.string().defined())
    .min(1, "Pilih minimal satu fasilitas")
    .required("Fasilitas harus dipilih"), // <- ini penting
});

type Step3FormValues = yup.InferType<typeof step3Schema>;

const StepFasilitasKost = () => {
  const { data, isLoading } = useFacilities();

  const { setCurrentStep, setOnNext, kostId, facilitiesKost } =
    useCreateKostStore();
  const { saveFacilities } = useOwnerKost(kostId ?? "");
  const { setIsSubmitSuccess } = useEditKostModalStore();

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Step3FormValues>({
    resolver: yupResolver(step3Schema),
    defaultValues: {
      fasilitas_kost: [],
    },
  });

  const selected = watch("fasilitas_kost");

  useEffect(() => {
    if (facilitiesKost && facilitiesKost.length > 0) {
      setValue("fasilitas_kost", facilitiesKost || []);
    }
  }, [facilitiesKost, setValue]);

  useEffect(() => {
    setCurrentStep(3);
    setOnNext(
      handleSubmit((data) => {
        if (!kostId) return;
        saveFacilities(
          {
            kostId: kostId,
            data: {
              fasilitas: data.fasilitas_kost,
            },
          },
          {
            onSuccess: () => {
              setIsSubmitSuccess(true);
            },
          },
        );
      }),
    );
  }, [setOnNext, setCurrentStep, handleSubmit, saveFacilities, kostId]);
  if (isLoading) return <p>Loading...</p>;

  const handleToggle = (id: string) => {
    const newSelected = selected.includes(id)
      ? selected.filter((item) => item !== id)
      : [...selected, id];

    setValue("fasilitas_kost", newSelected, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const fasilitasKost =
    data?.filter((item: any) => item.category === "kost") || [];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Fasilitas Kost Anda</h1>

      <div className="grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-3">
        {fasilitasKost.map((fasilitas: any) => {
          const isSelected = selected.includes(fasilitas._id);
          const iconInfo = FACILITY_ICONS[fasilitas.name];
          const Icon = iconInfo?.icon || DEFAULT_FACILITY_ICON;

          return (
            <button
              key={fasilitas._id}
              type="button"
              onClick={() => handleToggle(fasilitas._id)}
              className={cn(
                "flex items-center gap-3 rounded-lg border px-4 py-3 text-left transition",
                isSelected
                  ? "bg-primary/10 border-primary"
                  : "border-[#D9D9D9] bg-white",
              )}
            >
              <Icon
                className={`h-5 w-5 ${
                  isSelected ? "text-primary" : "text-gray-700"
                }`}
              />
              <span className="text-sm font-medium text-gray-800">
                {fasilitas.name}
              </span>
            </button>
          );
        })}
      </div>
      {errors.fasilitas_kost && (
        <p className="mt-4 text-sm text-red-500">
          {errors.fasilitas_kost.message}
        </p>
      )}
    </div>
  );
};

export default StepFasilitasKost;
