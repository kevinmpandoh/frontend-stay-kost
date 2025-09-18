// components/kost/KostListHeader.tsx
"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function KostListHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }
    router.push(`/kosts?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto min-w-[200px] ">
      <div className="relative ">
        {/* Icon Search di dalam input */}
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          <Search size={18} />
        </span>
        <input
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-md border border-slate-200 rounded-md pl-10 pr-28 py-3.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          placeholder="Cari nama kost atau lokasi..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {/* Tombol Hapus */}
        {search && (
          <button
            type="button"
            className="absolute cursor-pointer right-24 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
            onClick={() => {
              setSearch("");
              const params = new URLSearchParams(searchParams.toString());
              params.delete("search");
              router.push(`/kosts?${params.toString()}`);
            }}
          >
            <X size={20} />
          </button>
        )}

        <button
          className="absolute top-1.5 right-1.5 flex items-center rounded-md bg-primary py-2 px-6 border border-transparent text-center font-semibold text-md text-white transition-all shadow-sm hover:shadow  hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          onClick={handleSearch}
        >
          Cari Kost
        </button>
      </div>
    </div>
  );
}
