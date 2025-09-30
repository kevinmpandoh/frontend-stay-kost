// components/layout/Topbar.tsx
"use client";

import { Bell, MessageCircle, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Topbar({ user }: any) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-between items-center bg-white shadow-sm">
      <div className="max-w-7xl mx-auto md:w-full px-4 py-6 flex items-center justify-between">
        <div className="flex">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-orange-600">
            Kost<span className="text-gray-800">ku</span>
          </Link>

          {/* Search bar for desktop & tablet */}
          <div className="hidden sm:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Cari kost..."
                className="w-full border rounded-full px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={16}
              />
            </div>
          </div>
        </div>

        {/* Right actions */}
        <div className="hidden sm:flex items-center gap-4">
          {user ? (
            <>
              <div className="flex space-x-4 mr-4">
                <MessageCircle
                  size={24}
                  className="text-gray-700 cursor-pointer"
                />
                <Bell size={24} className="text-gray-700 cursor-pointer" />
              </div>
              <div className="relative">
                <Image
                  src="/profile-default.png"
                  alt="Avatar"
                  width={40}
                  height={40}
                  className="rounded-full cursor-pointer"
                  onClick={() => setShowDropdown(!showDropdown)}
                />
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-60 divide-y divide-gray-100 bg-white border rounded-lg shadow-md z-50">
                    <div>
                      <Link
                        href="/profile"
                        className="block px-6 py-3 text-md font-semibold text-gray-700 hover:bg-gray-100"
                      >
                        Profil
                      </Link>
                      <Link
                        href="/kost-saya"
                        className="block px-6 py-3 text-md font-semibold text-gray-700 hover:bg-gray-100"
                      >
                        Kost Saya
                      </Link>
                    </div>
                    <Link
                      href="/logout"
                      className="block px-6 py-3 text-md font-semibold text-red-600 hover:bg-red-50"
                    >
                      Keluar
                    </Link>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Masuk
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="sm"
                  className="bg-orange-600 text-white hover:bg-orange-700"
                >
                  Daftar
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="sm:hidden px-4 py-2 w-full ">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Cari kost..."
            className="w-full border rounded-full px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
        </div>
      </div>
    </div>
  );
}
