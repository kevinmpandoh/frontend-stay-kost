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
    if (location?.provinceId) {
      fetch(
        `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${location.provinceId}.json`,
      )
        .then((res) => res.json())
        .then(setKabupatenList);
    } else {
      setKabupatenList([]);
    }
    setKecamatanList([]);
  }, [location?.provinceId]);

  // Fetch kecamatan when kabupaten changes
  useEffect(() => {
    if (location?.cityId) {
      fetch(
        `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${location.cityId}.json`,
      )
        .then((res) => res.json())
        .then(setKecamatanList);
    } else {
      setKecamatanList([]);
    }
  }, [location?.cityId]);

  return (
    <div className="space-y-4">
      {/* Provinsi */}
      <div className="space-y-4">
        <label className="text-mb mb-10">Provinsi</label>
        <Select
          value={location?.provinceId || ""}
          onValueChange={(val) => {
            const selected = provinsiList.find((p) => p.id === val);
            setLocation({
              via: "address",
              provinceId: selected.id,
              province: selected.name,
              cityId: "",
              city: "",
              districtId: "",
              district: "",
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
          value={location?.cityId || ""}
          onValueChange={(val) => {
            const selected = kabupatenList.find((k) => k.id === val);
            setLocation({
              ...location,
              via: "address",
              cityId: selected.id,
              city: selected.name,
              districtId: "",
              district: "",
            });
          }}
          disabled={!location?.provinceId}
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
          value={location?.districtId || ""}
          onValueChange={(val) => {
            const selected = kecamatanList.find((kec) => kec.id === val);
            setLocation({
              ...location,
              via: "address",
              districtId: selected.id,
              district: selected.name,
              detail: `${selected.name} ${location?.city} ${location?.province}`,
            });
          }}
          disabled={!location?.cityId}
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
