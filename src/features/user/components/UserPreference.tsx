"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { InputPrice } from "@/components/common/InputPrice";

const MapPicker = dynamic(() => import("@/components/common/MapPicker"), {
  ssr: false,
});

import { usePreference } from "@/features/preference/hooks/usePreference";
import { useRules } from "@/features/rules/hooks/useRules";
import { useFacility } from "@/features/facility/useFacility";
import {
  preferenceSchema,
  PreferenceForm,
} from "@/features/preference/preference.schema";
import { Facility } from "@/features/facility/facility.type";
import { FacilityGrid } from "@/features/preference/components/FacilityGrid";

import dynamic from "next/dynamic";
import Image from "next/image";

export default function PreferensiPengguna() {
  const { preferences, savePreferences } = usePreference();
  const { data, isLoading } = preferences;
  const { facilities } = useFacility();

  const kostFacilities = facilities?.data?.filter(
    (f: Facility) => f.category === "kost",
  );
  const roomFacilities = facilities?.data?.filter(
    (f: Facility) => f.category === "room",
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<PreferenceForm>({
    resolver: zodResolver(preferenceSchema),
    defaultValues: {
      price: 0,
      kostFacilities: [],
      roomFacilities: [],
      kostType: "putra",
      rules: [],
      address: { coordinates: { lat: -6.1751, lng: 106.865 } },
    },
  });

  // set default values from server
  useEffect(() => {
    if (data) {
      reset({
        price: data.price,
        kostFacilities: data.kostFacilities || [],
        roomFacilities: data.roomFacilities || [],
        kostType: data.kostType || "",
        rules: data.rules || [],
        address: data.location || {
          coordinates: { lat: -6.1751, lng: 106.865 },
        },
      });
    }
  }, [data, reset]);

  const onSubmit = (formData: PreferenceForm) => {
    savePreferences.mutate(formData);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <h1 className="mb-4 text-xl font-bold">Edit Preferensi</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Controller
          control={control}
          name="address.coordinates"
          render={({ field }) => (
            <div>
              <h3 className="mb-2 font-semibold">Lokasi Preferensi</h3>
              <p className="mb-2 text-sm text-gray-500">
                Klik pada peta untuk memilih lokasi kost yang diinginkan.
              </p>
              <div className="h-[300px] overflow-hidden rounded">
                <MapPicker
                  initialPosition={[field.value.lat, field.value.lng]}
                  onChange={({ lat, lng }) => field.onChange({ lat, lng })}
                />
              </div>
            </div>
          )}
        />
        <h3 className="mb-2 font-semibold">Harga Kost</h3>
        <Controller
          control={control}
          name="price"
          render={({ field }) => (
            <InputPrice
              label="Harga yang diinginkan"
              value={field.value}
              onChange={(val) => field.onChange(Number(val))}
              placeholder="Contoh: 1000000"
            />
          )}
        />

        {/* <Controller
          control={control}
          name="price.max"
          render={({ field }) => (
            <InputPrice
              label="Harga Maksimum"
              value={field.value}
              onChange={(val) => field.onChange(Number(val))}
              placeholder="Contoh: 2000000"
            />
          )}
        /> */}

        <div>
          <h3 className="mb-2 font-semibold">Tipe Kost</h3>
          <Controller
            control={control}
            name="kostType"
            render={({ field }) => {
              const options = [
                { label: "Putra", value: "putra", image: "/images/putra.png" },
                { label: "Putri", value: "putri", image: "/images/putri.png" },
                {
                  label: "Campur",
                  value: "campur",
                  image: "/images/campur.png",
                },
              ];

              return (
                <div className="grid grid-cols-3 gap-4">
                  {options.map((item) => {
                    const isSelected = field.value === item.value;
                    return (
                      <button
                        type="button"
                        key={item.value}
                        onClick={() => field.onChange(item.value)}
                        className={`flex flex-col items-center rounded-xl border p-3 transition ${
                          isSelected
                            ? "border-primary bg-primary-50"
                            : "border-gray-200 bg-white hover:bg-gray-50"
                        }`}
                      >
                        <Image
                          width={48}
                          height={48}
                          src={item.image}
                          alt={item.label}
                        />
                        <span className="mt-1 text-sm">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              );
            }}
          />
        </div>

        <Controller
          control={control}
          name="kostFacilities"
          render={({ field }) => (
            <FacilityGrid
              title="Fasilitas Kost"
              data={kostFacilities}
              selected={field.value} // array string
              setSelected={(ids) => field.onChange(ids)} // update array
            />
          )}
        />

        <Controller
          control={control}
          name="roomFacilities"
          render={({ field }) => (
            <FacilityGrid
              title="Fasilitas Kamar"
              data={roomFacilities}
              selected={field.value}
              setSelected={(ids) => field.onChange(ids)}
            />
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Menyimpan..." : "Simpan Preferensi"}
        </Button>
      </form>
    </>
  );
}
