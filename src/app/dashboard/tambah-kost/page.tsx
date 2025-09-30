// /app/dashboard/tambah-kost/page.tsx
"use client";
import React, { useEffect } from "react";
import StepAlamatKost from "../../../features/kost/components/StepAlamatKost";
import StepInformasiKost from "../../../features/kost/components/StepInformasiKost";
import StepFasilitasKost from "../../../features/kost/components/StepFasilitasKost";
import StepFotoKost from "../../../features/kost/components/StepFotoKost";
import { useCreateKostStore } from "@/stores/createKost.store";
import { useRouter, useSearchParams } from "next/navigation";
import StepInformasiTipeKost from "../../../features/roomType/components/StepInformasiTipeKost";
import StepFasilitasTipeKost from "../../../features/roomType/components/StepFasilitasTipeKost";
import StepFotoTipeKost from "../../../features/roomType/components/StepFotoTipeKost";
import StepHarga from "../../../features/roomType/components/StepHarga";
import { useOwnerKost } from "@/features/kost/hooks/useOwnerKost";

const TambahKostPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const kostId = searchParams.get("kost_id") ?? "";
  const { detailKost: kost, loadingDetailKost } = useOwnerKost(kostId ?? "");

  const {
    currentStep,
    setCurrentStep,
    setInformasiKost,
    isLoadedFromBackend,

    setProgressStep,
    setIsLoadedFromBackend,
    setKostId,
    setKostTypeId,
    setAlamatKost,
    setFacilitiesKost,
    setFacilitiesKostType,
    setHargaPerBulan,
    setKostType,
  } = useCreateKostStore();

  useEffect(() => {
    if (!kostId) {
      // jika tidak ada kost_id, berarti mulai baru → set ke step 1
      if (currentStep === 0 || currentStep !== 1) {
        setCurrentStep(1);
      }
      return;
    }

    if (!kost) return;

    const stepRaw = searchParams.get("step");
    const stepParam = stepRaw ? parseInt(stepRaw) : 2;
    const allowedStep = kost.progressStep + 1;

    // Validasi jika stepParam lebih dari yang diizinkan
    if (stepParam > allowedStep) {
      router.replace(
        `/dashboard/tambah-kost?kost_id=${kost.id}&step=${allowedStep}`,
      );
      return;
    }

    // Set current step dari URL
    if (currentStep === 0 || currentStep !== stepParam) {
      setCurrentStep(stepParam);
    }
  }, [searchParams, kost, kostId, setCurrentStep, currentStep, router]);

  // Ambil data backend → simpan ke Zustand (sekali saja)
  useEffect(() => {
    if (!kostId) {
      // jika tidak ada kost_id, berarti mulai baru → set ke step 1
      if (currentStep === 0 || currentStep !== 1) {
        setCurrentStep(1);
      }
      return;
    }
    if (!kost || isLoadedFromBackend) return;

    const stepRaw = searchParams.get("step");
    const stepParam = stepRaw ? parseInt(stepRaw) : 2;
    const allowedStep = kost.progressStep;

    // Validasi jika stepParam lebih dari yang diizinkan
    if (stepParam > allowedStep) {
      router.replace(
        `/dashboard/tambah-kost?kost_id=${kost.id}&step=${allowedStep}`,
      );
      return;
    }

    // Set current step dari URL
    if (currentStep === 0 || currentStep !== stepParam) {
      setCurrentStep(stepParam);
    }

    // Set ke store
    setKostId(kost.id);
    setProgressStep(kost.progressStep);
    setInformasiKost({
      name: kost.name,
      type: kost.type,
      rules: kost.rules.map((rule: any) => rule._id), // array string
      description: kost.description,
    });
    setAlamatKost({
      provinsi: kost.address?.province || "",
      kabupaten_kota: kost.address?.city || "",
      kecamatan: kost.address?.district || "",
      detail_alamat: kost.address?.detail || "",
      koordinat: {
        lat: kost.address?.coordinates?.coordinates[1] || 0,
        lng: kost.address?.coordinates?.coordinates[0] || 0,
      },
    });
    setFacilitiesKost(kost.kostFacilities.map((facility: any) => facility._id));

    const kostType = kost.roomTypes?.[0];

    if (!kostType) return;

    setKostTypeId(kostType.id);
    setKostType({
      nama_tipe: kostType.nama_tipe,
      ukuran_kamar: kostType.ukuran_kamar,
      jumlah_kamar: kostType.total_kamar, // array string
      jumlah_terisi: kostType.kamar_terisi,
    });
    setFacilitiesKostType(kostType.fasilitas.map((f: any) => f.id));

    setHargaPerBulan(kostType.harga ?? 0);

    setIsLoadedFromBackend(true);
  }, [
    kostId,
    kost,
    isLoadedFromBackend,
    setKostId,
    setInformasiKost,
    setAlamatKost,
    setFacilitiesKost,
    setIsLoadedFromBackend,
    setKostType,
    setProgressStep,
    setHargaPerBulan,
    setKostTypeId,
    setFacilitiesKostType,
    currentStep,
    setCurrentStep,
    router,
    searchParams,
  ]);

  if (loadingDetailKost || currentStep === 0) return <h1>Loading...</h1>;

  // Render step sesuai currentStep
  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return <StepInformasiKost />;
      case 2:
        return <StepAlamatKost />;
      case 3:
        return <StepFasilitasKost />;
      case 4:
        return <StepFotoKost />;
      case 5:
        return <StepInformasiTipeKost />;
      case 6:
        return <StepFasilitasTipeKost />;
      case 7:
        return <StepFotoTipeKost />;
      case 8:
        return <StepHarga />;
      default:
        return <h1>Step tidak valid</h1>;
    }
  };

  return <>{renderStepComponent()}</>;
};

export default TambahKostPage;
