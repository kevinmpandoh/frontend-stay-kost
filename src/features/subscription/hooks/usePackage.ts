// hooks/usePackage.ts
"use client";

import { packageService } from "@/services/package.service";
import { useQuery } from "@tanstack/react-query";

export const usePackages = () => {
  return useQuery({
    queryKey: ["packages"],
    queryFn: () => packageService.getAllPackageAvailable(),
  });
};
