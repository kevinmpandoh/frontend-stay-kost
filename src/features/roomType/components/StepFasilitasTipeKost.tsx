"use client";

import { useEffect } from "react";
import { useFacilities } from "@/features/facility/hooks/useFacility";
import { FACILITY_ICONS } from "@/constants/facilities"; // sesuaikan path-nya
import { cn } from "@/lib/utils";
import { useCreateKostStore } from "@/stores/createKost.store";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useKostType } from "@/features/roomType/hooks/useKostType";
import { useRouter } from "next/navigation";

export const step3Schema = yup.object({
  fasilitas_tipe_kost: yup
    .array()
    .of(yup.string().defined())
    .min(1, "Pilih minimal satu fasilitas")
    .required("Fasilitas harus dipilih"), // <- ini penting
});

type Step3FormValues = yup.InferType<typeof step3Schema>;

const StepFasilitasTipeKost = () => {
  const { data, isLoading } = useFacilities();

  const { setCurrentStep, setOnNext, kostTypeId, facilitiesKostType } =
    useCreateKostStore();

  const { saveFacilities } = useKostType({});
  const router = useRouter();

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Step3FormValues>({
    resolver: yupResolver(step3Schema),
    defaultValues: {
      fasilitas_tipe_kost: [],
    },
  });

  const selected = watch("fasilitas_tipe_kost");

  useEffect(() => {
    if (facilitiesKostType && facilitiesKostType.length > 0) {
      setValue("fasilitas_tipe_kost", facilitiesKostType || []);
    }
  }, [facilitiesKostType, setValue]);

  useEffect(() => {
    // setCurrentStep(3);
    setOnNext(
      handleSubmit((data) => {
        if (!kostTypeId) return;
        saveFacilities({
          kostTypeId,
          data: {
            facilities: data.fasilitas_tipe_kost,
          },
        });
      }),
    );
  }, [
    setOnNext,
    setCurrentStep,
    handleSubmit,
    saveFacilities,
    router,
    kostTypeId,
  ]);
  if (isLoading) return <p>Loading...</p>;

  const handleToggle = (id: string) => {
    const newSelected = selected.includes(id)
      ? selected.filter((item) => item !== id)
      : [...selected, id];

    setValue("fasilitas_tipe_kost", newSelected, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const fasilitasKost =
    data?.filter((item: any) => item.category === "room") || [];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Fasilitas Kamar Anda</h1>

      <div className="grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-3">
        {fasilitasKost.map((fasilitas: any) => {
          const isSelected = selected.includes(fasilitas._id);
          const iconInfo = FACILITY_ICONS[fasilitas.name];
          const Icon = iconInfo?.icon;

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
      {errors.fasilitas_tipe_kost && (
        <p className="mt-4 text-sm text-red-500">
          {errors.fasilitas_tipe_kost.message}
        </p>
      )}
    </div>
  );
};

export default StepFasilitasTipeKost;
