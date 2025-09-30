"use client";

import { Users } from "lucide-react";

interface Props {
  selected: string[];
  onToggle: (value: string) => void;
}

const kostTypes = [
  { label: "putra", icon: Users },
  { label: "putri", icon: Users },
  { label: "campur", icon: Users },
];

export default function KostTypeFilter({ selected, onToggle }: Props) {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-3">
        {kostTypes.map(({ label, icon: Icon }) => {
          const isActive = selected.includes(label);
          return (
            <button
              key={label}
              onClick={() => onToggle(label)}
              type="button"
              className={`flex w-36 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border p-3 capitalize transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary border-primary"
                  : "text-muted-foreground hover:bg-muted bg-white"
              }`}
            >
              <Icon size={20} />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
