// config/navItemsAdmin.ts
import { NavItem } from "@/components/layout/DashboardSidebar";
import {
  Banknote,
  ClipboardList,
  Home,
  LayoutDashboard,
  Star,
  User,
} from "lucide-react";

export const navItemsAdmin: NavItem[] = [
  {
    icon: <LayoutDashboard />,
    name: "Beranda",
    path: "/dashboard/admin",
  },
  {
    icon: <Home />,
    name: "Kelola Kost",

    subItems: [
      {
        name: "Kost",
        path: "/dashboard/admin/kost",
      },

      { name: "Tagihan", path: "/dashboard/admin/billings" },
      { name: "Pembayaran", path: "/dashboard/admin/payouts" },
    ],
  },
  {
    name: "Langganan Kost",
    icon: <Banknote />,
    path: "/dashboard/admin/subscription",
  },
  {
    name: "Booking",
    icon: <ClipboardList />,
    path: "/dashboard/admin/bookings",
  },
  {
    name: "Rating & Ulasan",
    icon: <Star />,
    path: "/dashboard/admin/reviews",
  },

  {
    name: "Pengguna",
    icon: <User />,
    subItems: [
      { name: "Pemilik Kost", path: "/dashboard/admin/users/owner" },
      { name: "Penyewa Kost", path: "/dashboard/admin/users/tenant" },
    ],
  },
];
