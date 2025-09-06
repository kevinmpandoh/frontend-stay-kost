"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { usePreferenceStore } from "../preference.store";

export default function LocationByAddress() {
  const location = usePreferenceStore((state) => state.location);
  const setLocation = usePreferenceStore((state) => state.setLocation);

  const [provinsiList, setProvinsiList] = useState<any[]>([]);
  const [kabupatenList, setKabupatenList] = useState<any[]>([]);
  const [kecamatanList, setKecamatanList] = useState<any[]>([]);

  // Fetch provinsi on mount
  useEffect(() => {
    fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
      .then((res) => res.json())
      .then(setProvinsiList);
  }, []);

  // Fetch kabupaten when provinsi changes
  useEffect(() => {
    if (location?.provinsi_id) {
      fetch(
        `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${location.provinsi_id}.json`,
      )
        .then((res) => res.json())
        .then(setKabupatenList);
    } else {
      setKabupatenList([]);
    }
    setKecamatanList([]);
  }, [location?.provinsi_id]);

  // Fetch kecamatan when kabupaten changes
  useEffect(() => {
    if (location?.kabupaten_id) {
      fetch(
        `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${location.kabupaten_id}.json`,
      )
        .then((res) => res.json())
        .then(setKecamatanList);
    } else {
      setKecamatanList([]);
    }
  }, [location?.kabupaten_id]);

  return (
    <div className="space-y-4">
      {/* Provinsi */}
      <div className="space-y-4">
        <label className="text-mb mb-10">Provinsi</label>
        <Select
          value={location?.provinsi_id || ""}
          onValueChange={(val) => {
            const selected = provinsiList.find((p) => p.id === val);
            setLocation({
              via: "address",
              provinsi_id: selected.id,
              provinsi: selected.name,
              kabupaten_id: "",
              kabupaten: "",
              kecamatan_id: "",
              kecamatan: "",
              detail: "",
            });
          }}
        >
          <SelectTrigger className="w-full px-4 py-6">
            <SelectValue placeholder="Pilih Provinsi" />
          </SelectTrigger>
          <SelectContent>
            {provinsiList.map((prov) => (
              <SelectItem key={prov.id} value={prov.id}>
                {prov.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Kabupaten */}
      <div>
        <label className="text-mb">Kabupaten/Kota</label>
        <Select
          value={location?.kabupaten_id || ""}
          onValueChange={(val) => {
            const selected = kabupatenList.find((k) => k.id === val);
            setLocation({
              ...location,
              via: "address",
              kabupaten_id: selected.id,
              kabupaten: selected.name,
              kecamatan_id: "",
              kecamatan: "",
            });
          }}
          disabled={!location?.provinsi_id}
        >
          <SelectTrigger className="w-full px-4 py-6">
            <SelectValue placeholder="Pilih Kabupaten/Kota" />
          </SelectTrigger>
          <SelectContent>
            {kabupatenList.map((kab) => (
              <SelectItem key={kab.id} value={kab.id}>
                {kab.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Kecamatan */}
      <div>
        <label className="text-md">Kecamatan</label>
        <Select
          value={location?.kecamatan_id || ""}
          onValueChange={(val) => {
            const selected = kecamatanList.find((kec) => kec.id === val);
            setLocation({
              ...location,
              via: "address",
              kecamatan_id: selected.id,
              kecamatan: selected.name,
              detail: `${selected.name} ${location?.kabupaten} ${location?.provinsi}`,
            });
          }}
          disabled={!location?.kabupaten_id}
        >
          <SelectTrigger className="w-full px-4 py-6">
            <SelectValue placeholder="Pilih Kecamatan" />
          </SelectTrigger>
          <SelectContent>
            {kecamatanList.map((kec) => (
              <SelectItem key={kec.id} value={kec.id}>
                {kec.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
