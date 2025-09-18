"use client";

import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface SearchInputProps {
  placeholder?: string;
  paramKey?: string; // biar fleksibel (default: "search")
}

export default function SearchInput({
  placeholder = "Cari...",
  paramKey = "search",
}: SearchInputProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // ambil nilai awal dari query param
  const initialValue = searchParams.get(paramKey) ?? "";
  const [value, setValue] = useState(initialValue);

  // kalau query berubah dari luar, sync juga
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const updateQuery = (newValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newValue) {
      params.set(paramKey, newValue);
      params.set("page", "1"); // reset ke page 1 tiap search
    } else {
      params.delete(paramKey);
      params.set("page", "1");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearch = () => {
    updateQuery(value.trim());
  };

  const handleReset = () => {
    setValue("");
    updateQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />

      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="focus:ring-primary focus:border-primary w-full rounded-md border border-gray-300 py-3 pr-24 pl-10 text-gray-700 placeholder-gray-400 shadow-sm focus:ring focus:outline-none"
      />

      <div className="absolute inset-y-0 right-2 flex items-center gap-2">
        {value && (
          <button
            onClick={handleReset}
            type="button"
            className="rounded p-1 text-gray-500 hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        <button
          onClick={handleSearch}
          type="button"
          className="bg-primary-500 hover:bg-primary-600 cursor-pointer rounded px-3 py-1.5 text-white"
        >
          Cari
        </button>
      </div>
    </div>
  );
}
