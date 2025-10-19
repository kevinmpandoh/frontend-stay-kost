"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackLinkProps {
  label?: string;
  fallbackUrl?: string; // kalau ga ada history, balik ke url ini
  size?: "sm" | "md" | "lg";
}

export default function BackLink({
  label = "Kembali",
  fallbackUrl = "/",
  size = "md",
}: BackLinkProps) {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackUrl);
    }
  };

  // mapping size ke style
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className={cn(
        "text-primary-600 mb-2 flex cursor-pointer items-center font-medium hover:underline",
        sizeClasses[size],
      )}
    >
      <ArrowLeft size={iconSizes[size]} className="mr-1" />
      {label}
    </button>
  );
}
