import { create } from "zustand";

interface EditKostModalStore {
  isSubmitSuccess: boolean;
  setIsSubmitSuccess: (value: boolean) => void;
}

export const useEditKostModalStore = create<EditKostModalStore>((set) => ({
  isSubmitSuccess: false,
  setIsSubmitSuccess: (value) => set({ isSubmitSuccess: value }),
}));
