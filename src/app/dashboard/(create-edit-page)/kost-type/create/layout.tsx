// /app/dashboard/tambah-kost/layout.tsx
"use client";

import React, { ReactNode } from "react";

import { useCreateKostStore } from "@/stores/createKost.store";
import { useRouter, useSearchParams } from "next/navigation";
import StepSidebarCreate from "@/components/layout/StepSidebarCreate";
import FooterStep from "@/components/layout/FooterStep";

interface StepsLayoutProps {
  children: ReactNode;
}

const stepsGroupRoomType = [
  {
    title: "Tipe Kost",
    items: ["Informasi Tipe Kost", "Fasilitas Kamar", "Foto Kamar", "Harga"],
  },
];

export default function StepsLayout({ children }: StepsLayoutProps) {
  const { currentStep, setCurrentStep, triggerNext, progressStep } =
    useCreateKostStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const kostId = searchParams.get("kost_id");
  const roomTypeId = searchParams.get("kost_type_id");

  const handleBack = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);

      // update URL juga
      if (kostId && roomTypeId) {
        router.push(
          `/dashboard/kost-type/create?kost_id=${kostId}&kost_type_id=${roomTypeId}&step=${prevStep}`,
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
          lastCompletedStep={progressStep}
          stepsGroup={stepsGroupRoomType}
          basePath="/dashboard/kost-type/create"
        />
      </div>

      {/* Main content */}
      <main className="relative ml-[320px] flex flex-1 flex-col">
        <div className="flex-1 px-10 py-20 pb-34">{children}</div>

        <FooterStep
          currentStep={currentStep}
          lastCompletedStep={progressStep}
          totalSteps={4}
          onBack={handleBack}
          onNext={handleNext}
        />
      </main>
    </div>
  );
}
