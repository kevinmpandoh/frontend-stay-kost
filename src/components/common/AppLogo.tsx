import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoSize = "sm" | "md" | "lg";
type LogoMode = "full" | "icon";

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: LogoSize;
  mode?: LogoMode;
  variant?: "light" | "dark"; // untuk menyesuaikan logo versi terang/gelap
}

const sizeMap: Record<LogoSize, number> = {
  sm: 24,
  md: 32,
  lg: 40,
};

export function AppLogo({
  size = "md",
  mode = "full",
  variant = "dark",
  className,
  ...props
}: LogoProps) {
  const logoSrc = variant === "dark" ? "/logo/logo.svg" : "/logo/logo.svg";
  const textSrc =
    variant === "dark" ? "/logo/logo-dark.svg" : "/logo/logo-light.svg";

  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      {/* Logo Icon */}

      {/* Logo Text */}
      {mode === "full" ? (
        <Image
          src={textSrc}
          alt="App Logo Text"
          height={sizeMap[size]}
          width={sizeMap[size] * 4} // perkiraan rasio logo text
          priority
        />
      ) : (
        <Image
          src={logoSrc}
          alt="App Logo"
          width={sizeMap[size]}
          height={sizeMap[size]}
          priority
        />
      )}
    </div>
  );
}
