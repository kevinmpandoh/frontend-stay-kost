"use client";

import ProtectedRoute from "@/components/HOC/ProtectedRoute";
// import { useSidebar } from "@/contexts/SidebarContext";
import AppHeader from "@/components/layout/AppHeader";
import Sidebar from "@/components/layout/DashboardSidebar";
import { navItemsOwner } from "@/constants/navItemsOwner";
import { useModalStore } from "@/stores/modal.store";
import UpgradeSubscriptionModal from "@/features/subscription/components/UpgradeSubscriptionModal";
// import AppHeader from "@/layout/AppHeader";

import { useSidebarStore } from "@/stores/sidebar.store";
// import Backdrop from "@/layout/Backdrop";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebarStore();
  const { upgradeOpen, closeUpgrade } = useModalStore();

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
      ? "lg:ml-[290px]"
      : "lg:ml-[90px]";

  return (
    <ProtectedRoute allowedRoles={["owner"]}>
      <div className="min-h-screen xl:flex">
        {/* Sidebar and Backdrop */}
        <Sidebar navItems={navItemsOwner} title="Menu Owner" />
        {/* <Backdrop /> */}
        {/* Main Content Area */}
        <div
          className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
        >
          {/* Header */}
          <AppHeader />
          {/* Page Content */}
          <main className="mx-auto max-w-[1246px] flex-1 overflow-y-auto p-6 md:p-10">
            {children}
          </main>
        </div>
      </div>
      <UpgradeSubscriptionModal open={upgradeOpen} onClose={closeUpgrade} />
    </ProtectedRoute>
  );
}
