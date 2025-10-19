"use client";
import { useEffect, useState } from "react";
import {
  Bell,
  BookHeart,
  Building2,
  ClipboardList,
  DoorOpen,
  Heart,
  Home,
  LogIn,
  LogOut,
  MessageCircle,
  MessageSquare,
  Search,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { useChatPopupStore } from "@/stores/chatPopup.store";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/stores/auth.store";
import ChatPopup from "@/features/chat/components/ChatPopup";
import { AppLogo } from "../common/AppLogo";

// 🔔 Import NotificationDropdown
import NotificationDropdown from "../header/NotificationDropdown";
import { useLoginModal } from "@/stores/loginModal.store";
import BottomNav from "./BottomNavigation";

const Navbar = () => {
  const { logout } = useAuth();
  const pathname = usePathname();
  const { open } = useLoginModal();

  const [showSearch, setShowSearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<
    "notification" | "user" | null
  >(null);
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  const { togglePopup, isOpen } = useChatPopupStore();
  const { user, isHydrated } = useAuthStore();

  const closeDropdown = () => setShowDropdown(false);

  // untuk toggle dropdown notif/user
  const toggleDropdown = (dropdown: "notification" | "user") => {
    setOpenDropdown((prev) => (prev === dropdown ? null : dropdown));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    router.push(`/kosts?search=${encodeURIComponent(keyword)}`);
    setKeyword(""); // reset setelah search
  };

  useEffect(() => {
    if (pathname === "/") {
      // di homepage: search bar muncul setelah scroll
      const handleScroll = () => {
        if (window.scrollY > 100) {
          setShowSearch(true);
        } else {
          setShowSearch(false);
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      // di halaman lain langsung muncul
      setShowSearch(true);
    }
  }, [pathname]);

  return (
    <>
      <div className="sticky top-0 left-0 z-50 flex w-full items-center justify-between bg-white shadow-sm">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-6">
          <div className="flex">
            {/* Logo */}
            <Link href="/" className="text-primary text-xl font-bold">
              <AppLogo size={"sm"} />
            </Link>

            {/* Search bar for desktop & tablet */}
            <div className="mx-4 hidden max-w-lg flex-1 sm:flex">
              <form onSubmit={handleSearch} className="relative w-full">
                {showSearch && (
                  <>
                    <AnimatePresence>
                      <motion.input
                        type="text"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="Cari kost..."
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className="focus:ring-primary-600 w-full rounded-full border px-4 py-3 pl-10 text-sm focus:ring-2 focus:outline-none"
                      />
                    </AnimatePresence>
                    <Search
                      className="absolute top-3.5 left-3 text-gray-400"
                      size={16}
                    />
                  </>
                )}
              </form>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {!isHydrated ? (
              <div className="h-10 w-20 animate-pulse rounded-md bg-gray-200"></div>
            ) : user && user.role === "tenant" ? (
              <div className="flex items-center gap-4">
                {/* Chat Button */}
                <button
                  className="dropdown-toggle bg-primary-50 relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                  onClick={() => togglePopup()}
                >
                  <MessageSquare className="text-primary-500" size={20} />
                </button>

                {/* 🔔 Notification Dropdown */}
                <NotificationDropdown
                  isOpen={openDropdown === "notification"}
                  onToggle={() => toggleDropdown("notification")}
                  onClose={() => setOpenDropdown(null)}
                />

                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className={`dropdown-toggle flex items-center gap-2 rounded-full border p-1 pr-4 text-gray-700 dark:text-gray-400 ${
                      showDropdown ? "bg-primary-25" : ""
                    }`}
                  >
                    <div className="h-10 w-10 overflow-hidden rounded-full">
                      <Image
                        width={44}
                        height={44}
                        src={user.photo || "/profile-default.png"}
                        alt="User"
                      />
                    </div>

                    <svg
                      className={`stroke-gray-500 transition-transform duration-200 dark:stroke-gray-400 ${
                        showDropdown ? "rotate-180" : ""
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
                  {/* Dropdown user lama kamu */}
                  <Dropdown
                    isOpen={showDropdown}
                    onClose={() => closeDropdown}
                    className="shadow-theme-lg dark:bg-gray-dark absolute right-0 mt-[17px] flex w-[320px] flex-col rounded-2xl border border-gray-200 bg-white px-4 py-6 dark:border-gray-800"
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        src={user.photo || "/profile-default.png"}
                        alt="Profile Image"
                        className="h-10 w-10 rounded-full object-contain"
                        width={40}
                        height={40}
                      />
                      <div>
                        <span className="block text-base font-semibold text-gray-700 dark:text-gray-400">
                          {user.name}
                        </span>
                        <span className="mt-0.5 block text-sm text-gray-500 dark:text-gray-400">
                          {user.email}
                        </span>
                      </div>
                    </div>

                    <hr className="my-5" />

                    <ul className="flex flex-col gap-1 border-b border-gray-200 pb-3 dark:border-gray-800">
                      <li>
                        <DropdownItem
                          onItemClick={() => closeDropdown}
                          tag="a"
                          href="/user/profile"
                          className="group text-theme-sm flex items-center gap-3 rounded-lg px-3 py-3 font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                        >
                          <User
                            className="text-primary dark:group-hover:fill-gray-300"
                            size={24}
                          />
                          <span className="text-base font-medium">
                            Akun Saya
                          </span>
                        </DropdownItem>
                      </li>
                      <li>
                        <DropdownItem
                          onItemClick={() => closeDropdown}
                          tag="a"
                          href="/user/kost-saya"
                          className="group text-theme-sm flex items-center gap-3 rounded-lg px-3 py-3 font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                        >
                          <DoorOpen
                            className="text-primary dark:group-hover:fill-gray-300"
                            size={24}
                          />
                          <span className="text-base font-medium">
                            Kost Saya
                          </span>
                        </DropdownItem>
                      </li>
                      <li>
                        <DropdownItem
                          onItemClick={() => closeDropdown}
                          tag="a"
                          href="/user/pengajuan-sewa"
                          className="group text-theme-sm flex items-center gap-3 rounded-lg px-3 py-3 font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                        >
                          <ClipboardList
                            className="text-primary dark:group-hover:fill-gray-300"
                            size={24}
                          />
                          <span className="text-base font-medium">
                            Pengajuan Sewa
                          </span>
                        </DropdownItem>
                      </li>
                      <li>
                        <DropdownItem
                          onItemClick={() => closeDropdown}
                          tag="a"
                          href="/user/wishlist"
                          className="group text-theme-sm flex items-center gap-3 rounded-lg px-3 py-3 font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                        >
                          <BookHeart
                            className="text-primary dark:group-hover:fill-gray-300"
                            size={24}
                          />
                          <span className="text-base font-medium">
                            Favorite
                          </span>
                        </DropdownItem>
                      </li>
                    </ul>
                    <button
                      onClick={() => logout.mutate()}
                      className="font-semibolld group text-theme-md mt-3 flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                    >
                      <LogOut
                        className="text-primary cursor-pointer dark:group-hover:fill-gray-300"
                        size={24}
                      />
                      Log Out
                    </button>
                  </Dropdown>
                </div>
              </div>
            ) : user && (user.role === "owner" || user.role === "admin") ? (
              <div
                className={`shadow-theme-md w-full items-center justify-between gap-4 px-5 lg:flex lg:justify-end lg:px-0 lg:shadow-none`}
              >
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className={`dropdown-toggle flex items-center gap-2 rounded-full border p-1 pr-4 text-gray-700 dark:text-gray-400 ${
                      showDropdown ? "bg-primary-25" : ""
                    }`}
                  >
                    <div className="h-10 w-10 overflow-hidden rounded-full">
                      <Image
                        width={44}
                        height={44}
                        src={user.photo || "/profile-default.png"}
                        alt="User"
                      />
                    </div>

                    <svg
                      className={`stroke-gray-500 transition-transform duration-200 dark:stroke-gray-400 ${
                        showDropdown ? "rotate-180" : ""
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
                    isOpen={showDropdown}
                    onClose={closeDropdown}
                    className="shadow-theme-lg dark:bg-gray-dark absolute right-0 mt-[17px] flex w-[280px] flex-col rounded-2xl border border-gray-200 bg-white px-4 py-6 dark:border-gray-800"
                  >
                    <div className="mb-4 flex items-center gap-2">
                      <Image
                        src={user.photo || "/profile-default.png"}
                        alt="Profile Image"
                        className="h-10 w-10 rounded-full object-contain"
                        width={40}
                        height={40}
                      />
                      <div>
                        <span className="block text-base font-semibold text-gray-700 dark:text-gray-400">
                          {user.name}
                        </span>
                        <span className="mt-0.5 block text-sm text-gray-500 dark:text-gray-400">
                          {user.email}
                        </span>
                      </div>
                    </div>

                    <hr className="my-3" />

                    {/* Link ke dashboard */}
                    <DropdownItem
                      tag="a"
                      href={
                        user.role === "admin"
                          ? "/dashboard/admin"
                          : "/dashboard/owner"
                      }
                      onItemClick={closeDropdown}
                      className="group flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5"
                    >
                      <Building2 className="text-primary" size={20} />
                      <span className="text-base"> Dashboard</span>
                    </DropdownItem>

                    {/* Logout */}
                    <button
                      onClick={() => logout.mutate()}
                      className="mt-3 flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-3 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5"
                    >
                      <LogOut className="text-primary" size={20} />
                      Logout
                    </button>
                  </Dropdown>
                </div>
              </div>
            ) : (
              <>
                <Button variant="outline" onClick={open} className="w-24">
                  Masuk
                </Button>

                <Link href="/register">
                  <Button variant="default" className="w-24">
                    Daftar
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav />
      {/* <nav className="fixed bottom-0 left-0 z-40 flex w-full items-center justify-around border-t bg-white py-4 shadow sm:hidden">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="hover:text-primary-600 flex flex-col items-center text-sm font-medium text-gray-700"
          >
            <Icon
              size={24}
              className={clsx(pathname === href && "text-primary-600")}
            />
            <span>{label}</span>
          </Link>
        ))}
      </nav> */}

      {/* Chat Popup */}
      {isOpen && <ChatPopup />}
    </>
  );
};

export default Navbar;
