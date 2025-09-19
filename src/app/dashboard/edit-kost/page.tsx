"use client";
import React, { useEffect } from "react";

import { useCreateKostStore } from "@/stores/createKost.store";
import { useRouter, useSearchParams } from "next/navigation";

import ModalSuccessSubmit from "./ModalSuccessSubmit";
import { useOwnerKost } from "@/features/kost/hooks/useOwnerKost";
import StepAlamatKost from "../../../features/kost/components/StepAlamatKost";

import StepFasilitasKost from "@/features/kost/components/StepFasilitasKost";
import StepFotoKost from "@/features/kost/components/StepFotoKost";
import StepInformasiKost from "./steps/StepInformasiKost";

const EditKost = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const kostId = searchParams.get("kost_id") ?? "";

  const {
    detailKost: kost,
    loadingDetailKost,
    errorDetailKost,
    isError,
  } = useOwnerKost(kostId ?? "");

  const {
    currentStep,
    setCurrentStep,
    setInformasiKost,
    isLoadedFromBackend,
    setIsLoadedFromBackend,
    setKostId,
    setAlamatKost,
    setFacilitiesKost,
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
    const stepParam = stepRaw ? parseInt(stepRaw) : 1;

    // Set current step dari URL
    if (currentStep === 0 || currentStep !== stepParam) {
      setCurrentStep(stepParam);
    }
  }, [searchParams, kost, kostId, setCurrentStep, currentStep, router]);

  useEffect(() => {
    if (!kostId || !kost || isLoadedFromBackend) return;

    // Set ke store
    setKostId(kostId);
    setInformasiKost({
      name: kost.name,
      type: kost.type,
      rules: kost.rules.map((p: any) => p._id), // array string
      description: kost.description,
    });
    setAlamatKost({
      provinsi: kost.address.province,
      kabupaten_kota: kost.address.city,
      kecamatan: kost.address.district,
      detail_alamat: kost.address.detail,
      koordinat: {
        lat: kost.address.coordinates.lat,
        lng: kost.address.coordinates.lng,
      },
    });

    setFacilitiesKost(kost.kostFacilities.map((f: any) => f._id));

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
  ]);

  if (loadingDetailKost || (currentStep === 0 && !isError))
    return <h1>Loading...</h1>;

  // Ambil data backend → simpan ke Zustand (sekali saja)
  if (errorDetailKost && isError) return <div>Kost tidak ditemukan</div>;

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

      default:
        return <h1>Step tidak valid</h1>;
    }
  };
  return (
    <>
      {/* <div className="flex min-h-screen w-full bg-white"> */}
      {/* Sidebar fixed di kiri */}
      {/* <div className="fixed top-0 left-0 z-50 h-screen w-[320px] border-r bg-white">
          <StepSidebarEdit />
        </div> */}

      {/* Main content dengan margin kiri untuk offset sidebar */}
      {/* <main className="relative ml-[320px] flex flex-1 flex-col">
          <div className="flex-1 px-10 py-20 pb-34"> */}
      {renderStepComponent()}
      {/* </div>

          <FooterStep
            currentStep={currentStep}
            lastCompletedStep={progressStep}
            totalSteps={8}
            onBack={handleBack}
            onNext={handleNext}
          />
        </main> */}
      {/* </div> */}

      <ModalSuccessSubmit />
    </>
  );
};

export default EditKost;
