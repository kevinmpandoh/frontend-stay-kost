"use client";
import { Button } from "@/components/ui/button";
import React from "react";

interface FooterStepProps {
  currentStep: number;
  lastCompletedStep: number;
  totalSteps: number; // supaya bisa dipakai untuk halaman lain
  onBack: () => void; // callback untuk back
  onNext: () => void; // callback untuk next
  mode?: "create" | "edit"; // 👈 mode baru
  hideProgress?: boolean; // opsional, sembunyikan progress text
}

const FooterStep: React.FC<FooterStepProps> = ({
  currentStep,
  lastCompletedStep,
  totalSteps,
  onBack,
  onNext,
  mode = "create", // default create
}) => {
  const isLastStep = currentStep === totalSteps;
  let nextLabel = "Selanjutnya";
  if (mode === "create" && isLastStep) nextLabel = "Selesai";
  if (mode === "edit") nextLabel = "Simpan";
  return (
    <footer className="fixed right-0 bottom-0 left-[320px] z-50 border-t border-gray-200 bg-white">
      <div className="flex items-center justify-between px-10 py-8">
        <Button
          variant="outline"
          onClick={onBack}
          disabled={currentStep === 1}
          size="lg"
        >
          Kembali
        </Button>

        {mode === "create" && (
          <span className="text-base text-gray-600">
            {Math.max(0, totalSteps - currentStep)} Langkah lagi
          </span>
        )}

        <Button
          onClick={onNext}
          disabled={
            currentStep > totalSteps || currentStep > lastCompletedStep + 1
          }
          className="bg-primary text-white"
          size="lg"
        >
          {nextLabel}
        </Button>
      </div>
    </footer>
  );
};

export default FooterStep;
