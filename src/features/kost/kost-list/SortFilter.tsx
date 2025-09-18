"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Props {
  value: string;
  onChange: (val: string) => void;
}

const options = [
  { label: "Harga Termurah", value: "price_asc" },
  { label: "Harga Termahal", value: "price_desc" },
  { label: "Rating Tertinggi", value: "rating_high" },
  // { label: "Direkomendasikan", value: "recomended" },
];

export default function SortFilter({ value, onChange }: Props) {
  return (
    <div className="">
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className="grid grid-cols-2 gap-4"
      >
        {options.map((opt) => (
          <div
            key={opt.value}
            className="flex items-center space-x-3 text-base"
          >
            <RadioGroupItem
              value={opt.value}
              id={opt.value}
              className="h-5 w-5" // Membesarkan radio button
            />
            <Label
              htmlFor={opt.value}
              className="text-lg font-medium text-slate-700"
            >
              {opt.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
