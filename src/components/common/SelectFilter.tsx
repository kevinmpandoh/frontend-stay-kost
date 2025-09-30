"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronsUpDown, Check } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";

interface Option {
  key: string;
  label: string;
}

interface SelectFilterProps {
  paramKey: string;
  options: Option[];
  placeholder?: string;
  className?: string;
  buttonClassName?: string; // buat styling tombol trigger
}

const SelectFilter: React.FC<SelectFilterProps> = ({
  paramKey,
  options,
  placeholder = "Pilih opsi",
  className,
  buttonClassName,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = React.useState(false);

  const currentValue = searchParams.get(paramKey) || "all";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value || value === "all") {
      params.delete(paramKey);
    } else {
      params.set(paramKey, value);
    }

    router.push(`?${params.toString()}`);
    setOpen(false);
  };

  const currentLabel =
    currentValue === "all"
      ? placeholder
      : options.find((opt) => opt.key === currentValue)?.label || placeholder;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          size={"lg"}
          className={cn("w-[200px] justify-between", buttonClassName)}
        >
          {currentLabel}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className={cn("w-[280px] p-0", className)}>
        <Command>
          <CommandInput placeholder={`Cari ${placeholder.toLowerCase()}...`} />
          <CommandEmpty>Tidak ditemukan.</CommandEmpty>
          <CommandGroup>
            <CommandItem
              value="all"
              onSelect={() => handleChange("all")}
              className="cursor-pointer text-base"
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  currentValue === "all" ? "opacity-100" : "opacity-0",
                )}
              />
              {placeholder}
            </CommandItem>

            {options.map((opt) => (
              <CommandItem
                key={opt.key}
                value={opt.key}
                onSelect={() => handleChange(opt.key)}
                className="cursor-pointer text-base"
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    currentValue === opt.key ? "opacity-100" : "opacity-0",
                  )}
                />
                {opt.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectFilter;
