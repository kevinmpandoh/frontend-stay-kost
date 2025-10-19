"use client";

import Link from "next/link";
import React from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { Bell, X } from "lucide-react";
import { useNotification } from "@/features/notification/hooks/useNotification";
import { getNotificationLink } from "@/utils/getNotificationLink";

function timeAgo(date: string | Date) {
  const seconds = Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / 1000,
  );
  if (seconds < 60) return `${seconds} detik yang lalu`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} menit yang lalu`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} jam yang lalu`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} hari yang lalu`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} bulan yang lalu`;
  const years = Math.floor(months / 12);
  return `${years} tahun yang lalu`;
}

export default function NotificationDropdown({
  isOpen,
  onToggle,
  onClose,
}: {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const {
    notifications,
    isLoading,
    isError,
    markAsRead,
    deleteNotification,
    markAllAsRead,
  } = useNotification();

  const unreadCount = notifications?.filter((n: any) => !n.isRead).length || 0;

  return (
    <div className="relative">
      <button
        className="dropdown-toggle bg-primary-50 relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
        onClick={onToggle}
      >
        <Bell className="text-primary-500" size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 inline-flex h-5 w-5 animate-pulse items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={onClose}
        className="shadow-theme-lg dark:bg-gray-dark absolute -right-[240px] mt-[17px] flex h-[480px] w-[350px] flex-col justify-between rounded-2xl border border-gray-200 bg-white p-3 sm:w-[361px] lg:right-0 dark:border-gray-800"
      >
        <div>
          <div className="mb-3 flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-700">
            <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Notifikasi{" "}
              {notifications?.length > 0 && `(${notifications?.length})`}
            </h5>
            <button
              onClick={() => markAllAsRead()}
              className="text-primary-600 text-sm"
            >
              Tandai semua dibaca
            </button>
          </div>

          {isLoading && <div className="p-4 text-center">Loading...</div>}
          {isError && (
            <div className="p-4 text-center text-red-500">
              Failed to load notifications
            </div>
          )}

          {notifications?.length === 0 && !isLoading && (
            <div className="p-4 text-center text-gray-500">
              Tidak ada notifikasi
            </div>
          )}

          <ul className="custom-scrollbar flex h-[360px] flex-col gap-2 overflow-y-auto">
            {notifications?.map((notif: any) => {
              const link = getNotificationLink(notif);
              return (
                <li key={notif._id}>
                  <DropdownItem
                    onItemClick={onClose}
                    className={`flex gap-3 rounded-lg border-b border-gray-100 p-3 transition-colors duration-200 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5 ${
                      !notif.isRead
                        ? "animate-fadeIn bg-primary-50 dark:bg-primary-900"
                        : "bg-white dark:bg-gray-800"
                    }`}
                  >
                    <span
                      className="block flex-1 cursor-pointer"
                      onClick={() => markAsRead(notif._id)}
                    >
                      {link ? (
                        <Link href={link}>
                          <p className="text-base font-medium text-gray-800 dark:text-white/90">
                            {notif.title || "Notification"}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {notif.message}
                          </p>
                          <p className="text-xs text-gray-400 dark:text-gray-500">
                            {timeAgo(notif.createdAt)}
                          </p>
                        </Link>
                      ) : (
                        <>
                          <p className="text-base font-medium text-gray-800 dark:text-white/90">
                            {notif.title || "Notification"}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {notif.message}
                          </p>
                          <p className="text-xs text-gray-400 dark:text-gray-500">
                            {timeAgo(notif.createdAt)}
                          </p>
                        </>
                      )}
                    </span>

                    <button onClick={() => deleteNotification(notif._id)}>
                      <X className="h-4 w-4 text-gray-400 hover:text-red-500" />
                    </button>
                  </DropdownItem>
                </li>
              );
            })}
          </ul>
        </div>

        {/* <Link
          href="/notifications"
          className="mt-3 block rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          Lihat Semua Notifikasi
        </Link> */}
      </Dropdown>
    </div>
  );
}
