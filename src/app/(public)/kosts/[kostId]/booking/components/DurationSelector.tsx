"use client";

import { FC } from "react";
import { Minus, Plus } from "lucide-react";

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
    <div className="flex items-center justify-between rounded-lg border border-gray-300 shadow-sm">
      <button
        type="button"
        onClick={decrease}
        className="px-4 py-2 text-teal-600 hover:bg-gray-50"
      >
        <Minus size={18} strokeWidth={2.5} />
      </button>
      <span className="flex-1 text-center text-lg font-medium text-gray-800">
        {value} bulan
      </span>
      <button
        type="button"
        onClick={increase}
        className="px-4 py-2 text-teal-600 hover:bg-gray-50"
      >
        <Plus size={18} strokeWidth={2.5} />
      </button>
    </div>
  );
};

export default DurasiSelector;
