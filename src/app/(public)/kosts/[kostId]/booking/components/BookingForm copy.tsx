"use client";

import React, { useState } from "react";

import { Controller, useForm } from "react-hook-form";
import DurasiSelector from "./DurasiSelector";
import UploadDocument from "./UploadDocument";
import TanggalMasukModal from "./BookingDateModal";

import { useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
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

interface BookingFormProps {
  kostId: string; // id kost yang mau di-booking
}

interface FormValues {
  durasi: number;
  tanggalMasuk: string;
  ktp?: File | null | undefined; // ktp boleh null
  catatan?: string | null; // bukan opsional lagi
}

const BookingForm = ({ kostId }: BookingFormProps) => {
  const { startDate } = useBookingStore();

  const { createBooking, creating } = useTenantBooking();
  const { userCurrent } = useUser();

  const { data: user, isLoading } = userCurrent;

  const [isTanggalModalOpen, setIsTanggalModalOpen] = useState(false);

  const openTanggalModal = () => setIsTanggalModalOpen(true);
  const closeTanggalModal = () => setIsTanggalModalOpen(false);

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
      });
    } catch (error) {
      console.error(error);
      // Bisa kasih toast error atau alert kalau mau
    }
  };

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BookingFormData>({
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
        {/* <a
          href="#"
          className="text-gray-700 text-base font-semibold hover:underline"
        >
          Ubah Data Diri
        </a> */}
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
          <div className="mt-1">{user?.jenis_kelamin || "-"}</div>
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
          <div className="mt-1">{user?.kota_asal || "-"}</div>
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
                />
              )}
            />
            {/* <button
              type="button"
              onClick={openTanggalModal}
              className="mt-1 w-full rounded border px-3 py-2 text-left"
            >
              {watch("startDate")
                ? new Date(watch("startDate")).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Pilih tanggal"}
            </button> */}
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
        {/* <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center justify-between">
              <label className="text-base font-medium text-gray-700">
                Tanggal Masuk Kost
              </label>
              <button
                type="button"
                onClick={openTanggalModal}
                className="text-base text-blue-600"
              >
                Ubah Tanggal
              </button>
            </div>
            <p className="mt-2 text-gray-800">
              {watch("startDate")
                ? new Date(watch("startDate")).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "-"}
            </p>
          </div>
          <div>
            <label className="mb-2 block text-base font-medium text-gray-700">
              Durasi sewa kost
            </label>
            <Controller
              name="duration"
              control={control}
              render={({ field }) => (
                <DurasiSelector value={field.value} onChange={field.onChange} />
              )}
            />
            {errors.duration && (
              <p className="mt-1 text-base text-red-500">
                {errors.duration.message}
              </p>
            )}
          </div>
        </div> */}
        <hr className="my-8 border-gray-200" />

        {/* Upload KTP */}
        <h2 className="text-2xl font-semibold">Dokumen Persyaratan</h2>
        <div>
          <label className="mb-2 block text-base font-medium text-gray-700">
            KTP Opsional
          </label>
          <Controller
            name="ktp"
            control={control}
            render={({ field }) => <UploadDocument onChange={field.onChange} />}
          />
        </div>

        <hr className="my-8 border-gray-200" />
        <div>
          <label className="block text-xl font-medium">
            Catatan Tambahan (Opsional)
          </label>
          <textarea
            {...register("note")}
            className="mt-1 w-full rounded-lg border px-3 py-2"
            rows={4}
          />
        </div>

        <Button type="submit" disabled={creating} className={`w-full`}>
          {creating ? "Mengajukan..." : "Ajukan Sewa"}
        </Button>
      </form>
      {/* Modal Tanggal Masuk */}
      <TanggalMasukModal
        isOpen={isTanggalModalOpen}
        onClose={closeTanggalModal}
        initialDate={watch("startDate") || new Date()}
        onSave={(date) => {
          setValue("startDate", date.toString());
        }}
      />
    </>
  );
};

export default BookingForm;
