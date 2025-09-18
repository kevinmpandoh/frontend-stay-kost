"use client";

import { cn } from "@/lib/utils";

interface Props {
  name: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}

export default function FacilityCard({ name, icon, selected, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-2 border rounded-xl p-3 cursor-pointer transition-colors",
        selected
          ? "bg-primary/10 text-primary border-primary"
          : "hover:bg-gray-50"
      )}
    >
      <div
        className={`w-5 h-5 ${selected ? "text-primary" : "text-gray-500"} `}
      >
        {icon}
      </div>
      <p className="text-xs text-center">{name}</p>
    </div>
  );
}
