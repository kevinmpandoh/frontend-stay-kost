"use client";

import { RULE_ICONS, DEFAULT_RULE_ICON } from "@/constants/rules";
import { cn } from "@/lib/utils";
import { usePreferenceStore } from "../preference.store";
import { useRules } from "@/features/rules/useRules";
import { Rules } from "@/features/rules/rules.type";

export default function KeamananStep() {
  const keamanan = usePreferenceStore((state) => state.keamanan);
  const setKeamanan = usePreferenceStore((state) => state.setKeamanan);
  const { rules } = useRules();

  const toggle = (id: string) => {
    setKeamanan(
      keamanan.includes(id)
        ? keamanan.filter((x) => x !== id)
        : [...keamanan, id],
    );
  };

  if (rules.isLoading) return <p>Memuat keamanan...</p>;

  return (
    <div className="grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-3">
      {rules.data.map((item: Rules) => {
        const isSelected = keamanan.includes(item._id);
        const Icon = RULE_ICONS[item.name]?.icon || DEFAULT_RULE_ICON;

        return (
          <button
            key={item._id}
            type="button"
            onClick={() => toggle(item._id)}
            className={cn(
              "flex items-center gap-3 rounded-lg border px-4 py-3 text-left transition",
              isSelected
                ? "bg-primary/10 border-primary"
                : "border-[#D9D9D9] bg-white",
            )}
          >
            <Icon
              className={`h-5 w-5 ${
                isSelected ? "text-primary" : "text-gray-700"
              }`}
            />
            <span className="text-sm font-medium text-gray-800">
              {item.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
