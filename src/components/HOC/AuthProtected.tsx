"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { usePreference } from "@/features/preference/hooks/usePreference";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[]; // contoh: ["tenant", "admin"]
}

const AuthProtected: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const { user, isAuthenticated, isHydrated } = useAuthStore();
  const { preferences } = usePreference();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Tunggu sampai Zustand hydration selesai
    if (isHydrated) {
      // Jika belum login → redirect ke login
      if (isAuthenticated || user) {
        console.log(preferences.data, preferences.isLoading, "Preferenfes");
        if (user?.role === "admin") {
          router.push("/dashboard/admin");
        } else if (user?.role === "tenant") {
          console.log("MASUK TENANT");
          console.log(preferences?.data, "PREFERENES DATA");
          console.log(preferences?.isLoading, "PREFERENES LOADING");

          if (!preferences?.data && !preferences?.isLoading) {
            router.push("/preferences");
          } else {
            router.push("/");
          }
        } else if (user?.role === "owner") {
          router.push("/dashboard/owner");
        } else {
          router.push("/");
        }
        return;
      }

      setIsLoading(false); // lolos semua pengecekan
    }
  }, [
    isHydrated,
    isAuthenticated,
    user,
    router,
    preferences,
    preferences.isLoading,
    preferences.data,
  ]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="border-t-primary-600 h-10 w-10 animate-spin rounded-full border-4 border-gray-300" />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthProtected;
