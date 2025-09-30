"use client";

import React from "react";

interface FilterBarProps {
  children: React.ReactNode;
}

export default function FilterBar({ children }: FilterBarProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-start">
      {children}
    </div>
  );
}
