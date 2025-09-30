"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";

type ModalHargaProps = {
  open: boolean;
  onClose: (open: boolean) => void;
  value: number[];
  onChange: (value: number[]) => void;
};

const ModalHarga = ({ open, onClose, value, onChange }: ModalHargaProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filter Harga</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Slider
            defaultValue={value}
            min={500000}
            max={5000000}
            step={50000}
            onValueChange={onChange}
          />
          <div className="text-center mt-2 font-medium">
            Rp {value[0].toLocaleString()} - Rp {value[1].toLocaleString()}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalHarga;
