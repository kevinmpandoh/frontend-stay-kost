// store/kostFilterStore.ts
import { create } from "zustand";

type FilterKey = "sort" | "price" | "facilities" | "type" | "rules" | "rating";

interface KostFilterStore {
  openFilter: boolean;
  activeKey: FilterKey | null;
  openModal: (key: FilterKey) => void;
  closeModal: () => void;
}

export const useKostFilterStore = create<KostFilterStore>((set) => ({
  openFilter: false,
  activeKey: null,
  openModal: (key) => set({ openFilter: true, activeKey: key }),
  closeModal: () => set({ openFilter: false, activeKey: null }),
}));
