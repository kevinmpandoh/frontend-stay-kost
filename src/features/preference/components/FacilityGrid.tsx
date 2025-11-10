"use client";

import { Button } from "@/components/ui/button";
import { FACILITY_ICONS } from "@/constants/facilities";
import { Facility } from "@/features/facility/facility.type";
import { cn } from "@/lib/utils";
import { useState } from "react";

const MAX_DISPLAY = 8;

export function FacilityGrid({
  title,
  data,
  selected,
  setSelected,
  className,
  valueKey = "id", // 🆕 default pakai id
}: {
  title: string;
  data: Facility[];
  selected: string[];
  setSelected: (values: string[]) => void;
  className?: string;
  valueKey?: "id" | "name"; // 🆕 bisa pilih id atau name
}) {
  const [showAll, setShowAll] = useState(false);

  const toggle = (value: string) => {
    setSelected(
      selected.includes(value)
        ? selected.filter((x) => x !== value)
        : [...selected, value],
    );
  };

  const displayList = showAll ? data : data?.slice(0, MAX_DISPLAY);

  return (
    <div className="mb-6">
      <h3 className="mb-2 font-medium text-gray-700">{title}</h3>

      <div
        className={cn(
          `grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-4`,
          className,
        )}
      >
        {displayList?.map((fasilitas) => {
          const value = valueKey === "name" ? fasilitas.name : fasilitas._id;
          const isSelected = selected.includes(value);

          const iconInfo = FACILITY_ICONS[fasilitas.name];
          const Icon = iconInfo?.icon;

          return (
            <button
              key={fasilitas._id}
              type="button"
              onClick={() => toggle(value)}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-left transition",
                isSelected
                  ? "bg-primary/10 border-primary"
                  : "border-[#D9D9D9] bg-white",
              )}
            >
              {Icon && (
                <Icon
                  className={`h-5 w-5 ${
                    isSelected ? "text-primary" : "text-gray-700"
                  }`}
                />
              )}
              <span className="text-sm font-medium text-gray-800">
                {fasilitas.name}
              </span>
            </button>
          );
        })}
      </div>

      {data?.length > MAX_DISPLAY && (
        <div className="mt-3">
          <Button
            type="button"
            variant="ghost"
            className="text-primary-600 text-sm"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "Sembunyikan" : "Lihat Semua"}
          </Button>
        </div>
      )}
    </div>
  );
}
