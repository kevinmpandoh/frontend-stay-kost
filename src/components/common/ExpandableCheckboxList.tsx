"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type Props = {
  label: string;
  options: string[];
  selected: string[];
  onChange: (value: string) => void;
  initialVisibleCount?: number;
};

export default function ExpandableCheckboxList({
  label,
  options,
  selected,
  onChange,
  initialVisibleCount = 4,
}: Props) {
  const [expanded, setExpanded] = useState(false);

  const visibleOptions = expanded
    ? options
    : options?.slice(0, initialVisibleCount);

  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">{label}</h3>
      <div className="grid grid-cols-4 gap-2">
        {visibleOptions?.map((item, index) => (
          <Label key={index} className="flex items-center gap-2">
            <Checkbox
              checked={selected.includes(item)}
              onCheckedChange={() => onChange(item)}
            />
            {item}
          </Label>
        ))}
      </div>
      {options?.length > initialVisibleCount && (
        <button
          type="button"
          className="text-sm text-blue-600 mt-2"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? "Sembunyikan" : "Lihat Semua"}
        </button>
      )}
    </div>
  );
}
