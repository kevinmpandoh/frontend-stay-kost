import { create } from "zustand";

interface LocationData {
  via: "address" | "map";
  provinceId?: string;
  province?: string;
  cityId?: string;
  city?: string;
  districtId?: string;
  district?: string;
  detail?: string;
  lat?: number;
  lng?: number;
}

interface PreferenceState {
  step: number;
  location: LocationData | null;
  price: string;
  kostType: "putra" | "putri" | "campur"; // bisa lebih dari satu
  kostFacilities: string[];
  roomFacilities: string[];
  setStep: (step: number) => void;
  setLocation: (location: LocationData) => void;
  setPrice: (val: string) => void;
  setKostType: (val: "putra" | "putri" | "campur") => void;
  setKostFacilities: (facility: string[]) => void;
  setRoomFacilities: (facility: string[]) => void;
  reset: () => void;
}

export const usePreferenceStore = create<PreferenceState>((set) => ({
  step: 0,
  location: null,
  price: "",
  kostType: "putra",
  kostFacilities: [],
  roomFacilities: [],
  setStep: (step) => set({ step }),
  setLocation: (location) => set({ location }),
  setPrice: (val) => set({ price: val }),
  setKostType: (val) => set({ kostType: val }),
  setKostFacilities: (facility) => set({ kostFacilities: facility }),
  setRoomFacilities: (facility) => set({ roomFacilities: facility }),
  reset: () =>
    set({
      step: 0,
      location: null,
      price: "",
      kostType: "putra",
      kostFacilities: [],
      roomFacilities: [],
    }),
}));
