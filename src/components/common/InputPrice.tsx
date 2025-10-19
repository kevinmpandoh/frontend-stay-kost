"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/format";
import * as React from "react";

const parseCurrency = (formatted: string) => {
  return formatted.replace(/[^\d]/g, "");
};

interface InputPriceProps {
  label?: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  className?: any;
}

export function InputPrice({
  value,
  onChange,
  placeholder,
  size = "md",
  className,
}: InputPriceProps) {
  return (
    <div className="relative w-full">
      <span className="text-md text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2 font-semibold">
        Rp
      </span>
      <Input
        type="text"
        inputMode="numeric"
        value={formatCurrency(value)}
        onChange={(e) => onChange(parseCurrency(e.target.value))}
        placeholder={placeholder ?? "Contoh: 1000000"}
        className={cn("rounded p-6 pl-10", className)}
        size={size} // ini aman karena sesuai InputSize
      />
    </div>
  );
}
