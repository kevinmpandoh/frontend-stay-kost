"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

type SimpleCalendarProps = {
  selectedDate?: Date;
  onSelect: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
};

function normalizeDate(date?: Date) {
  if (!date) return undefined;
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export default function SimpleCalendar({
  selectedDate,
  onSelect,
  minDate,
  maxDate,
}: SimpleCalendarProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const normalizedMinDate = normalizeDate(minDate);
  const normalizedMaxDate = normalizeDate(maxDate);

  const [currentMonth, setCurrentMonth] = useState(
    selectedDate ? selectedDate.getMonth() : today.getMonth(),
  );
  const [currentYear, setCurrentYear] = useState(
    selectedDate ? selectedDate.getFullYear() : today.getFullYear(),
  );
  const [mode, setMode] = useState<"day" | "month" | "year">("day");

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const isPastDate = (day: number) => {
    if (!normalizedMinDate) return false;
    const date = new Date(currentYear, currentMonth, day);
    return date < normalizedMinDate;
  };

  const isAfterMaxDate = (day: number) => {
    if (!normalizedMaxDate) return false;
    const date = new Date(currentYear, currentMonth, day);
    return date > normalizedMaxDate;
  };

  const isToday = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    return date.toDateString() === today.toDateString();
  };

  const handlePrev = () => {
    if (mode === "day") {
      const prev = new Date(currentYear, currentMonth - 1);
      setCurrentMonth(prev.getMonth());
      setCurrentYear(prev.getFullYear());
    } else if (mode === "month") {
      setCurrentYear((y) => y - 1);
    } else if (mode === "year") {
      setCurrentYear((y) => y - 12);
    }
  };

  const handleNext = () => {
    if (mode === "day") {
      const next = new Date(currentYear, currentMonth + 1);
      setCurrentMonth(next.getMonth());
      setCurrentYear(next.getFullYear());
    } else if (mode === "month") {
      setCurrentYear((y) => y + 1);
    } else if (mode === "year") {
      setCurrentYear((y) => y + 12);
    }
  };

  const renderDays = () => {
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isDisabled = isPastDate(day) || isAfterMaxDate(day);
      const isSelected = selectedDate?.toDateString() === date.toDateString();
      const todayClass = isToday(day) ? "border-2 border-primary" : "";

      days.push(
        <button
          key={day}
          type="button"
          onClick={() => !isDisabled && onSelect(date)}
          disabled={isDisabled}
          className={`text-md rounded p-2 ${todayClass} ${
            isDisabled
              ? "cursor-not-allowed text-gray-400"
              : isSelected
                ? "bg-primary text-white"
                : "hover:bg-primary-200"
          }`}
        >
          {day}
        </button>,
      );
    }

    return days;
  };

  const renderMonths = () => {
    return (
      <div className="grid grid-cols-3 gap-2 text-center">
        {Array.from({ length: 12 }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              setCurrentMonth(i);
              setMode("day");
            }}
            className={`rounded p-2 ${
              i === currentMonth ? "bg-primary text-white" : "hover:bg-gray-100"
            }`}
          >
            {new Date(0, i).toLocaleString("id-ID", { month: "short" })}
          </button>
        ))}
      </div>
    );
  };

  const renderYears = () => {
    const startYear = Math.floor(currentYear / 12) * 12;
    return (
      <div className="grid grid-cols-3 gap-2 text-center">
        {Array.from({ length: 12 }).map((_, i) => {
          const year = startYear + i;
          return (
            <button
              key={year}
              type="button"
              onClick={() => {
                setCurrentYear(year);
                setMode("month");
              }}
              className={`rounded p-2 ${
                year === currentYear
                  ? "bg-primary text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {year}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-72 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handlePrev}
          className="rounded px-2 py-1 hover:bg-gray-100"
        >
          <ChevronLeft />
        </button>

        <div
          className="cursor-pointer font-medium select-none"
          onClick={() =>
            setMode(
              mode === "day" ? "month" : mode === "month" ? "year" : "day",
            )
          }
        >
          {mode === "day" &&
            new Date(currentYear, currentMonth).toLocaleString("id-ID", {
              month: "long",
              year: "numeric",
            })}
          {mode === "month" && currentYear}
          {mode === "year" &&
            `${Math.floor(currentYear / 12) * 12} - ${Math.floor(currentYear / 12) * 12 + 11}`}
        </div>

        <button
          type="button"
          onClick={handleNext}
          className="rounded px-2 py-1 hover:bg-gray-100"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Body */}
      {mode === "day" && (
        <div className="grid grid-cols-7 gap-2 text-center">
          {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((d) => (
            <div key={d} className="text-sm font-bold">
              {d}
            </div>
          ))}
          {renderDays()}
        </div>
      )}
      {mode === "month" && renderMonths()}
      {mode === "year" && renderYears()}
    </div>
  );
}
