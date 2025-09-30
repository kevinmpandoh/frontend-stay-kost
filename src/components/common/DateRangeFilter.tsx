"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface DateRangeFilterProps {
  startKey?: string; // default "startDate"
  endKey?: string; // default "endDate"
}

export default function DateRangeFilter({
  startKey = "startDate",
  endKey = "endDate",
}: DateRangeFilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialStart = searchParams.get(startKey) ?? "";
  const initialEnd = searchParams.get(endKey) ?? "";

  const [startDate, setStartDate] = useState(initialStart);
  const [endDate, setEndDate] = useState(initialEnd);

  useEffect(() => {
    setStartDate(initialStart);
    setEndDate(initialEnd);
  }, [initialStart, initialEnd]);

  const updateQuery = (newStart: string, newEnd: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newStart) {
      params.set(startKey, newStart);
    } else {
      params.delete(startKey);
    }

    if (newEnd) {
      params.set(endKey, newEnd);
    } else {
      params.delete(endKey);
    }

    params.set("page", "1"); // reset pagination
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleApply = () => {
    updateQuery(startDate, endDate);
  };

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    updateQuery("", "");
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="focus:border-primary focus:ring-primary rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring focus:outline-none"
      />
      <span className="text-gray-500">s/d</span>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="focus:border-primary focus:ring-primary rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring focus:outline-none"
      />
      <button
        onClick={handleApply}
        type="button"
        className="bg-primary-500 hover:bg-primary-600 rounded px-3 py-2 text-sm text-white"
      >
        Terapkan
      </button>
      {(startDate || endDate) && (
        <button
          onClick={handleReset}
          type="button"
          className="rounded px-3 py-2 text-sm text-gray-600 hover:bg-gray-100"
        >
          Reset
        </button>
      )}
    </div>
  );
}
