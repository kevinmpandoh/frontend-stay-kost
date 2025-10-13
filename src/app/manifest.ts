// app/manifest.ts

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Stay Kost - Aplikasi Penyewaan Kost",
    short_name: "Stay Kost",
    description: "Stay Kost - Cari & Kelola Kost Lebih Mudah",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
