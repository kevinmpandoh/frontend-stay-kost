import {
  LayoutDashboard,
  Home,
  Settings,
  Users,
  BarChart2,
  LucideIcon,
} from "lucide-react";

export type SidebarMenuItem = {
  name: string;
  icon: LucideIcon;
  path: string;
};

export const sidebarMenu: Record<"admin" | "owner", SidebarMenuItem[]> = {
  admin: [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin/dashboard",
    },
    {
      name: "Users",
      icon: Users,
      path: "/admin/users",
    },
    {
      name: "Reports",
      icon: BarChart2,
      path: "/admin/reports",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/admin/settings",
    },
  ],
  owner: [
    {
      name: "Dashboard",
      icon: Home,
      path: "/owner/dashboard",
    },
    {
      name: "Business",
      icon: BarChart2,
      path: "/owner/business",
    },
    {
      name: "Profile",
      icon: Users,
      path: "/owner/profile",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/owner/settings",
    },
  ],
};
