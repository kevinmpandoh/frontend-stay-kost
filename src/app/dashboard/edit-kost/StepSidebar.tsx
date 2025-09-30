"use client";

import { AppLogo } from "@/components/common/AppLogo";
import { useCreateKostStore } from "@/stores/createKost.store";

import { useRouter, useSearchParams } from "next/navigation";

const stepsGroup = [
  {
    title: "Kost",
    items: ["Informasi Kost", "Alamat Kost", "Fasilitas Kost", "Foto Kost"],
  },
];

export default function StepSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const kostId = searchParams.get("kost_id");
  const { currentStep } = useCreateKostStore();

  return (
    <aside className="bg-primary-50 flex min-h-screen w-[320px] flex-col px-8 py-12 select-none">
      <div className="flex justify-center">
        <AppLogo />
      </div>
      <nav className="flex flex-col gap-8 text-lg leading-5 font-normal">
        {stepsGroup.map((group, groupIndex) => (
          <div key={groupIndex}>
            <p className="mt-8 mb-4 font-semibold text-[#5F6D7E]">
              {group.title}
            </p>
            <ul className="flex flex-col gap-4">
              {group.items.map((label, stepIndex) => {
                const globalStep =
                  groupIndex === 0 ? stepIndex + 1 : stepIndex + 5;

                const isActive = globalStep === currentStep;

                const handleClick = () => {
                  if (!kostId) return;
                  router.push(
                    `/dashboard/edit-kost?kost_id=${kostId}&step=${globalStep}`,
                  );
                };

                return (
                  <li key={label}>
                    <button
                      onClick={handleClick}
                      className={`hover:bg-primary-50 flex w-full items-center justify-between rounded p-2 text-left font-semibold text-black transition-opacity hover:opacity-80`}
                    >
                      <span>{label}</span>
                      <div
                        className={`text-base ${
                          isActive ? "text-primary" : "text-gray-600"
                        }`}
                      >
                        Edit
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
