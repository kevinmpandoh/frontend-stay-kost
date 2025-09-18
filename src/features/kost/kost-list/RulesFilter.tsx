"use client";

interface Props {
  selected: string[];
  onToggle: (value: string) => void;
}

const kostRules = [
  "Tidak Boleh Bawa Tamu",
  "Tidak Boleh Merokok",
  "Tidak Boleh Pelihara Hewan",
];

export default function RulesFilter({ selected, onToggle }: Props) {
  return (
    <div className="space-y-2">
      <label className="font-medium text-sm block">Aturan Kost</label>
      <div className="flex gap-2 flex-wrap">
        {kostRules.map((rule) => (
          <button
            key={rule}
            onClick={() => onToggle(rule)}
            className={`px-3 py-1.5 rounded-full border text-sm transition
              ${
                selected.includes(rule)
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-muted-foreground hover:bg-muted"
              }`}
            type="button"
          >
            {rule}
          </button>
        ))}
      </div>
    </div>
  );
}
