import { AppLogo } from "@/components/common/AppLogo";
import {
  FileChartColumn,
  House,
  LayoutDashboard,
  MessageSquare,
  Star,
  User,
} from "lucide-react";
import Image from "next/image";
import React from "react";

const SidebarOwner = () => {
  return (
    <>
      <aside className="hidden min-h-screen w-72 flex-col border-r border-gray-200 px-6 pt-10 md:flex">
        <div className="mb-10 flex justify-center">
          <AppLogo />
        </div>
        <nav className="flex flex-col space-y-3 text-lg font-medium">
          <a
            href="#"
            className="flex items-center space-x-2 rounded-md bg-indigo-200 px-4 py-2 text-indigo-700"
          >
            <LayoutDashboard size={18} />
            <span>Beranda</span>
          </a>
          <a
            href="#"
            className="flex cursor-default items-center space-x-2 rounded-md px-4 py-2 text-gray-400"
          >
            <House size={18} />
            <span>Manajemen Kost</span>
          </a>
          <a
            href="#"
            className="flex cursor-default items-center space-x-2 rounded-md px-4 py-2 text-gray-400"
          >
            <MessageSquare size={18} />
            <span>Pesan</span>
          </a>
          <a
            href="#"
            className="flex cursor-default items-center space-x-2 rounded-md px-4 py-2 text-gray-400"
          >
            <FileChartColumn size={18} />
            <span>Laporan Keuangan</span>
          </a>
          <a
            href="#"
            className="flex cursor-default items-center space-x-2 rounded-md px-4 py-2 text-gray-400"
          >
            <Star size={24} />
            <span>Rating & Ulasan</span>
          </a>
          <a
            href="#"
            className="flex cursor-default items-center space-x-2 rounded-md px-4 py-2 text-gray-400"
          >
            <User size={20} />
            <span>Akun Saya</span>
          </a>
        </nav>
      </aside>
    </>
  );
};

export default SidebarOwner;
