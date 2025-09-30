import { create } from "zustand";

// Tipe-tipe data form
type InformasiKost = {
  name: string;
  type: any;
  description: string;
  rules: string[]; // id peraturan
};

type AlamatKost = {
  provinsi: string;
  kabupaten_kota: string;
  kecamatan: string;
  desa: string;
  detail_alamat: string;
  koordinat: { lat: number; lng: number };
};

type KostType = {
  nama_tipe: string;
  ukuran_kamar: string;
  jumlah_kamar: number;
  jumlah_terisi: number; // id peraturan
};

// State utama untuk semua step
interface CreateKostState {
  kostId: string | null;
  kostTypeId: string | null;
  currentStep: number;
  progressStep: number;
  isLoadedFromBackend: boolean;

  informasiKost: Partial<InformasiKost>;
  alamatKost: Partial<AlamatKost>;
  facilitiesKost: string[];
  facilitiesKostType: string[];

  kostType: Partial<KostType>;
  hargaPerBulan: number;

  // setters data form
  setInformasiKost: (data: Partial<InformasiKost>) => void;
  setAlamatKost: (data: Partial<AlamatKost>) => void;
  setFacilitiesKost: (data: string[]) => void;
  setFacilitiesKostType: (data: string[]) => void;
  setHargaPerBulan: (harga: number) => void;

  setKostType: (data: Partial<KostType>) => void;

  // setters umum
  setKostId: (id: string) => void;
  setKostTypeId: (id: string) => void;
  setCurrentStep: (step: number) => void;
  setProgressStep: (step: number) => void;
  setIsLoadedFromBackend: (val: boolean) => void;

  // handler navigasi step
  onNext?: () => void;
  setOnNext: (fn: () => void) => void;
  triggerNext: () => void;

  // reset semua
  reset: () => void;
}

export const useCreateKostStore = create<CreateKostState>((set, get) => ({
  kostId: null,
  kostTypeId: null,
  currentStep: 0,
  progressStep: 1,
  isLoadedFromBackend: false,

  informasiKost: {},
  alamatKost: {},
  facilitiesKost: [],
  facilitiesKostType: [],
  hargaPerBulan: 0,

  kostType: {},

  setInformasiKost: (data) =>
    set((state) => ({
      informasiKost: { ...state.informasiKost, ...data },
    })),

  setAlamatKost: (data) =>
    set((state) => ({
      alamatKost: { ...state.alamatKost, ...data },
    })),

  setFacilitiesKost: (data) => set({ facilitiesKost: data }),
  setFacilitiesKostType: (data) => set({ facilitiesKostType: data }),

  setKostType: (data) =>
    set((state) => ({
      kostType: {
        ...state.kostType,
        ...data,
      },
    })),

  setKostId: (id) => set({ kostId: id }),
  setKostTypeId: (id) => set({ kostTypeId: id }),
  setCurrentStep: (step) => set({ currentStep: step }),
  setProgressStep: (step) => set({ progressStep: step }),

  // setHargaPerBulan: (harga) =>
  //   set((state) => ({
  //     kostType: {
  //       ...state.kostType,
  //       harga_per_bulan: harga,
  //     },
  //   })),
  setHargaPerBulan: (harga) =>
    set({
      hargaPerBulan: harga,
    }),

  setIsLoadedFromBackend: (val) => set({ isLoadedFromBackend: val }),

  setOnNext: (fn) => set({ onNext: fn }),
  triggerNext: () => {
    const fn = get().onNext;
    if (fn) fn();
  },

  reset: () =>
    set({
      kostId: null,
      currentStep: 0,
      progressStep: 0,
      isLoadedFromBackend: false,
      informasiKost: {},
      alamatKost: {},
      facilitiesKost: [],
      facilitiesKostType: [],
      kostType: {},
      onNext: undefined,
    }),
}));
