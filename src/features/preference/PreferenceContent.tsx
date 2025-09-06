"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import StepIndicator from "./components/StepIndicator";
import LocationStep from "./components/LocationStep";
import PriceStep from "./components/PriceStep";
import JenisKostStep from "./components/JenisKostStep";
import FasilitasStep from "./components/FasilitasStep";
import KeamananStep from "./components/KeamananStep";
import { usePreferenceStore } from "./preference.store";
import { usePreference } from "./usePreference";
import { useFacility } from "@/features/facility/useFacility";
import { Facility } from "../facility/facility.type";

const steps = [
  "Lokasi",
  "Harga",
  "Jenis Kost",
  "Fasilitas",
  "Keamanan",
  "Tinjau",
];

const stepContent = [
  {
    title: "Lokasi yang diinginkan",
    subtitle: "Di mana anda ingin mencari kost?",
  },
  {
    title: "Harga maksimal",
    subtitle: "Berapa harga maksimal yang anda inginkan per bulan?",
  },
  {
    title: "Jenis Kost",
    subtitle: "Pilih jenis kost yang sesuai preferensi Anda.",
  },
  {
    title: "Fasilitas Kost & Kamar",
    subtitle: "Fasilitas apa saja yang Anda inginkan?",
  },
  {
    title: "Keamanan / Peraturan Kost",
    subtitle: "Apa saja keamanan atau peraturan yang Anda harapkan?",
  },
  {
    title: "Tinjau Preferensi",
    subtitle: "Periksa kembali preferensi kost Anda sebelum dikirim.",
  },
];

export default function PreferenceContent() {
  const [step, setStep] = useState(0);

  const {
    location,
    price,
    jenisKost,
    kostFacilities,
    roomFacilities,
    keamanan,
  } = usePreferenceStore();
  const { savePreferences } = usePreference();
  const { facilities } = useFacility();

  const isStepValid =
    (step === 0 && !!location) ||
    (step === 1 && !!price?.min && !!price?.max) ||
    (step === 2 && !!jenisKost) ||
    (step === 3 && kostFacilities.length > 0 && roomFacilities.length > 0) ||
    (step === 4 && keamanan.length > 0) ||
    step === 5;

  const mapIdsToNames = (ids: string[]) => {
    if (!facilities.data) return [];
    return ids
      .map(
        (id) => facilities.data.find((item: Facility) => item._id === id)?.name,
      )
      .filter(Boolean);
  };

  const kostNames = mapIdsToNames(kostFacilities);
  const kamarNames = mapIdsToNames(roomFacilities);

  const handleSave = () => {
    savePreferences.mutate();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-xl space-y-6">
        {/* Step Indicator */}
        <StepIndicator steps={steps} step={step} />

        <div className="flex min-h-[400px] flex-col overflow-hidden rounded-lg bg-white shadow-lg">
          <div className="flex-1 overflow-auto px-6 py-6">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800">
                {stepContent[step].title}
              </h2>
              <p className="text-md text-gray-500">
                {stepContent[step].subtitle}
              </p>
            </div>
            <div className="space-y-4">
              {step === 0 && <LocationStep />}
              {step === 1 && <PriceStep />}
              {step === 2 && <JenisKostStep />}
              {step === 3 && (
                <FasilitasStep
                  data={facilities.data}
                  isLoading={facilities.isLoading}
                />
              )}
              {step === 4 && <KeamananStep />}
              {step === 5 && (
                <div>
                  <p className="text-gray-500">
                    Tinjau kembali preferensi kost kamu sebelum dikirim:
                  </p>
                  <ul className="mt-2 ml-5 list-disc space-y-1 text-sm text-gray-700">
                    <li>Lokasi: {location?.detail || "-"}</li>
                    <li>
                      Harga:{" "}
                      {price?.min && price?.max
                        ? `Rp ${Number(price.min).toLocaleString(
                            "id-ID",
                          )} - Rp ${Number(price.max).toLocaleString("id-ID")}`
                        : "-"}
                    </li>
                    <li>Jenis Kost: {jenisKost || "-"}</li>
                    <li>
                      Fasilitas Kost:{" "}
                      {facilities.isLoading
                        ? "Memuat..."
                        : kostNames.join(", ") || "-"}
                    </li>
                    <li>
                      Fasilitas Kamar:{" "}
                      {facilities.isLoading
                        ? "Memuat..."
                        : kamarNames.join(", ") || "-"}
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Footer bawah card */}
          <div className="flex items-center justify-between border-t px-6 py-4">
            <span className="text-sm text-gray-500">
              Langkah {step + 1} dari {steps.length}
            </span>
            <div className="space-x-2">
              <Button
                variant="outline"
                disabled={step === 0}
                onClick={() => setStep((s) => s - 1)}
              >
                Sebelumnya
              </Button>
              {step < steps.length - 1 ? (
                <Button
                  onClick={() => setStep((s) => s + 1)}
                  disabled={!isStepValid}
                >
                  Lanjut
                </Button>
              ) : (
                <Button
                  className="bg-green-600 text-white hover:bg-green-700"
                  disabled={!isStepValid || savePreferences.isPending}
                  onClick={handleSave}
                >
                  {savePreferences.isPending
                    ? "Menyimpan..."
                    : "Simpan Preferensi"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
