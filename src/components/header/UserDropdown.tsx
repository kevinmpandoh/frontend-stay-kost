"use client";
import Image from "next/image";
import React from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { KeyRound, LogOut, Settings, User } from "lucide-react";
import { useAuthStore } from "@/stores/auth.store";
import { useAuth } from "@/hooks/useAuth";

export default function UserDropdown({
  isOpen,
  onToggle,
  onClose,
}: {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const { user } = useAuthStore();
  const { logout } = useAuth();

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={`dropdown-toggle flex items-center gap-2 rounded-full border p-1 pr-4 text-gray-700 dark:text-gray-400 ${
          isOpen ? "bg-primary-25" : ""
        }`}
      >
        <div className="h-10 w-10 overflow-hidden rounded-full">
          <Image
            width={44}
            height={44}
            src={user?.photo || "/profile-default.png"}
            alt="User"
          />
        </div>

        <svg
          className={`stroke-gray-500 transition-transform duration-200 dark:stroke-gray-400 ${
            isOpen ? "rotate-180" : ""
          }`}
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={onClose}
        className="shadow-theme-lg dark:bg-gray-dark absolute right-0 mt-[17px] flex w-[320px] flex-col rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800"
      >
        <div className="flex items-center gap-2">
          <Image
            src={user?.photo || "/profile-default.png"}
            alt="Profile Image"
            className="h-10 w-10 rounded-full object-contain"
            width={40}
            height={40}
          />
          <div>
            <span className="block text-base font-semibold text-gray-700 dark:text-gray-400">
              {user?.name}
            </span>
            <span className="mt-0.5 block text-sm text-gray-500 dark:text-gray-400">
              {user?.email}
            </span>
          </div>
        </div>

        <hr className="my-5" />

        <ul className="flex flex-col gap-1 border-b border-gray-200 pb-3 dark:border-gray-800">
          <li>
            <DropdownItem
              onItemClick={onClose}
              tag="a"
              href={`/dashboard/${user?.role}/pengaturan/profile`}
              className="group text-theme-sm flex items-center gap-3 rounded-lg px-3 py-3 font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              <User
                className="text-primary dark:group-hover:fill-gray-300"
                size={24}
              />
              <span className="text-base font-medium">Akun Saya</span>
            </DropdownItem>
          </li>
          <li>
            <DropdownItem
              onItemClick={onClose}
              tag="a"
              href={`/dashboard/${user?.role}/pengaturan/change-password`}
              className="group text-theme-sm flex items-center gap-3 rounded-lg px-3 py-3 font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              <KeyRound
                className="text-primary dark:group-hover:fill-gray-300"
                size={24}
              />
              <span className="text-base font-medium">Ganti Password</span>
            </DropdownItem>
          </li>

          {user?.role === "owner" && (
            <li>
              <DropdownItem
                onItemClick={onClose}
                tag="a"
                href={`/dashboard/${user?.role}/pengaturan/change-password`}
                className="group text-theme-sm flex items-center gap-3 rounded-lg px-3 py-3 font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                <KeyRound
                  className="text-primary dark:group-hover:fill-gray-300"
                  size={24}
                />
                <span className="text-base font-medium">Pembayaran</span>
              </DropdownItem>
            </li>
          )}
        </ul>
        <button
          onClick={() => logout.mutate()}
          className="font-semibolld group text-theme-md mt-3 flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
        >
          <LogOut
            className="text-primary dark:group-hover:fill-gray-300"
            size={24}
          />
          Log Out
        </button>
      </Dropdown>
    </div>
  );
}
