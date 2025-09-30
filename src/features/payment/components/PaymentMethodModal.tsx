"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export type PaymentMethod = {
  name: string;
  logo: string;
  provider: string;
  method: string;
  channel: string;
};

type PaymentMethodCategory = {
  category: string;
  methods: PaymentMethod[];
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selected: PaymentMethod | null;
  setSelected: (method: PaymentMethod) => void;
  methods: PaymentMethodCategory[];
};

export const PaymentMethodDialog = ({
  isOpen,
  onClose,
  onConfirm,
  selected,
  setSelected,
  methods,
}: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pilih Metode Pembayaran</DialogTitle>
        </DialogHeader>

        <div className="mt-4 max-h-[60vh] space-y-6 overflow-y-auto">
          {methods.map((group) => (
            <div key={group.category}>
              <h3 className="mb-2 text-sm font-semibold text-gray-600">
                {group.category}
              </h3>
              <div className="space-y-2">
                {group.methods.map((method) => {
                  const isSelected = selected?.channel === method.channel;
                  return (
                    <label
                      key={method.channel}
                      className={`flex w-full cursor-pointer items-center justify-between gap-2 rounded-md border px-4 py-3 transition ${
                        isSelected
                          ? "border-primary-500 bg-primary-50"
                          : "border-gray-300"
                      }`}
                    >
                      {/* Kiri: Logo dan Nama */}
                      <div className="flex items-center gap-2">
                        <Image
                          src={method.logo}
                          alt={method.name}
                          className="object-contain"
                          width={24}
                          height={24}
                        />
                        <span>{method.name}</span>
                      </div>

                      {/* Kanan: Radio Button */}
                      <input
                        type="radio"
                        name="payment-method"
                        value={method.channel}
                        checked={isSelected}
                        onChange={() => setSelected(method)}
                        className="accent-primary-600 h-4 w-4"
                      />
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <DialogFooter className="pt-4">
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button disabled={!selected} onClick={onConfirm}>
            Pilih
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
