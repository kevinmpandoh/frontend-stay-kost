"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import React from "react";

type SortOption =
  | "terbaru"
  | "harga-terendah"
  | "harga-tertinggi"
  | "rating-tertinggi";

type Props = {
  open: boolean;
  onClose: () => void;
  value: SortOption;
  onChange: (value: SortOption) => void;
  onReset: () => void;
};

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "terbaru", label: "Terbaru" },
  { value: "harga-terendah", label: "Harga Terendah" },
  { value: "harga-tertinggi", label: "Harga Tertinggi" },
  { value: "rating-tertinggi", label: "Rating Tertinggi" },
];

export default function SortModal({
  open,
  onClose,
  value,
  onChange,
  onReset,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Urutkan</DialogTitle>
        </DialogHeader>
        <RadioGroup
          value={value}
          onValueChange={(val: any) => onChange(val as SortOption)}
        >
          {sortOptions.map((option) => (
            <div
              key={option.value}
              className="flex items-center space-x-2 py-2"
            >
              <RadioGroupItem value={option.value} id={option.value} />
              <Label htmlFor={option.value}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
        <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center pt-4">
          <Button
            variant="ghost"
            onClick={onReset}
            className="w-full sm:w-auto"
          >
            Reset
          </Button>
          <DialogClose asChild>
            <Button type="button" className="w-full sm:w-auto">
              Terapkan
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
