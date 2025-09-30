"use client";

import {
  Home,
  Heart,
  Building2,
  MessageCircle,
  User,
  LogIn,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// const isLoggedIn = true; // ganti nanti dari context

export default function BottomNavigation({ user }: any) {
  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/favorit", label: "Favorit", icon: Heart },
    { href: "/kost-saya", label: "Kost Saya", icon: Building2 },
    { href: "/pesan", label: "Pesan", icon: MessageCircle },
    {
      href: user ? "/profile" : "/login",
      label: "Profil",
      icon: user ? User : LogIn,
    },
  ];
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 z-40 flex w-full items-center justify-around border-t bg-white py-2 shadow sm:hidden">
      {navItems.map(({ href, label, icon: Icon }) => (
        <Link
          key={label}
          href={href}
          className="hover:text-primary-600 flex flex-col items-center text-xs text-gray-700"
        >
          <Icon
            size={20}
            className={clsx(pathname === href && "text-primary-600")}
          />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}
