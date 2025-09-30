"use client";
import React from "react";
import {
  CalendarPlus2,
  CircleUserRound,
  CreditCard,
  DoorOpen,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const menuItems = [
  {
    href: "profile",
    label: "Akun Saya",
    icon: CircleUserRound,
    match: "profile",
  },
  {
    href: "change-password",
    label: "Ganti Password",
    icon: DoorOpen,
    match: "change-password",
  },
  {
    href: "payment",
    label: "Pembayaran",
    icon: CreditCard,
    match: "payment",
  },
  {
    href: "subscription",
    label: "Langganan",
    icon: CalendarPlus2,
    match: "subscription",
  },
];

export default function PengaturanOwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
      <div className="flex flex-col gap-6 lg:flex-row">
        <aside className="flex h-full flex-col gap-6 lg:w-1/3">
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
                  href={`${href}`}
                  className={`flex items-center gap-2 rounded-md px-4 py-4 text-lg ${
                    isActive
                      ? "bg-primary/20 text-primary-600 hover:bg-primary/30"
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

        <section className="min-h-[556px] w-full rounded-lg border border-gray-200 bg-white px-10 py-8">
          {children}
        </section>
      </div>
    </>
  );
}
