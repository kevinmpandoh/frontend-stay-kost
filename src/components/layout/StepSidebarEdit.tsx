"use client";

import { AppLogo } from "../common/AppLogo";
import { useCreateKostStore } from "@/stores/createKost.store";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

interface StepSidebarProps {
  stepsGroup: {
    title: string;
    items: string[];
  }[];
  basePath: string; // ex: "/dashboard/tambah-kost" atau "/dashboard/tambah-kost/tipe"
}

export default function StepSidebarEdit({
  stepsGroup,
  basePath,
}: StepSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const kostId = searchParams.get("kost_id");
  const kostTypeId = searchParams.get("kost_type_id");
  const { currentStep } = useCreateKostStore();

  return (
    <aside className="bg-primary-50 flex min-h-screen w-[320px] flex-col px-8 py-12 select-none">
      <div className="flex justify-center">
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
            <ul className="flex flex-col gap-4">
              {group.items.map((label, stepIndex) => {
                const globalStep =
                  groupIndex === 0 ? stepIndex + 1 : stepIndex + 5;

                const isActive = globalStep === currentStep;

                const handleClick = () => {
                  if (!kostId) return;

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
