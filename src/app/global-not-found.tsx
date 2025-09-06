// Import global styles and fonts
import "../styles/globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <div className="flex flex-col items-center justify-center h-screen w-full">
          <h1 className="text-3xl font-bold">404 - Halaman Tidak Ditemukan</h1>
          <p className="mt-2 text-gray-600">Coba periksa kembali URL kamu.</p>
        </div>
      </body>
    </html>
  );
}
