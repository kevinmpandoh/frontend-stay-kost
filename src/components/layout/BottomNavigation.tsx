"use client";

import ChatPopup from "@/features/chat/components/ChatPopup";
import { useAuthStore } from "@/stores/auth.store";
import { useChatPopupStore } from "@/stores/chatPopup.store";
import {
  Home,
  Search,
  Building2,
  MessageSquare,
  User,
  LogIn,
  PlusSquare,
  X,
  LayoutDashboard,
  Heart,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function BottomNav() {
  const { user, isAuthenticated } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();
  const [showMessageModal, setShowMessageModal] = useState(false);

  const { togglePopup, isOpen } = useChatPopupStore();

  // 🧭 Menu berdasarkan role
  const getMenuItems = () => {
    if (!isAuthenticated)
      return [
        { href: "/", icon: Home, label: "Home" },
        { href: "/kosts", icon: Search, label: "Cari" },
        { href: "/login", icon: LogIn, label: "Masuk" },
      ];

    if (user?.role === "owner")
      return [
        { href: "/", icon: Home, label: "Home" },
        { href: "/kosts", icon: Search, label: "Cari" },

        { href: "/dashboard/owner", icon: LayoutDashboard, label: "Dashboard" },
      ];

    // default tenant
    return [
      { href: "/", icon: Home, label: "Home" },
      { href: "/kosts", icon: Search, label: "Cari" },
      { href: "/user/kost-saya", icon: Building2, label: "Kost Saya" },
      { href: "/user/wishlist", icon: Heart, label: "Favorit" },

      { href: "/user/profile", icon: User, label: "Profil" },
    ];
  };

  const menuItems = getMenuItems();

  // 🔘 Klik menu
  const handleClick = (
    href: string,
    requiresAuth?: boolean,
    isChatPopup?: boolean,
  ) => {
    if (requiresAuth && !isAuthenticated) {
      router.push("/login");
      return;
    }
    if (isChatPopup) {
      togglePopup();
      return;
    }
    router.push(href);
  };

  return (
    <>
      {/* BOTTOM NAVIGATION */}
      <nav className="fixed right-0 bottom-0 left-0 z-50 border-t border-gray-200 bg-white shadow-md sm:hidden">
        <ul className="mx-auto flex max-w-md items-center justify-around py-2">
          {menuItems.map(({ href, icon: Icon, label }) => {
            const active = pathname === href;
            return (
              <li key={href} className="flex-1 text-center">
                <button
                  onClick={() => handleClick(href)}
                  className="flex w-full flex-col items-center space-y-1 transition-all duration-200"
                >
                  <Icon
                    size={22}
                    className={`${active ? "text-[#00a991]" : "text-gray-500"}`}
                  />
                  <span
                    className={`text-xs ${
                      active ? "text-[#00a991]" : "text-gray-500"
                    }`}
                  >
                    {label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {isOpen && <ChatPopup />}
    </>
  );
}
