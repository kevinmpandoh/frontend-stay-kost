// /app/owner/kosts/new/step-1/page.tsx
"use client";

import { Input } from "@/components/form/input/InputField";
import TextArea from "@/components/form/input/TextArea";
import Label from "@/components/form/Label";
import { DEFAULT_RULE_ICON, RULE_ICONS } from "@/constants/rules";
import { useOwnerKost } from "@/features/kost/hooks/useOwnerKost";
import { useRules } from "@/features/rules/hooks/useRules";

import { cn } from "@/lib/utils";
import { useCreateKostStore } from "@/stores/createKost.store";
import { useEditKostModalStore } from "@/stores/editKostModal";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const step1Schema = yup.object({
  namaKost: yup.string().required("Nama kost wajib diisi"),
  jenisKost: yup
    .string()
    .oneOf(["putra", "putri", "campur"])
    .required("Pilih jenis kost"),
  deskripsi: yup.string().required("Deskripsi kost wajib diisi"),
  peraturan: yup
    .array()
    .of(yup.string().required())
    .required("Peraturan kost wajib diisi"),
});

type Step1FormValues = yup.InferType<typeof step1Schema>;

export default function StepInformasiKost() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<Step1FormValues>({
    resolver: yupResolver(step1Schema),
    defaultValues: {
      peraturan: [], // ini tetap diberikan agar form tidak error saat pertama kali render
    },
  });

  const { rules } = useRules();
  const { editKost } = useOwnerKost();
  const router = useRouter();
  const { setIsSubmitSuccess } = useEditKostModalStore();

  const { currentStep, setCurrentStep, setOnNext, informasiKost, kostId } =
    useCreateKostStore();
  //   const [rules, setRules] = useState<string[]>([]);
  const selectedRules = watch("peraturan") || []; // tambahkan fallback ke []

  useEffect(() => {
    if (informasiKost && Object.keys(informasiKost).length > 0) {
      setValue("namaKost", informasiKost.name || "");
      setValue("jenisKost", informasiKost.type || "");
      setValue("deskripsi", informasiKost.description || "");
      setValue("peraturan", informasiKost.rules || []);
    }
  }, [informasiKost, setValue]);

  useEffect(() => {
    setCurrentStep(1);
    setOnNext(
      handleSubmit((data: any) => {
        const formData = {
          name: data.namaKost,
          type: data.jenisKost,
          description: data.deskripsi,
          rules: data.peraturan,
        };

        if (!kostId) return;

        editKost(
          {
            kostId,
            data: formData,
          },
          {
            onSuccess: () => {
              setIsSubmitSuccess(true);
            },
          },
        );
      }),
    );
  }, [
    handleSubmit,
    setCurrentStep,
    setOnNext,
    currentStep,
    editKost,
    router,
    setValue,
    setIsSubmitSuccess,
    informasiKost,
    kostId,
  ]);

  const toggleRule = (ruleId: string) => {
    const currentRules = new Set(watch("peraturan") || []);
    if (currentRules.has(ruleId)) currentRules.delete(ruleId);
    else currentRules.add(ruleId);
    setValue("peraturan", Array.from(currentRules));
  };
  return (
    <>
      <form>
        <h1 className="mb-6 text-2xl font-semibold">Lengkapi Data kost anda</h1>

        {/* Nama Kost */}
        <div className="mb-6 max-w-lg">
          <Label className="text-xl">Nama Kost</Label>
          <Input
            {...register("namaKost")}
            type="text"
            error={errors.namaKost ? true : false}
          />
          {errors.namaKost && (
            <p className="text-sm text-red-500">{errors.namaKost.message}</p>
          )}

          <p className="mt-1 text-sm text-[#7A7A7A]">
            Saran: Kost (spasi) Nama kost
          </p>
        </div>

        {/* Jenis Kost */}
        <div className="mb-6 max-w-xl">
          <div className="mb-3 text-xl font-semibold text-[#1A1A1A]">
            Jenis Kost
          </div>
          <div className="flex gap-3">
            {["putra", "putri", "campur"].map((jenis: any) => (
              <button
                key={jenis}
                type="button"
                onClick={() => setValue("jenisKost", jenis)}
                className={`flex flex-col items-center gap-2 rounded-xl border p-4 ${
                  watch("jenisKost") === jenis
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-gray-300 bg-white text-gray-500"
                }`}
              >
                <Image
                  src={`/images/${jenis}.png`}
                  alt={jenis}
                  width={48}
                  height={48}
                />
                Kost {jenis.charAt(0).toUpperCase() + jenis.slice(1)}
              </button>
            ))}
          </div>
          {errors.jenisKost && (
            <p className="text-sm text-red-500">{errors.jenisKost.message}</p>
          )}
        </div>

        {/* Deskripsi Kost */}
        <div className="mb-6 max-w-lg">
          <label
            htmlFor="deskripsiKost"
            className="mb-1 block text-xl font-semibold text-[#1A1A1A]"
          >
            Deskripsi Kost
          </label>
          <TextArea
            placeholder="Masukkan catatan tambahan"
            rows={5}
            {...register("deskripsi")}
            error={errors.deskripsi ? true : false}
          />
          {errors.deskripsi && (
            <p className="text-sm text-red-500">{errors.deskripsi.message}</p>
          )}
        </div>

        {/* Peraturan Kost */}
        <div className="max-w-full">
          <div className="mb-3 text-xl font-semibold text-[#1A1A1A]">
            Peraturan Kost
          </div>
          <div className="grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-3">
            {rules.isLoading ? (
              <h1>Loading</h1>
            ) : (
              <>
                {rules.data.map((rule: any) => {
                  const isSelected = selectedRules.includes(rule._id);
                  const iconInfo = RULE_ICONS[rule.name];
                  const Icon = iconInfo?.icon || DEFAULT_RULE_ICON;

                  return (
                    <button
                      key={rule._id}
                      type="button"
                      onClick={() => toggleRule(rule._id)}
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
                        {rule.name}
                      </span>
                    </button>
                  );
                })}
              </>
            )}
          </div>
          {errors.peraturan && (
            <p className="mt-4 text-sm text-red-500">
              {errors.peraturan.message}
            </p>
          )}

          {/* <div className="flex flex-wrap gap-x-10 gap-y-2 text-base text-[#7A7A7A] ">
            {rules?.map((rule: any) => (
              <label
                key={rule._id}
                className="flex items-center gap-2 cursor-pointer text-sm min-w-[180px]"
              >
                <input
                  type="checkbox"
                  className="accent-blue-600"
                  checked={selectedRules.includes(rule._id)}
                  onChange={() => toggleRule(rule._id)}
                />
                {rule.nama_peraturan}
              </label>
            ))}
          </div> */}
        </div>
      </form>
    </>
  );
}
