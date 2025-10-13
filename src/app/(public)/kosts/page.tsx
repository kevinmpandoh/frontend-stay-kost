// app/(main)/kosts/page.tsx
import KostListHeader from "@/features/kost/kost-list/KostListHeader";
import KostFilterTags from "@/features/kost/kost-list/KostFilterTags";
import KostFilterModal from "@/features/kost/kost-list/KostFilterModal";
import KostList from "@/features/kost/kost-list/KostList";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar Kost Murah & Nyaman di Seluruh Indonesia | Stay Kost",
  description:
    "Temukan kost putra, putri, dan campur di seluruh Indonesia. Dapatkan informasi lengkap tentang harga, fasilitas, dan lokasi dengan mudah melalui Stay Kost.",
  keywords: [
    "kost murah",
    "sewa kost",
    "kost online",
    "kost putra putri",
    "kost di Jakarta",
    "kost di Surabaya",
    "kost di Bandung",
    "kost di Manado",
    "kost di Tataaran Patar",
    "kost di Minahasa",
  ],
  alternates: {
    canonical: "https://www.staykost.my.id/kosts",
  },
  openGraph: {
    title: "Daftar Kost di Indonesia | Stay Kost",
    description:
      "Temukan berbagai kost dengan fasilitas lengkap dan harga terjangkau di seluruh Indonesia.",
    url: "https://www.staykost.my.id/kosts",
    siteName: "Stay Kost",
    images: [
      {
        url: "https://www.staykost.my.id/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Daftar Kost - Stay Kost",
      },
    ],
    type: "website",
  },
};

export default function KostListPage() {
  return (
    <div className="mx-auto my-10 max-w-6xl p-4">
      <Suspense>
        <KostListHeader />
        <KostFilterTags />
        <KostFilterModal />
        <KostList />
      </Suspense>
    </div>
  );
}
