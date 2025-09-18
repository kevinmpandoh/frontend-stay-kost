// stores/usePreferenceModalStore.ts
import { create } from "zustand";

type PreferenceSection =
  | "lokasi"
  | "jenis_kost"
  | "harga"
  | "fasilitas"
  | "keamanan"
  | null;

type State = {
  isOpen: boolean;
  section: PreferenceSection;
  openModal: (section: PreferenceSection) => void;
  closeModal: () => void;
};

export const usePreferenceModalStore = create<State>((set) => ({
  isOpen: false,
  section: null,
  openModal: (section) => set({ isOpen: true, section }),
  closeModal: () => set({ isOpen: false, section: null }),
}));
