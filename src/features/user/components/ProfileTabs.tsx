// components/user/TabsProfile.tsx

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils"; // optional: classNames helper

const tabs = ["Informasi Akun", "Ganti Password", "Preferensi"];

export default function ProfileTabs({
  onChange,
}: {
  onChange: (tab: string) => void;
}) {
  const [active, setActive] = useState("Informasi Akun");

  const handleClick = (tab: string) => {
    setActive(tab);
    onChange(tab);
  };

  return (
    <nav className="mt-8 flex font-semibold text-[#64748B]">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={cn(
            "mr-8 cursor-pointer border-b-2 pb-2 text-left text-sm sm:text-base",
            active === tab
              ? "text-primary-600 border-primary-text-primary-600"
              : "border-transparent",
          )}
          onClick={() => handleClick(tab)}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
}
