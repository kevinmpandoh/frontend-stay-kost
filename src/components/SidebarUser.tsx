"use client";
import {
  BookHeart,
  CircleUserRound,
  ClipboardList,
  CreditCard,
  DoorOpen,
  History,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useAuthStore } from "@/stores/auth.store";

const menuItems = [
  {
    href: "profile",
    label: "Akun Saya",
    icon: CircleUserRound,
    match: "profile",
  },
  {
    href: "kost-saya",
    label: "Kost Aktif",
    icon: DoorOpen,
    match: "kost-saya",
  },
  {
    href: "pengajuan-sewa",
    label: "Pengajuan Sewa",
    icon: ClipboardList,
    match: "pengajuan-sewa",
  },
  {
    href: "riwayat-transaksi",
    label: "Riwayat Transaksi",
    icon: CreditCard,
    match: "riwayat-transaksi",
  },
  {
    href: "riwayat-kost",
    label: "Riwayat Kost",
    icon: History,
    match: "riwayat-kost",
  },
  {
    href: "wishlist",
    label: "Wishlist",
    icon: BookHeart,
    match: "wishlist",
  },
];

const SidebarUser = () => {
  const pathname = usePathname();
  const { user } = useAuthStore();

  return (
    <aside className="top-[125px] flex h-full flex-col gap-6 lg:sticky lg:w-2/5">
      <div
        className="flex items-center gap-4 rounded-lg border bg-white p-6 shadow-md"
        style={{ boxShadow: "0 4px 8px rgb(0 0 0 / 0.05)" }}
      >
        <Image
          alt="Profile picture of Kevin Pandoh, young person with short curly hair and pink background"
          className="h-14 w-14 rounded-full object-cover"
          height="56"
          src={user?.photo ?? "/profile-default.png"}
          width="56"
        />
        <div>
          <h3 className="text-lg leading-5 font-semibold text-gray-800">
            {user?.name}
          </h3>
        </div>
      </div>
      <nav
        aria-label="Sidebar navigation"
        className="space-y-2 rounded-lg border bg-white px-4 py-6 text-sm font-semibold text-[#475569]"
        style={{ boxShadow: "0 4px 8px rgb(0 0 0 / 0.05)" }}
      >
        {menuItems.map(({ href, label, icon: Icon, match }) => {
          const isActive = pathname.includes(match);
          return (
            <Link
              key={href}
              href={`/user/${href}`}
              className={`flex items-center gap-2 rounded-md px-4 py-4 text-lg ${
                isActive
                  ? "bg-primary/20 hover:bg-primary/30 text-primary-600"
                  : "hover:bg-gray-100 hover:text-[#1E293B]"
              }`}
            >
              <Icon
                size={20}
                className={isActive ? "text-primary-600" : "text-[#64748B]"}
              />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default SidebarUser;
