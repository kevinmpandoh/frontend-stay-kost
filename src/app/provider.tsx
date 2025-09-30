// app/providers.tsx
"use client";

import { ReactNode, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";

import { ConfirmProvider } from "@/hooks/useConfirmModal";
import LoginModal from "@/components/LoginModal";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <Suspense>
        <Toaster richColors position={"top-center"} />

        <QueryClientProvider client={queryClient}>
          <ConfirmProvider>{children}</ConfirmProvider>
          <LoginModal />
        </QueryClientProvider>
      </Suspense>
    </>
  );
}
