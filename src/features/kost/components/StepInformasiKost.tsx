// /app/owner/kosts/new/step-1/page.tsx
"use client";

import { Input } from "@/components/form/input/InputField";
import TextArea from "@/components/form/input/TextArea";
import Label from "@/components/form/Label";
import { useOwnerKost } from "@/features/kost/hooks/useOwnerKost";
import { useRules } from "@/features/rules/hooks/useRules";

import { useCreateKostStore } from "@/stores/createKost.store";
import { APIError } from "@/utils/handleAxiosError";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const step1Schema = yup.object({
  name: yup.string().required("Nama kost wajib diisi"),
  type: yup
    .string()
    .oneOf(["putra", "putri", "campur"])
    .required("Pilih jenis kost"),
  description: yup.string().required("Deskripsi kost wajib diisi"),
  rules: yup
    .array()
    .of(yup.string().required())
    .required("Peraturan kost wajib diisi"),
});

type Step1FormValues = yup.InferType<typeof step1Schema>;

export default function Step1Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    watch,
  } = useForm<Step1FormValues>({
    resolver: yupResolver(step1Schema),
    defaultValues: {
      rules: [], // ini tetap diberikan agar form tidak error saat pertama kali render
    },
  });

  const { rules } = useRules();
  const { createKost, editKost } = useOwnerKost();
  const router = useRouter();

  const {
    currentStep,
    setCurrentStep,
    setOnNext,
    informasiKost,
    setInformasiKost,
    kostId,
  } = useCreateKostStore();
  //   const [rules, setRules] = useState<string[]>([]);
  const selectedRules = watch("rules") || []; // tambahkan fallback ke []

  useEffect(() => {
    if (informasiKost && Object.keys(informasiKost).length > 0) {
      setValue("name", informasiKost.name || "");
      setValue("type", informasiKost.type || "");
      setValue("description", informasiKost.description || "");
      setValue("rules", informasiKost.rules || []);
    }
  }, [informasiKost, setValue]);

  useEffect(() => {
    setOnNext(
      handleSubmit((data: any) => {
        const formData = {
          name: data.name,
          type: data.type,
          description: data.description,
          rules: data.rules,
        };

        if (Object.keys(informasiKost).length === 0) {
          createKost(formData, {
            onError: (err) => {
              if (err instanceof APIError) {
                setError("name", {
                  type: "manual",
                  message: err.message || "Gagal membuat kost",
                });
                return;
              }
            },
          });
        } else {
          if (!kostId) return;
          const existingData = {
            name: informasiKost.name,
            type: informasiKost.type,
            description: informasiKost.description,
            rules: informasiKost.rules || [],
          };

          const isEqual =
            JSON.stringify(formData) === JSON.stringify(existingData);

          if (isEqual) {
            setCurrentStep(2);
            router.replace(`/dashboard/tambah-kost?kost_id=${kostId}&step=2`);
            return;
          }
          editKost(
            {
              kostId,
              data: formData,
            },
            {
              onError: (err) => {
                if (err instanceof APIError) {
                  setError("name", {
                    type: "manual",
                    message: err.message || "Gagal membuat kost",
                  });
                  return;
                }
              },
            },
          );
        }
      }),
    );
  }, [
    handleSubmit,
    setCurrentStep,
    setOnNext,
    currentStep,
    createKost,
    editKost,
    router,
    setValue,
    setInformasiKost,
    informasiKost,
    kostId,
    setError,
  ]);

  const toggleRule = (ruleId: string) => {
    const currentRules = new Set(watch("rules") || []);
    if (currentRules.has(ruleId)) currentRules.delete(ruleId);
    else currentRules.add(ruleId);
    setValue("rules", Array.from(currentRules));
  };
  return (
    <>
      <form>
        <h1 className="mb-6 text-2xl font-semibold">Lengkapi Data kost anda</h1>

        {/* Nama Kost */}
        <div className="mb-6 max-w-lg">
          <Label className="text-xl">Nama Kost</Label>
          <Input
            {...register("name")}
            type="text"
            error={errors.name ? true : false}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
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
                onClick={() => setValue("type", jenis)}
                className={`flex flex-col items-center gap-2 rounded-xl border p-4 ${
                  watch("type") === jenis
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
          {errors.type && (
            <p className="text-sm text-red-500">{errors.type.message}</p>
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
            {...register("description")}
            error={errors.description ? true : false}
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        {/* rules Kost */}
        <div className="max-w-full">
          <div className="mb-3 text-xl font-semibold text-[#1A1A1A]">
            Peraturan Kost
          </div>

          <div className="grid gap-2 text-base text-[#7A7A7A] md:grid-cols-4">
            {rules?.data?.map((rule: any) => (
              <label
                key={rule._id}
                className="flex min-w-[180px] cursor-pointer items-center gap-2 text-sm"
              >
                <input
                  type="checkbox"
                  className="accent-blue-600"
                  checked={selectedRules.includes(rule._id)}
                  onChange={() => toggleRule(rule._id)}
                />
                {rule.name}
              </label>
            ))}
          </div>
        </div>
      </form>
    </>
  );
}
