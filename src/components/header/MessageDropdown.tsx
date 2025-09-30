"use client";

import React from "react";
// import { Dropdown } from "../ui/dropdown/Dropdown";
import { MessageSquare } from "lucide-react";

export default function MessageDropdown({
  // isOpen,
  onToggle,
}: // onClose,
{
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  return (
    <div className="relative">
      <button
        className="dropdown-toggle bg-primary-50 relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
        onClick={onToggle}
      >
        <MessageSquare className="text-primary-500" size={20} />
      </button>
    </div>
  );
}
