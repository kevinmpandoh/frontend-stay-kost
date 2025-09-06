// app/providers.tsx
"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";

const queryClient = new QueryClient({
  //   defaultOptions: {
  //     queries: {
  //       refetchOnWindowFocus: false,
  //     },
  //   },
});

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <Toaster richColors position={"top-center"} />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
}
