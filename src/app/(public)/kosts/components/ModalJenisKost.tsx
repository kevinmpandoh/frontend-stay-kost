"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

interface ModalJenisKostProps {
  open: boolean;
  onClose: () => void;
  selectedJenis: string[];
  onChange: (jenis: string[]) => void;
}

const jenisOptions = ["Putra", "Putri", "Campur"];

const ModalJenisKost = ({
  open,
  onClose,
  selectedJenis,
  onChange,
}: ModalJenisKostProps) => {
  const [tempJenis, setTempJenis] = useState<string[]>(selectedJenis);

  const toggleJenis = (value: string) => {
    if (tempJenis.includes(value)) {
      setTempJenis(tempJenis.filter((j) => j !== value));
    } else {
      setTempJenis([...tempJenis, value]);
    }
  };

  const handleSave = () => {
    onChange(tempJenis);
    onClose();
  };

  const handleReset = () => {
    setTempJenis([]);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Jenis Kost</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 py-2">
          {jenisOptions.map((jenis) => (
            <label key={jenis} className="flex items-center gap-2">
              <Checkbox
                checked={tempJenis.includes(jenis)}
                onCheckedChange={() => toggleJenis(jenis)}
              />
              <span>{jenis}</span>
            </label>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <Button variant="ghost" onClick={handleReset}>
            Reset
          </Button>
          <Button onClick={handleSave}>Terapkan</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalJenisKost;
