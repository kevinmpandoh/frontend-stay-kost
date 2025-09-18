import { create } from "zustand";

interface ModalState {
  upgradeOpen: boolean;
  openUpgrade: () => void;
  closeUpgrade: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  upgradeOpen: false,
  openUpgrade: () => set({ upgradeOpen: true }),
  closeUpgrade: () => set({ upgradeOpen: false }),
}));
