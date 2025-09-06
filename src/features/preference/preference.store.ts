import { create } from "zustand";

interface LocationData {
  via: "address" | "map";
  provinsi_id?: string;
  provinsi?: string;
  kabupaten_id?: string;
  kabupaten?: string;
  kecamatan_id?: string;
  kecamatan?: string;
  detail?: string;
  lat?: number;
  lng?: number;
}

interface PreferenceState {
  step: number;
  location: LocationData | null;
  price: {
    min: string;
    max: string;
  };
  jenisKost: string; // bisa lebih dari satu
  kostFacilities: string[];
  roomFacilities: string[];
  keamanan: string[];
  setStep: (step: number) => void;
  setLocation: (location: LocationData) => void;
  setPrice: (val: { min?: string; max?: string }) => void;
  setJenisKost: (val: string) => void;
  setKostFacilities: (facility: string[]) => void;
  setRoomFacilities: (facility: string[]) => void;
  setKeamanan: (keamanan: string[]) => void;
  reset: () => void;
}

export const usePreferenceStore = create<PreferenceState>((set) => ({
  step: 0,
  location: null,
  price: { min: "", max: "" },
  jenisKost: "",
  kostFacilities: [],
  roomFacilities: [],
  keamanan: [],
  setStep: (step) => set({ step }),
  setLocation: (location) => set({ location }),
  setPrice: (val) =>
    set((state) => ({
      price: {
        ...state.price,
        ...val,
      },
    })),
  setJenisKost: (val) => set({ jenisKost: val }),
  setKostFacilities: (facility) => set({ kostFacilities: facility }),
  setRoomFacilities: (facility) => set({ roomFacilities: facility }),
  setKeamanan: (keamanan) => set({ keamanan: keamanan }),
  reset: () =>
    set({
      step: 0,
      location: null,
      price: { min: "", max: "" },
      jenisKost: "",
      kostFacilities: [],
      roomFacilities: [],
      keamanan: [],
    }),
}));
