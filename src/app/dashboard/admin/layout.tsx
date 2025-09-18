"use client";

import ProtectedRoute from "@/components/HOC/ProtectedRoute";
import AppHeader from "@/components/layout/AppHeader";
import Sidebar from "@/components/layout/DashboardSidebar";
import { navItemsAdmin } from "@/constants/navItemsAdmin";
import { useSidebarStore } from "@/stores/sidebar.store";
// import AppHeader from "@/layout/AppHeader";
// import Backdrop from "@/layout/Backdrop";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebarStore();

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
      ? "lg:ml-[290px]"
      : "lg:ml-[90px]";

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen xl:flex">
        {/* Sidebar and Backdrop */}
        <Sidebar navItems={navItemsAdmin} title="Menu Owner" />
        {/* <Backdrop /> */}
        {/* Main Content Area */}
        <div
          className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
        >
          {/* Header */}
          <AppHeader />
          {/* Page Content */}
          <div className="mx-auto w-full max-w-[1244px] bg-slate-50 p-4 md:p-8">
            {children}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
