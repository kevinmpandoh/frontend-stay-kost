"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { parseISO, format } from "date-fns";
import { id } from "date-fns/locale";
import { Calendar } from "lucide-react";
import { useState, useRef } from "react";
import SimpleCalendar from "@/components/ui/calendar2";

const bookingSchema = z.object({
  startDate: z.string().min(1, "Tanggal masuk wajib diisi"),
});

type FormValues = z.infer<typeof bookingSchema>;

interface Props {
  open: boolean;
  onClose: () => void;
  data: any;
  onSubmit: (values: { startDate: string }) => void;
  loading?: boolean;
}

export const BookingEditDialog = ({
  open,
  onClose,
  data,
  onSubmit,
  loading,
}: Props) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      startDate: data?.startDate ?? "",
    },
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit({
      startDate: values.startDate, // sudah dalam ISO string
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Booking</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="relative space-y-4 text-sm"
        >
          <Controller
            name="startDate"
            control={form.control}
            render={({ field }) => {
              const tanggalMasuk = field.value
                ? parseISO(field.value)
                : undefined;

              return (
                <div className="relative mb-4">
                  <Label className="mb-2 block text-sm font-medium text-gray-700">
                    Tanggal Masuk
                  </Label>
                  <input
                    readOnly
                    type="text"
                    value={
                      tanggalMasuk
                        ? format(tanggalMasuk, "dd MMMM yyyy", { locale: id })
                        : ""
                    }
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="w-full cursor-pointer rounded-lg border px-3 py-2 shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
                    placeholder="Pilih tanggal masuk"
                  />
                  <Calendar
                    size={18}
                    className="absolute top-10 right-3 text-gray-500"
                  />

                  {showCalendar && (
                    <div
                      ref={calendarRef}
                      className="absolute z-20 mt-2 rounded-xl border bg-white p-4 shadow-lg"
                    >
                      <SimpleCalendar
                        selectedDate={tanggalMasuk}
                        onSelect={(date) => {
                          field.onChange(date.toISOString()); // simpan ISO string ke react-hook-form
                          setShowCalendar(false);
                        }}
                      />
                    </div>
                  )}
                </div>
              );
            }}
          />

          {form.formState.errors.startDate && (
            <p className="text-xs text-red-500">
              {form.formState.errors.startDate.message}
            </p>
          )}

          <DialogFooter className="mt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Menyimpan..." : "Simpan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
