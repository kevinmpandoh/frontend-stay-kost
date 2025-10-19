"use client";

import React from "react";

import { Controller, useForm } from "react-hook-form";
import DurasiSelector from "./DurasiSelector";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  BookingFormData,
  bookingSchema,
} from "@/features/booking/booking.schema";

import { useBookingStore } from "@/features/booking/booking.store";
import { Button } from "@/components/ui/button";
import { useTenantBooking } from "@/features/booking/hooks/useTenantBooking";
import { useUser } from "@/features/user/hooks/useUser";
import { Label } from "@/components/ui/label";
import DatePicker from "./DatePicker";
import { Textarea } from "@/components/ui/textarea";

interface BookingFormProps {
  kostId: string; // id kost yang mau di-booking
}

const BookingForm = ({ kostId }: BookingFormProps) => {
  const { startDate } = useBookingStore();

  const { createBooking, creating } = useTenantBooking();
  const { userCurrent } = useUser();

  const { data: user } = userCurrent;

  const onSubmit = async (data: BookingFormData) => {
    const date = new Date(data.startDate);

    // Tetap dalam zona waktu lokal (misal GMT+8)
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0"); // bulan 0-based
    const dd = String(date.getDate()).padStart(2, "0");

    const localDate = `${yyyy}-${mm}-${dd}`;

    try {
      createBooking({
        duration: data.duration,
        roomType: kostId,
        startDate: localDate,
        note: data.note,
      });
    } catch (error) {
      console.error(error);
      // Bisa kasih toast error atau alert kalau mau
    }
  };

  const { register, handleSubmit, control } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      duration: 1,
      startDate: startDate || new Date().toISOString().split("T")[0],
      ktp: null, // ini bisa null
      note: "", // opsional
    },
  });

  return (
    <>
      <h1 className="text-3xl font-bold">Pengajuan Sewa Kost</h1>
      {/* Informasi Peneywa */}
      <hr className="my-8 border-gray-200" />

      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Informasi Peneywa</h2>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Nama
          </label>
          <div className="mt-1">{user?.name}</div>
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Jenis Kelamin
          </label>
          <div className="mt-1">{user?.gender || "-"}</div>
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Nomor Telepon
          </label>
          <div className="mt-1">{user?.phone}</div>
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Kota Asal
          </label>
          <div className="mt-1">{user?.hometown || "-"}</div>
        </div>
      </div>
      <hr className="my-8 border-gray-200" />

      <h2 className="text-2xl font-semibold">Durasi & Tanggal Penyewaan</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div className="grid grid-cols-2 items-end gap-10">
          <div className="space-y-2">
            <Label className="text-lg font-medium text-gray-700">
              Tanggal Sewa
            </Label>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Tanggal Masuk"
                  value={field.value ? new Date(field.value) : undefined}
                  onChange={(date) => field.onChange(date.toISOString())}
                  minDate={new Date()}
                  maxDate={
                    new Date(new Date().setMonth(new Date().getMonth() + 3))
                  }
                />
              )}
            />
          </div>
          <div className="space-y-2">
            <Label className="block text-lg font-medium text-gray-700">
              Durasi Sewa
            </Label>
            <Controller
              name="duration"
              control={control}
              render={({ field }) => (
                <DurasiSelector onChange={field.onChange} value={field.value} />
              )}
            />
          </div>
        </div>

        {/* <hr className="my-8 border-gray-200" /> */}

        {/* Upload KTP */}
        {/* <h2 className="text-2xl font-semibold">Dokumen Persyaratan</h2>
        <div>
          <label className="mb-2 block text-base font-medium text-gray-700">
            KTP Opsional
          </label>
          <Controller
            name="ktp"
            control={control}
            render={({ field }) => <UploadDocument onChange={field.onChange} />}
          />
        </div> */}

        <hr className="my-8 border-gray-200" />
        <div className="space-y-2">
          <Label className="text-lg font-medium">
            Catatan Tambahan (Opsional)
          </Label>
          <Textarea
            {...register("note")}
            // className="mt-1 w-full rounded-lg border px-3 py-2"
            rows={4}
          />
        </div>

        <Button
          size={"lg"}
          type="submit"
          disabled={creating}
          className={`w-full`}
        >
          {creating ? "Mengajukan..." : "Ajukan Sewa"}
        </Button>
      </form>
    </>
  );
};

export default BookingForm;
