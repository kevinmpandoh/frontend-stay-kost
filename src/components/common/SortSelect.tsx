"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "@/lib/utils";

interface SortOption {
  key: string; // contoh: "createdAt_desc"
  label: string; // contoh: "Terbaru"
}

interface SortSelectProps {
  paramKey?: string; // default "sort"
  options: SortOption[];
  placeholder?: string;
  className?: string;
}

const SortSelect: React.FC<SortSelectProps> = ({
  paramKey = "sort",
  options,
  placeholder = "Urutkan",
  className,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentValue = searchParams.get(paramKey) || "";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value || value === "default") {
      params.delete(paramKey);
    } else {
      params.set(paramKey, value);
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <Select value={currentValue || "default"} onValueChange={handleChange}>
      <SelectTrigger className={cn("w-[200px] font-semibold", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="default">{placeholder}</SelectItem>
        {options.map((opt) => (
          <SelectItem key={opt.key} value={opt.key}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SortSelect;
