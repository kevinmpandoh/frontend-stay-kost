// config/navItemsOwner.ts
import { NavItem } from "@/components/layout/DashboardSidebar";
import { LayoutDashboard, Home, Banknote, Star, Settings } from "lucide-react";

export const navItemsOwner: NavItem[] = [
  { icon: <LayoutDashboard />, name: "Beranda", path: "/dashboard/owner" },
  {
    icon: <Home />,
    name: "Kelola Kost",
    subItems: [
      { name: "Kost Saya", path: "/dashboard/owner/kost-saya" },
      { name: "Pengajuan Sewa", path: "/dashboard/owner/pengajuan-sewa" },
      { name: "Penyewa Aktif", path: "/dashboard/owner/penyewa" },
      { name: "Tagihan Penyewa", path: "/dashboard/owner/tagihan" },
    ],
  },
  // {
  //   name: "Laporan Keuangan",
  //   icon: <Banknote />,
  //   path: "/dashboard/owner/laporan-keuangan",
  // },
  { name: "Rating & Ulasan", icon: <Star />, path: "/dashboard/owner/reviews" },
];
