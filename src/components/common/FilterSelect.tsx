"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface FilterSelectProps {
  paramKey: string; // nama query param (contoh: "rating" / "status")
  placeholder?: string;
  options: { value: string; label: string }[];
}

export default function FilterSelect({
  paramKey,
  placeholder = "Pilih",
  options,
}: FilterSelectProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialValue = searchParams.get(paramKey) ?? "";
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const updateQuery = (newValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newValue && newValue !== "all") {
      params.set(paramKey, newValue);
    } else {
      params.delete(paramKey);
    }
    params.set("page", "1"); // reset ke page 1 tiap filter ganti
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleChange = (val: string) => {
    setValue(val);
    updateQuery(val);
  };

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
