"use client";

import { AppLogo } from "@/components/common/AppLogo";
import { Check } from "lucide-react";
import { useCreateKostStore } from "@/stores/createKost.store";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

interface StepSidebarProps {
  stepsGroup: {
    title: string;
    items: string[];
  }[];
  lastCompletedStep: number;
  basePath: string; // ex: "/dashboard/tambah-kost" atau "/dashboard/tambah-kost/tipe"
}

export default function StepSidebar({
  stepsGroup,
  lastCompletedStep,
  basePath,
}: StepSidebarProps) {
  const { currentStep } = useCreateKostStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const kostId = searchParams.get("kost_id");
  const kostTypeId = searchParams.get("kost_type_id");

  return (
    <aside className="bg-primary-50 flex min-h-screen w-[320px] flex-col px-8 py-12 select-none">
      <div className="mb-8 flex justify-center">
        <Link href={"/dashboard/owner"}>
          <AppLogo />
        </Link>
      </div>
      <nav className="flex flex-col gap-8 text-lg leading-5 font-normal">
        {stepsGroup.map((group, groupIndex) => (
          <div key={groupIndex}>
            <p className="mt-8 mb-4 font-semibold text-[#5F6D7E]">
              {group.title}
            </p>
            <ul className="flex flex-col gap-8">
              {group.items.map((label, stepIndex) => {
                const globalStep =
                  group.items.length * groupIndex + stepIndex + 1;

                const isActive = globalStep === currentStep;
                const isClickable = globalStep <= lastCompletedStep;
                const isCompleted =
                  globalStep < currentStep ||
                  (globalStep <= lastCompletedStep &&
                    globalStep !== currentStep);

                const handleClick = () => {
                  if (!kostId || !isClickable) return;

                  // jika ada kostTypeId tambahkan di query
                  const url = kostTypeId
                    ? `${basePath}?kost_id=${kostId}&kost_type_id=${kostTypeId}&step=${globalStep}`
                    : `${basePath}?kost_id=${kostId}&step=${globalStep}`;

                  router.push(url);
                };

                return (
                  <li key={label}>
                    <button
                      onClick={handleClick}
                      disabled={!isClickable}
                      className={`flex w-full items-center justify-between text-left font-semibold transition-opacity ${
                        isClickable
                          ? "text-black hover:opacity-80"
                          : "cursor-default text-gray-400 opacity-60"
                      }`}
                    >
                      <span>{label}</span>
                      <div
                        className={`ml-2 flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full border-2 ${
                          isCompleted
                            ? "border-primary-500 bg-primary-500 text-white"
                            : isActive
                              ? "border-primary-500 text-primary-500"
                              : "border-gray-400 text-gray-400"
                        }`}
                      >
                        <Check
                          size={13}
                          className={
                            isCompleted
                              ? ""
                              : isActive
                                ? "text-primary-500"
                                : "text-gray-400"
                          }
                          strokeWidth={4}
                        />
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
