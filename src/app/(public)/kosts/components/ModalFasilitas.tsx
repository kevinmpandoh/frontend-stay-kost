// ModalFasilitas.tsx
"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

type ModalFasilitasProps = {
  open: boolean;
  onClose: (open: boolean) => void;
  selected: string[];
  onChange: (selected: string[]) => void;
};

const fasilitasOptions = [
  "AC",
  "Wifi",
  "Kamar Mandi Dalam",
  "Kasur",
  "Lemari",
  "Meja Belajar",
];

const ModalFasilitas = ({
  open,
  onClose,
  selected,
  onChange,
}: ModalFasilitasProps) => {
  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filter Fasilitas</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          {fasilitasOptions.map((option) => (
            <label key={option} className="flex items-center space-x-2">
              <Checkbox
                checked={selected.includes(option)}
                onCheckedChange={() => toggleOption(option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalFasilitas;
