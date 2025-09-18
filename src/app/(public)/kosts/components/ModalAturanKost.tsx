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

interface ModalAturanKostProps {
  open: boolean;
  onClose: () => void;
  selectedRules: string[];
  onChange: (rules: string[]) => void;
}

const ruleOptions = [
  "Tidak boleh bawa hewan",
  "Tidak boleh merokok",
  "Boleh pasutri",
  "Boleh kunjungan",
];

const ModalAturanKost = ({
  open,
  onClose,
  selectedRules,
  onChange,
}: ModalAturanKostProps) => {
  const [tempRules, setTempRules] = useState<string[]>(selectedRules);

  const toggleRule = (value: string) => {
    if (tempRules.includes(value)) {
      setTempRules(tempRules.filter((r) => r !== value));
    } else {
      setTempRules([...tempRules, value]);
    }
  };

  const handleSave = () => {
    onChange(tempRules);
    onClose();
  };

  const handleReset = () => {
    setTempRules([]);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Aturan Kost</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 py-2">
          {ruleOptions.map((rule) => (
            <label key={rule} className="flex items-center gap-2">
              <Checkbox
                checked={tempRules.includes(rule)}
                onCheckedChange={() => toggleRule(rule)}
              />
              <span>{rule}</span>
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

export default ModalAturanKost;
