import * as React from "react";
import { cn } from "@/lib/utils";
type InputSize = "sm" | "md" | "lg";
interface InputProps extends Omit<React.ComponentProps<"input">, "size"> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onLeftIconClick?: () => void;
  onRightIconClick?: () => void;
  error?: string;
  size?: InputSize;
}
const sizeClasses: Record<InputSize, string> = {
  sm: "h-8 text-sm px-2",
  md: "h-10 text-base px-3",
  lg: "h-12 text-lg px-4",
};
function Input({
  size = "md",
  className,
  type,
  leftIcon,
  rightIcon,
  onLeftIconClick,
  onRightIconClick,
  error,
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      <div className="relative flex items-center">
        {leftIcon && (
          <button
            type="button"
            onClick={onLeftIconClick}
            className={cn(
              "text-muted-foreground hover:text-foreground absolute left-3 focus:outline-none",
              size === "sm" && "left-2",
              size === "lg" && "left-4",
            )}
          >
            {leftIcon}
          </button>
        )}

        <input
          type={type}
          data-slot="input"
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-12 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[2px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            sizeClasses[size],
            leftIcon ? "pl-10" : "",
            rightIcon ? "pr-10" : "",
            error
              ? "border-destructive focus-visible:ring-destructive/40"
              : "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
            className,
          )}
          {...props}
        />

        {rightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className={cn(
              "text-muted-foreground hover:text-foreground absolute right-3 focus:outline-none",

              size === "sm" && "right-2",
              size === "lg" && "right-4",
            )}
          >
            {rightIcon}
          </button>
        )}
      </div>
      {error && <p className="text-destructive mt-1 text-sm">{error}</p>}
    </div>
  );
}

export { Input };
