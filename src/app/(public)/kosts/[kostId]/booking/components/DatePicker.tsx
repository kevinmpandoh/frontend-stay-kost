"use client";

import { useRef, useState, useEffect } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Calendar } from "lucide-react";
import SimpleCalendar from "@/components/ui/calendar2";
import { Input } from "@/components/ui/input";

interface DatePickerProps {
  value?: Date;
  onChange: (date: Date) => void;
  label?: string;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
}

export default function DatePicker({
  value,
  onChange,
  placeholder = "Pilih tanggal",
  minDate,
  maxDate,
}: DatePickerProps) {
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef<HTMLDivElement | null>(null);

  // close kalau klik di luar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    }
    if (showCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendar]);

  return (
    <div className="relative w-full">
      <div className="relative">
        <Input
          readOnly
          type="text"
          size="lg"
          value={value ? format(value, "dd MMMM yyyy", { locale: id }) : ""}
          onClick={() => setShowCalendar((prev) => !prev)}
          className="w-full"
          placeholder={placeholder}
        />
        <Calendar
          size={18}
          className="pointer-events-none absolute top-3 right-3 text-gray-500"
        />
      </div>

      {showCalendar && (
        <div
          ref={calendarRef}
          className="absolute z-20 mt-2 rounded-xl border bg-white p-4 shadow-lg"
        >
          <SimpleCalendar
            selectedDate={value}
            onSelect={(date) => {
              onChange(date);
              setShowCalendar(false);
            }}
            minDate={minDate}
            maxDate={maxDate}
          />
        </div>
      )}
    </div>
  );
}
