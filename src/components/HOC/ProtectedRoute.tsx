"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[]; // contoh: ["tenant", "admin"]
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const router = useRouter();
  const { user, isAuthenticated, isHydrated } = useAuthStore();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Tunggu sampai Zustand hydration selesai
    if (isHydrated) {
      // Jika belum login → redirect ke login
      if (!isAuthenticated || !user) {
        router.replace("/login");
        return;
      }

      // Jika login, tapi role tidak sesuai
      if (allowedRoles && !allowedRoles.includes(user.role)) {
        router.push("/unauthorized");
        return;
      }

      setIsLoading(false); // lolos semua pengecekan
    }
  }, [isHydrated, isAuthenticated, user, allowedRoles, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="border-t-primary-600 h-10 w-10 animate-spin rounded-full border-4 border-gray-300" />
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
