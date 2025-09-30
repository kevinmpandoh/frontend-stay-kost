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
    template: "%s | Stay Kost - Aplikasi Penyewaan Kost",
    default: "Stay Kost",
  },
  description: "Stay Kost - Cari & Kelola Kost Lebih Mudah",
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
    title: "Aplikasi Penyewaan Kost Online | StayKost",
    description:
      "Cari dan temukan kost dengan mudah, cepat, dan sesuai kebutuhanmu.",
    url: "https://www.staykost.my.id",
    siteName: "StayKost",
    images: [
      {
        url: "https://www.staykost.my.id/og-image.jpg", // bikin gambar promosi kostmu
        width: 1200,
        height: 630,
        alt: "Stay Kost - Aplikasi Penyewaan Kost",
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
