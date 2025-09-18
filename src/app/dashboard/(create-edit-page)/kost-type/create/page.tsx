// /app/dashboard/tambah-kost/steps/page.tsx
"use client";
import React, { useEffect } from "react";
import { useCreateKostStore } from "@/stores/createKost.store";
import { useRouter, useSearchParams } from "next/navigation";
import { useKostType } from "@/features/roomType/hooks/useKostType";
import { useOwnerKost } from "@/features/kost/hooks/useOwnerKost";
import StepTipeKost from "@/features/roomType/components/StepInformasiTipeKost";
import StepFasilitasTipeKost from "@/features/roomType/components/StepFasilitasTipeKost";
import StepFotoTipeKost from "@/features/roomType/components/StepFotoTipeKost";
import StepHarga from "@/features/roomType/components/StepHarga";

const CreateKostType = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const kostId = searchParams.get("kost_id") ?? "";
  const kostTypeId = searchParams.get("kost_type_id") ?? "";
  const { getRoomTypeDetail: kostType, loadingRoomTypeDetail } = useKostType({
    kostTypeId: kostTypeId ?? "",
  });

  const { detailKost, loadingDetailKost } = useOwnerKost(kostId ?? "");

  const {
    currentStep,
    setCurrentStep,
    isLoadedFromBackend,
    setIsLoadedFromBackend,
    setKostId,
    setKostTypeId,
    setFacilitiesKostType,
    setHargaPerBulan,
    setKostType,
    setProgressStep,
  } = useCreateKostStore();

  // Ambil data backend → simpan ke Zustand (sekali saja)
  useEffect(() => {
    if (!kostId || !kostType || isLoadedFromBackend) return;

    setProgressStep(kostType.progressStep);
    setKostId(kostType.kostId);
    setKostTypeId(kostType.id);
    setKostType({
      nama_tipe: kostType.nama_tipe,
      ukuran_kamar: kostType.ukuran_kamar,
      jumlah_kamar: kostType.jumlah_kamar, // array string
      jumlah_terisi: kostType.kamar_terisi,
    });
    setFacilitiesKostType(kostType.fasilitas);

    setHargaPerBulan(kostType.harga ?? 0);
    setIsLoadedFromBackend(true);
  }, [
    isLoadedFromBackend,
    kostTypeId,
    kostType,
    setKostId,
    setIsLoadedFromBackend,
    setHargaPerBulan,
    setKostType,
    setKostTypeId,
    setFacilitiesKostType,
    kostId,
    setProgressStep,
  ]);

  useEffect(() => {
    if (!kostId) return;
    setKostId(kostId);

    if (!kostTypeId) {
      if (currentStep === 0 || currentStep !== 1) {
        setCurrentStep(1);
      }
      return;
    }

    setKostTypeId(kostTypeId);

    if (!kostType) return;

    const stepRaw = searchParams.get("step");
    const stepParam = stepRaw ? parseInt(stepRaw) : 2;

    const allowedStep = kostType.progressStep;

    // Validasi jika stepParam lebih dari yang diizinkan
    if (stepParam > allowedStep) {
      router.replace(
        `/dashboard/kost-type/create?kost_id=${kostId}&kost_type_id=${kostTypeId}&step=${allowedStep}`,
      );
      return;
    }

    // Set current step dari URL
    if (currentStep === 0 || currentStep !== stepParam) {
      setCurrentStep(stepParam);
    }
  }, [
    searchParams,
    kostId,
    setCurrentStep,
    kostType,
    currentStep,
    router,
    setKostId,
    setKostTypeId,
    kostTypeId,
    loadingRoomTypeDetail,
  ]);

  if (!kostId) return <h1>Kost ID tidak ditemukan</h1>;
  if (loadingDetailKost || loadingRoomTypeDetail || currentStep === 0)
    return <h1>Loading...</h1>;
  if (!detailKost) return <h1>Kost tidak ditemukan</h1>;

  // Render step sesuai currentStep
  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return <StepTipeKost />;
      case 2:
        return <StepFasilitasTipeKost />;
      case 3:
        return <StepFotoTipeKost />;
      case 4:
        return <StepHarga />;
      default:
        return <h1>Step tidak valid</h1>;
    }
  };

  return <>{renderStepComponent()}</>;
};

export default CreateKostType;
