"use client";

import { useEffect, useRef } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { toast } from "sonner";

import { useUser } from "@/features/user/hooks/useUser";

import { useAuthStore } from "@/stores/auth.store";

export default function AuthCallbackPage() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const { userCurrent } = useUser();

  const { setUser } = useAuthStore();

  const isProcessing = useRef(false); // ⬅️ guard

  useEffect(() => {
    const fetchAndRedirect = async () => {
      if (isProcessing.current) return; // ⬅️ jangan jalan lagi

      isProcessing.current = true;

      try {
        // force refetch user dari backend

        const data = await userCurrent.refetch();

        const user = data.data;

        console.log(user, "USER DI USE EFFECRT");

        if (user) {
          setUser(user);

          toast.success("Login Google berhasil");

          if (user.role === "tenant") {
            router.replace("/");
          } else if (user.role === "owner") {
            router.replace("/dashboard/owner");
          } else {
            router.replace("/");
          }
        } else {
          router.replace("/login?error=unauthorized");
        }
      } catch (err) {
        console.error("Callback error", err);

        toast.error("Gagal mengambil data user");

        router.replace("/login?error=server_error");
      }
    };

    if (searchParams.get("login") === "google") {
      fetchAndRedirect();
    }
  }, [searchParams, router, setUser, userCurrent]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p>Sedang memproses login...</p>
    </div>
  );
}
