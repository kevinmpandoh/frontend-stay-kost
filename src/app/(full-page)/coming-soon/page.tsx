"use client";

import React from "react";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { AppLogo } from "@/components/common/AppLogo";

export default function ComingSoonPage() {
  return (
    <main className="via-primary-900 flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-6 text-white">
      <div className="max-w-3xl space-y-6 text-center">
        <div className="flex justify-center">
          <AppLogo variant={"light"} />
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
          Aplikasi Penyewaan Kost
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-300">
          Terima kasih telah mengunjungi aplikasi kami. Saat ini kami sedang
          menyiapkan versi terbaik untuk Anda. Nantikan kehadirannya di Google
          Play Store!
        </p>

        <div className="mt-8">
          <span className="mb-3 block text-slate-400">
            Ikuti kami untuk update terbaru:
          </span>
          <div className="flex justify-center gap-5 text-slate-300">
            <a
              href="#"
              className="hover:text-primary-400"
              aria-label="Facebook"
            >
              <Facebook />
            </a>
            <a
              href="#"
              className="hover:text-primary-400"
              aria-label="Instagram"
            >
              <Instagram />
            </a>
            <a href="#" className="hover:text-primary-400" aria-label="Twitter">
              <Twitter />
            </a>
            <a
              href="#"
              className="hover:text-primary-400"
              aria-label="LinkedIn"
            >
              <Linkedin />
            </a>
          </div>
        </div>

        <footer className="mt-10 text-sm text-slate-400">
          © {new Date().getFullYear()} Aplikasi Kost. Semua hak dilindungi.
        </footer>
      </div>
    </main>
  );
}
