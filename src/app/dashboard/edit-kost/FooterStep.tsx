"use client";
import { Button } from "@/components/ui/button";
import { useCreateKostStore } from "@/stores/createKost.store";
import { useRouter } from "next/navigation";

import React from "react";

const FooterStep = ({ lastCompletedStep }: { lastCompletedStep: number }) => {
  const { currentStep, setCurrentStep, triggerNext, kostId } =
    useCreateKostStore();
  const router = useRouter();

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      router.push(
        `/dashboard/edit-kost?kost_id=${kostId}&step=${currentStep - 1}`,
      );
    }
  };

  const handleNext = () => {
    triggerNext(); // Ini akan diproses oleh komponen step aktif
  };

  return (
    <footer className="fixed right-0 bottom-0 left-[320px] z-50 border-t border-gray-200 bg-white">
      <div className="flex items-center justify-between px-10 py-8">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 1}
          size={"lg"}
        >
          Kembali
        </Button>

        <Button
          onClick={handleNext}
          disabled={currentStep > lastCompletedStep + 1}
          className="bg-primary text-white"
          size={"lg"}
        >
          Simpan
        </Button>
      </div>
    </footer>
  );
};

export default FooterStep;
