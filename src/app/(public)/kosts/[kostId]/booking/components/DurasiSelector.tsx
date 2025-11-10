"use client";

import { FC } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DurasiSelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

const DurasiSelector: FC<DurasiSelectorProps> = ({
  value,
  onChange,
  min = 1,
  max = 36, // contoh maksimal 3 tahun
}) => {
  const decrease = () => {
    if (value > min) onChange(value - 1);
  };

  const increase = () => {
    if (value < max) onChange(value + 1);
  };

  return (
    <div className="flex max-w-3xs items-center justify-between rounded-lg border border-gray-300">
      <Button
        type="button"
        variant={"outline"}
        size={"lg"}
        onClick={decrease}
        className={`h-12 ${value === 1 ? "cursor-not-allowed" : ""} rounded-r-none`}
        disabled={value === 1}
      >
        <Minus size={18} strokeWidth={2.5} />
      </Button>
      <span className="flex-1 text-center text-lg font-medium text-gray-800">
        {value} bulan
      </span>
      <Button
        type="button"
        size={"lg"}
        variant={"outline"}
        onClick={increase}
        disabled={value === max}
        className={`h-12 ${value === max ? "cursor-not-allowed" : ""} rounded-l-none`}
      >
        <Plus size={18} strokeWidth={2.5} />
      </Button>
    </div>
  );
};

export default DurasiSelector;
