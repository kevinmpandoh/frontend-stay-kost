"use client";

import { Star } from "lucide-react";

interface Props {
  selected: number | null;
  onChange: (rating: number | null) => void;
}

export default function RatingFilter({ selected, onChange }: Props) {
  return (
    <div className="space-y-2">
      <label className="font-medium text-sm block">Rating Minimal</label>
      <div className="flex gap-2">
        {[5, 4, 3, 2, 1].map((rating) => (
          <button
            key={rating}
            onClick={() => onChange(selected === rating ? null : rating)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full border text-sm transition
              ${
                selected === rating
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-muted-foreground hover:bg-muted"
              }`}
            type="button"
          >
            <Star className="w-4 h-4 fill-current" />
            {rating}+
          </button>
        ))}
      </div>
    </div>
  );
}
