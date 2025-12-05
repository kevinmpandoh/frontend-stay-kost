// /app/dashboard/tambah-kost/layout.tsx
"use client";

import React, { ReactNode } from "react";

import FooterStep from "../../../components/layout/FooterStep";
import { useCreateKostStore } from "@/stores/createKost.store";
import { useRouter, useSearchParams } from "next/navigation";
import StepSidebarCreate from "../../../components/layout/StepSidebarCreate";

interface StepsLayoutProps {
  children: ReactNode;
}

const stepsGroup = [
  {
    title: "Kost",
    items: ["Informasi Kost", "Alamat Kost", "Fasilitas Kost", "Foto Kost"],
  },
  {
    title: "Tipe Kamar",
    items: ["Informasi Tipe Kamar", "Fasilitas Kamar", "Foto Kamar", "Harga"],
  },
];

export default function StepsLayout({ children }: StepsLayoutProps) {
  const { currentStep, setCurrentStep, triggerNext, progressStep } =
    useCreateKostStore();

  const router = useRouter();
  const searchParams = useSearchParams();
  const kostId = searchParams.get("kost_id");

  const handleBack = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);

      // update URL juga
      if (kostId) {
        router.push(
          `/dashboard/tambah-kost?kost_id=${kostId}&step=${prevStep}`,
        );
      }
    }
  };

  const handleNext = () => {
    triggerNext();
  };

  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* Sidebar fixed */}
      <div className="fixed top-0 left-0 z-50 h-screen w-[320px] border-r bg-white">
        <StepSidebarCreate
          // currentStep={currentStep}
          lastCompletedStep={progressStep}
          stepsGroup={stepsGroup}
          basePath="/dashboard/tambah-kost"
          // onStepClick={handleStepClick}
        />
      </div>

      {/* Main content */}
      <main className="relative ml-[320px] flex flex-1 flex-col">
        <div className="flex-1 px-10 py-20 pb-34">{children}</div>

        <FooterStep
          currentStep={currentStep}
          lastCompletedStep={progressStep}
          totalSteps={8}
          onBack={handleBack}
          onNext={handleNext}
        />
      </main>
    </div>
  );
}
