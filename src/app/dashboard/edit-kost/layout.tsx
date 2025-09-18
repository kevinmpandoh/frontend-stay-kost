// /app/dashboard/tambah-kost/layout.tsx
"use client";

import React, { ReactNode } from "react";

import { useCreateKostStore } from "@/stores/createKost.store";
import { useRouter, useSearchParams } from "next/navigation";
import StepSidebarEdit from "@/components/layout/StepSidebarEdit";
import FooterStep from "@/components/layout/FooterStep";

interface StepsLayoutProps {
  children: ReactNode;
}

const stepsGroup = [
  {
    title: "Kost",
    items: ["Informasi Kost", "Alamat Kost", "Fasilitas Kost", "Foto Kost"],
  },
];

export default function StepsLayout({ children }: StepsLayoutProps) {
  const { currentStep, setCurrentStep, triggerNext, progressStep } =
    useCreateKostStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const kostId = searchParams.get("kost_id");

  //   const lastCompletedStep = 8; // atau bisa ambil dari backend / store
  const handleBack = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);

      // update URL juga
      if (kostId) {
        router.push(`/dashboard/edit-kost?kost_id=${kostId}&step=${prevStep}`);
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
        <StepSidebarEdit
          stepsGroup={stepsGroup}
          basePath="/dashboard/edit-kost"
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
          mode="edit"
        />
      </main>
    </div>
  );
}
