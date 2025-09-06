import { create } from "zustand";
import { persist } from "zustand/middleware";

type RegisterState = {
  justRegistered: boolean;
  email?: string;
  phone?: string;
  hasHydrated: boolean;
  setHasHydrated: (val: boolean) => void;
  setRegisterInfo: (data: { email?: string; phone?: string }) => void;
  clearRegisterInfo: () => void;
};

export const useRegisterStore = create<RegisterState>()(
  persist(
    (set) => ({
      justRegistered: false,
      email: undefined,
      phone: undefined,
      hasHydrated: false,
      setHasHydrated: (val) => set({ hasHydrated: val }),
      setRegisterInfo: (data) =>
        set({
          justRegistered: true,
          email: data.email,
          phone: data.phone,
        }),
      clearRegisterInfo: () =>
        set({
          justRegistered: false,
          email: undefined,
          phone: undefined,
        }),
    }),
    {
      name: "register-storage", // key di localStorage
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
