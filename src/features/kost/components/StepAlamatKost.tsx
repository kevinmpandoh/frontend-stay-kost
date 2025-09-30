"use client";

import TextArea from "@/components/form/input/TextArea";
import Label from "@/components/form/Label";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { useCreateKostStore } from "@/stores/createKost.store";
import dynamic from "next/dynamic";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

import { useRouter } from "next/navigation";
import { useOwnerKost } from "@/features/kost/hooks/useOwnerKost";

const MapPicker = dynamic(() => import("./steps/MapPicker"), {
  ssr: false,
});

function formatName(name: string | undefined) {
  if (!name) return;
  return name
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const step2Schema = yup.object({
  provinsi: yup.string().required("Provinsi wajib diisi"),
  kabupaten: yup.string().required("Kabupaten/Kota wajib diisi"),
  kecamatan: yup.string().required("Kecamatan wajib diisi"),
  latitude: yup.number().required("Latitude wajib diisi"),
  longitude: yup.number().required("Longitude wajib diisi"),
  detail_alamat: yup.string().required(),
});

type Step2FormValues = {
  provinsi: string;
  kabupaten: string;
  kecamatan: string;
  latitude: number;
  longitude: number;
  detail_alamat: string;
};

export default function StepAlamatKost() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Step2FormValues>({
    resolver: yupResolver(step2Schema),
  });

  const { setCurrentStep, setOnNext, alamatKost, kostId } =
    useCreateKostStore();

  const { saveAddress } = useOwnerKost(kostId ?? "");
  const router = useRouter();

  const [provinsiList, setProvinsiList] = useState<any[]>([]);
  const [kabupatenList, setKabupatenList] = useState<any[]>([]);
  const [kecamatanList, setKecamatanList] = useState<any[]>([]);

  useEffect(() => {
    setCurrentStep(2);
    setOnNext(
      handleSubmit((data) => {
        if (!kostId) return;

        saveAddress({
          kostId: kostId,
          data: {
            province: formatName(data.provinsi),
            city: formatName(data.kabupaten),
            district: formatName(data.kecamatan),
            detail: data.detail_alamat,
            coordinates: {
              lat: data.latitude,
              lng: data.longitude,
            },
          },
        });
      }),
    );
  }, [handleSubmit, setOnNext, setCurrentStep, saveAddress, kostId, router]);

  useEffect(() => {
    if (!alamatKost) return;

    if (alamatKost && Object.keys(alamatKost).length > 0) {
      setValue("provinsi", alamatKost.provinsi || "");
      setValue("kabupaten", alamatKost.kabupaten_kota || "");
      setValue("kecamatan", alamatKost.kecamatan || "");
      setValue("detail_alamat", alamatKost.detail_alamat || "");
      setValue("latitude", alamatKost.koordinat?.lat || 0);
      setValue("longitude", alamatKost.koordinat?.lng || 0);
    }
  }, [alamatKost, setValue]);

  useEffect(() => {
    if (!alamatKost) return;

    const loadWilayah = async () => {
      setValue("provinsi", alamatKost.provinsi || "");
      setValue("kabupaten", alamatKost.kabupaten_kota || "");
      setValue("kecamatan", alamatKost.kecamatan || "");
      setValue("detail_alamat", alamatKost.detail_alamat || "");
      setValue("latitude", alamatKost.koordinat?.lat || 0);
      setValue("longitude", alamatKost.koordinat?.lng || 0);

      // Cari provinsi terpilih
      const selectedProvinsi = provinsiList.find(
        (prov) => formatName(prov.name) === formatName(alamatKost.provinsi),
      );
      if (!selectedProvinsi) return;

      // Fetch kabupaten berdasarkan provinsi
      const kabRes = await fetch(
        `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvinsi.id}.json`,
      );
      const kabData = await kabRes.json();
      setKabupatenList(kabData);

      // Cari kabupaten terpilih
      const selectedKabupaten = kabData.find(
        (kab: any) =>
          formatName(kab.name) === formatName(alamatKost.kabupaten_kota),
      );
      if (!selectedKabupaten) return;

      // Fetch kecamatan berdasarkan kabupaten
      const kecRes = await fetch(
        `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedKabupaten.id}.json`,
      );
      const kecData = await kecRes.json();
      setKecamatanList(kecData);
    };

    loadWilayah();
  }, [alamatKost, provinsiList, setValue]);

  useEffect(() => {
    fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
      .then((res) => res.json())
      .then(setProvinsiList);
  }, []);

  return (
    <form className="max-w-xl">
      <h1 className="mb-8 text-2xl font-extrabold">Cari Alamat Kost Anda</h1>

      <div className="mb-6">
        <div className="-z-10 flex h-[350px] w-full flex-col rounded-lg text-gray-500">
          <MapPicker
            value={{
              lat: watch("latitude") || 0,
              lng: watch("longitude") || 0,
            }}
            onChange={(coords) => {
              setValue("latitude", coords.lat);
              setValue("longitude", coords.lng);
            }}
          />
        </div>

        {errors.latitude && errors.longitude && (
          <p className="text-sm text-red-500">Silahkan Pilih Alamat di Peta</p>
        )}
      </div>

      <div className="mb-6">
        <Label>Provinsi</Label>
        <Select
          onValueChange={async (provId) => {
            const selected = provinsiList.find((p) => p.id === provId);
            setValue("provinsi", selected?.name || "");

            const res = await fetch(
              `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provId}.json`,
            );
            const data = await res.json();
            setKabupatenList(data);
            setKecamatanList([]); // Reset kecamatan
            setValue("kabupaten", "");
            setValue("kecamatan", "");
          }}
        >
          <SelectTrigger className="w-full py-6">
            {formatName(watch("provinsi")) || "Pilih Provinsi"}
          </SelectTrigger>
          <SelectContent className="z-[9999]">
            {provinsiList.map((prov) => (
              <SelectItem key={prov.id} value={prov.id}>
                {formatName(prov.name)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.provinsi && (
          <p className="text-sm text-red-500">{errors.provinsi.message}</p>
        )}
      </div>

      <div className="mb-6">
        <Label>Kabupaten/Kota</Label>
        <Select
          onValueChange={async (kabId) => {
            const selected = kabupatenList.find((k) => k.id === kabId);
            setValue("kabupaten", selected?.name || "");

            const res = await fetch(
              `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${kabId}.json`,
            );
            const data = await res.json();
            setKecamatanList(data);
            setValue("kecamatan", "");
          }}
          // disabled={kabupatenList.length === 0}
        >
          <SelectTrigger className="w-full py-6">
            {formatName(watch("kabupaten")) || "Pilih Kabupaten/Kota"}
          </SelectTrigger>
          <SelectContent className="z-[9999]">
            {kabupatenList.map((kab) => (
              <SelectItem key={kab.id} value={kab.id}>
                {formatName(kab.name)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.kabupaten && (
          <p className="text-sm text-red-500">{errors.kabupaten.message}</p>
        )}
      </div>

      <div className="mb-6">
        <Label>Kecamatan</Label>
        <Select
          onValueChange={(kecId) => {
            const selected = kecamatanList.find((k) => k.id === kecId);
            setValue("kecamatan", selected?.name || "");
          }}
          disabled={kecamatanList.length === 0}
        >
          <SelectTrigger className="w-full py-6">
            {formatName(watch("kecamatan")) || "Pilih Kecamatan"}
          </SelectTrigger>
          <SelectContent className="z-[9999]">
            {kecamatanList.map((kec) => (
              <SelectItem key={kec.id} value={kec.id}>
                {formatName(kec.name)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.kecamatan && (
          <p className="text-sm text-red-500">{errors.kecamatan.message}</p>
        )}
      </div>

      <div className="mb-6">
        <Label>Detail Alamat</Label>
        <TextArea
          {...register("detail_alamat")}
          placeholder="Masukkan detail alamat anda"
          rows={3}
          error={!!errors.detail_alamat}
        />
        {errors.detail_alamat && (
          <p className="text-sm text-red-500">{errors.detail_alamat.message}</p>
        )}
      </div>
    </form>
  );
}
