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
}: {
  title: string;
  data: Facility[];
  selected: string[];
  setSelected: (ids: string[]) => void;
}) {
  const [showAll, setShowAll] = useState(false);

  const toggle = (id: string) => {
    setSelected(
      selected.includes(id)
        ? selected.filter((x) => x !== id)
        : [...selected, id],
    );
  };

  const displayList = showAll ? data : data?.slice(0, MAX_DISPLAY);

  return (
    <div className="mb-6">
      <h3 className="mb-2 font-medium text-gray-700">{title}</h3>
      <div className="grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-4">
        {displayList?.map((fasilitas) => {
          const isSelected = selected.includes(fasilitas._id);
          const iconInfo = FACILITY_ICONS[fasilitas.name];
          const Icon = iconInfo?.icon;

          return (
            <button
              key={fasilitas._id}
              type="button"
              onClick={() => toggle(fasilitas._id)}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-left transition",
                isSelected
                  ? "bg-primary/10 border-primary"
                  : "border-[#D9D9D9] bg-white",
              )}
            >
              <Icon
                className={`h-5 w-5 ${
                  isSelected ? "text-primary" : "text-gray-700"
                }`}
              />
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
