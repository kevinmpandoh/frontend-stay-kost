// stores/auth.store.ts

import { User } from "@/features/user/user.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  setUser: (user: User | null) => void;
  login: (data: { user: User }) => void;
  logout: () => void;
  setHydrated: (value: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isHydrated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      login: (data: { user: User }) => {
        set({
          user: data.user,
          isAuthenticated: true,
        });
      },
      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          isHydrated: false,
        }),

      updateUser: (partialUser: Partial<User>) => {
        const currentUser = get().user;
        if (!currentUser) return;
        set({
          user: {
            ...currentUser,
            ...partialUser,
            id: partialUser.id ?? currentUser.id,
            name: partialUser.name ?? currentUser.name,
            email: partialUser.email ?? currentUser.email,
            phone: partialUser.phone ?? currentUser.phone,
            photo: partialUser.photo ?? currentUser.photo,
            isVerified: partialUser.isVerified ?? currentUser.isVerified,
            role: partialUser.role ?? currentUser.role,
          },
        });
      },
      setHydrated: (value) => set({ isHydrated: value }),
    }),
    {
      name: "auth-store", // nama localStorage key
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true); // ✅ set true begitu selesai hydrate
      },
    },
  ),
);
