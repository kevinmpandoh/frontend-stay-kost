// app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import Providers from "./provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Stay Kost - Sewa Kost Murah & Nyaman di Seluruh Indonesia",
    template: "%s | Stay Kost - Aplikasi Penyewaan Kost",
  },
  description:
    "Temukan kost murah, kost putri, kost campur di seluruh Indonesia dengan mudah dan cepat. Dapatkan info lengkap fasilitas, lokasi, dan harga.",
  icons: {
    icon: "/logo/logo.svg",
  },
  keywords: [
    "stay kost",
    "kost stay",
    "kost",
    "sewa kost",
    "kost murah",
    "kost online",
    "kost dekat kampus",
    "kost nyaman",
  ],
  authors: [{ name: "Kevin Pandoh" }],
  metadataBase: new URL("https://www.staykost.my.id"),
  openGraph: {
    title: "StayKost | Aplikasi Penyewaan Kost Online ",
    description:
      "Cari dan temukan kost dengan mudah, cepat, dan sesuai kebutuhanmu.",
    url: "https://www.staykost.my.id",
    siteName: "Stay Kost",
    images: [
      {
        url: "https://www.staykost.my.id/og-image.jpg", // bikin gambar promosi kostmu
        width: 1200,
        height: 630,
        alt: "Stay Kost - Aplikasi Penyewaan Kost",
      },
      {
        url: "https://www.staykost.my.id/logo/logo.svg",
        width: 512,
        height: 512,
        alt: "Stay Kost Logo",
      },
    ],
    locale: "id_ID",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Aplikasi Penyewaan Kost Online | Stay Kost",
    description: "Cari kost murah & nyaman lewat aplikasi KostKu.",
    images: ["https://www.staykost.my.id/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Stay Kost",
              url: "https://www.staykost.my.id",
              logo: "https://www.staykost.my.id/logo.png", // logo transparan lebih bagus
              sameAs: [
                "https://www.facebook.com/staykost",
                "https://www.instagram.com/staykost",
              ],
            }),
          }}
        />

        {/* Schema WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              url: "https://www.staykost.my.id",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://www.staykost.my.id/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
