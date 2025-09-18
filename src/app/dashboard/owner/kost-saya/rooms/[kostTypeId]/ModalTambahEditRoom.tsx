"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { roomService } from "@/features/room/services/room.service";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

type FormValues = {
  nomor_kamar: string;
  lantai: number;
  status_ketersediaan: boolean; // true: Terisi, false: Tersedia
};

type Props = {
  kostTypeId: string;
  defaultValues?: {
    _id: string;
    nomor_kamar: string;
    lantai: number;
    status_ketersediaan: "occupied" | "available";
  };
  trigger?: React.ReactNode;
};

export const ModalTambahEditRoom = ({
  kostTypeId,
  defaultValues,
  trigger,
}: Props) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      nomor_kamar: "",
      lantai: 1,
      status_ketersediaan: false,
    },
  });

  // Isi defaultValue saat edit
  useEffect(() => {
    if (defaultValues) {
      setValue("nomor_kamar", defaultValues.nomor_kamar);
      setValue("lantai", defaultValues.lantai);
      setValue(
        "status_ketersediaan",
        defaultValues.status_ketersediaan === "occupied",
      );
    }
  }, [defaultValues, setValue]);

  const isEdit = !!defaultValues;

  const mutation = useMutation({
    mutationFn: (data: FormValues) => {
      const payload = {
        number: data.nomor_kamar,
        floor: Number(data.lantai),
        status: data.status_ketersediaan ? "occupied" : "available",
      };

      return isEdit
        ? roomService.updateRoom(defaultValues!._id, payload)
        : roomService.createRoom(kostTypeId, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["owner-room"] });
      setOpen(false);
      reset();
    },
  });

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger ? (
        <DialogTrigger asChild>{trigger}</DialogTrigger>
      ) : (
        <Button onClick={() => setOpen(true)}>
          <Plus /> Tambah Kamar
        </Button>
      )}

      <DialogContent className="w-[400px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Kamar" : "Tambah Kamar"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">
              Nomor / Nama Kamar
            </label>
            <Input {...register("nomor_kamar", { required: "Wajib diisi" })} />
            {errors.nomor_kamar && (
              <p className="mt-1 text-sm text-red-500">
                {errors.nomor_kamar.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Lantai</label>
            <Input
              type="number"
              {...register("lantai", {
                required: "Wajib diisi",
                valueAsNumber: true,
                min: { value: 1, message: "Minimal lantai 1" },
              })}
            />
            {errors.lantai && (
              <p className="mt-1 text-sm text-red-500">
                {errors.lantai.message}
              </p>
            )}
          </div>

          <Controller
            control={control}
            name="status_ketersediaan"
            render={({ field }) => (
              <div className="flex items-center gap-2">
                <Checkbox
                  id="status_ketersediaan"
                  className=""
                  checked={field.value}
                  onCheckedChange={(checked) =>
                    field.onChange(checked as boolean)
                  }
                />
                <label htmlFor="status_ketersediaan">Kamar sudah terisi</label>
              </div>
            )}
          />

          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button variant="ghost" type="button">
                Batal
              </Button>
            </DialogClose>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending
                ? "Menyimpan..."
                : isEdit
                  ? "Simpan Perubahan"
                  : "Tambah"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
