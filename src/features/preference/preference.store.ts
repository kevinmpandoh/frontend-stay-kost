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
  price: {
    min: string;
    max: string;
  };
  kostType: "putra" | "putri" | "campur"; // bisa lebih dari satu
  kostFacilities: string[];
  roomFacilities: string[];
  rules: string[];
  setStep: (step: number) => void;
  setLocation: (location: LocationData) => void;
  setPrice: (val: { min?: string; max?: string }) => void;
  setKostType: (val: "putra" | "putri" | "campur") => void;
  setKostFacilities: (facility: string[]) => void;
  setRoomFacilities: (facility: string[]) => void;
  setRules: (rules: string[]) => void;
  reset: () => void;
}

export const usePreferenceStore = create<PreferenceState>((set) => ({
  step: 0,
  location: null,
  price: { min: "", max: "" },
  kostType: "putra",
  kostFacilities: [],
  roomFacilities: [],
  rules: [],
  setStep: (step) => set({ step }),
  setLocation: (location) => set({ location }),
  setPrice: (val) =>
    set((state) => ({
      price: {
        ...state.price,
        ...val,
      },
    })),
  setKostType: (val) => set({ kostType: val }),
  setKostFacilities: (facility) => set({ kostFacilities: facility }),
  setRoomFacilities: (facility) => set({ roomFacilities: facility }),
  setRules: (rules) => set({ rules: rules }),
  reset: () =>
    set({
      step: 0,
      location: null,
      price: { min: "", max: "" },
      kostType: "putra",
      kostFacilities: [],
      roomFacilities: [],
      rules: [],
    }),
}));
