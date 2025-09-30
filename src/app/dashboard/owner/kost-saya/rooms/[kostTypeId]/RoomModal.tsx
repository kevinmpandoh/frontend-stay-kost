"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";

export const RoomModal = ({
  open,
  onClose,
  onSubmit,
  defaultValues,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  defaultValues?: {
    nomor_kamar?: string;
    lantai?: number;
    status_ketersediaan?: string;
  };
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues || {
      nomor_kamar: "",
      lantai: 1,
      status_ketersediaan: "Tersedia",
    },
  });

  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {defaultValues ? "Edit Kamar" : "Tambah Kamar"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            {...register("nomor_kamar")}
            placeholder="Nomor Kamar"
            required
          />
          <div>
            <label className="block text-sm font-medium mb-1">Lantai</label>
            <Input
              type="number"
              {...register("lantai", {
                required: "Wajib diisi",
                valueAsNumber: true,
                min: { value: 1, message: "Minimal lantai 1" },
              })}
            />
            {errors.lantai && (
              <p className="text-sm text-red-500 mt-1">
                {errors.lantai.message}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="status" {...register("status_ketersediaan")} />
            <label htmlFor="status" className="text-sm">
              Centang jika kamar sedang <strong>Terisi</strong>
            </label>
          </div>

          <DialogFooter>
            <Button type="submit">Simpan</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
