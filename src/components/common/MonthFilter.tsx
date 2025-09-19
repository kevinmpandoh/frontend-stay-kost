"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { parse, format } from "date-fns";
import { id } from "date-fns/locale";
import { Calendar } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SimpleMonthPicker from "@/components/common/MonthPicker";

interface MonthFilterProps {
  paramKey?: string; // default "month"
  placeholder?: string;
}

export default function MonthFilter({
  paramKey = "month",
  placeholder = "Pilih Bulan",
}: MonthFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const monthParam = searchParams.get(paramKey) || "";

  // convert string ke Date
  const selectedMonth = useMemo(() => {
    if (!monthParam) return null;
    const parsed = parse(monthParam, "yyyy-MM", new Date());
    return isNaN(parsed.getTime()) ? null : parsed;
  }, [monthParam]);

  const updateQuery = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value) {
      params.delete(paramKey);
    } else {
      params.set(paramKey, value);
    }

    params.set("page", "1"); // reset pagination
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleMonthSelect = (date: Date) => {
    const formatted = format(date, "yyyy-MM");
    updateQuery(formatted);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex w-full items-center justify-between rounded-md border px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 md:w-[300px]">
          <span>
            {selectedMonth
              ? format(selectedMonth, "MMMM yyyy", { locale: id })
              : placeholder}
          </span>
          <Calendar className="ml-2 h-5 w-5 text-gray-500" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-auto p-2">
        <SimpleMonthPicker
          selectedDate={selectedMonth ?? undefined}
          onSelect={handleMonthSelect}
        />
      </PopoverContent>
    </Popover>
  );
}
