"use client";

import { RULE_ICONS, DEFAULT_RULE_ICON } from "@/constants/rules";
import { cn } from "@/lib/utils";
import { usePreferenceStore } from "../preference.store";
import { useRules } from "@/features/rules/hooks/useRules";
import { Rules } from "@/features/rules/rules.type";

export default function RulesStep() {
  const { rules, setRules } = usePreferenceStore();
  const { rules: rulesList } = useRules();

  const toggle = (id: string) => {
    setRules(
      rules.includes(id) ? rules.filter((x) => x !== id) : [...rules, id],
    );
  };

  if (rulesList.isLoading) return <p>Memuat keamanan...</p>;

  return (
    <div className="grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-3">
      {rulesList.data.map((item: Rules) => {
        const isSelected = rules.includes(item._id);
        // const Icon = RULE_ICONS[item.name]?.icon || DEFAULT_RULE_ICON;

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
            {/* <Icon
              size={18}
              className={`h-8 w-8 ${
                isSelected ? "text-primary" : "text-gray-700"
              }`}
            /> */}
            <span className="text-sm font-medium text-gray-800">
              {item.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
