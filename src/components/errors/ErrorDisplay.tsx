"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Lock, ShieldOff, Server, Search } from "lucide-react";
import Link from "next/link";

type ErrorDisplayProps = {
  status: number;
  message?: string;
};

const ErrorDisplay: FC<ErrorDisplayProps> = ({ status, message }) => {
  let title = "Terjadi Kesalahan";
  let description = message || "Silakan coba beberapa saat lagi.";
  let Icon = AlertTriangle;
  let color = "text-red-600";

  switch (status) {
    case 404:
      title = "404 - Halaman Tidak Ditemukan";
      description =
        message || "Halaman atau data yang Anda cari tidak ditemukan.";
      Icon = Search;
      color = "text-gray-500";
      break;
    case 403:
      title = "403 - Tidak Diizinkan";
      description =
        message || "Anda tidak memiliki izin untuk mengakses halaman ini.";
      Icon = Lock;
      color = "text-amber-500";
      break;
    case 401:
      title = "401 - Belum Login";
      description =
        message || "Silakan login terlebih dahulu untuk melanjutkan.";
      Icon = ShieldOff;
      color = "text-blue-500";
      break;
    case 500:
      title = "500 - Kesalahan Server";
      description =
        message ||
        "Terjadi kesalahan di server kami. Kami akan segera memperbaikinya.";
      Icon = Server;
      color = "text-red-600";
      break;
    default:
      break;
  }

  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center"
      >
        <Icon className={`mb-4 h-16 w-16 ${color}`} />
        <h2 className="mb-2 text-3xl font-bold text-gray-800">{title}</h2>
        <p className="mb-6 max-w-md text-gray-500">{description}</p>

        <div className="flex gap-3">
          <Link
            href="/"
            className="bg-primary hover:bg-primary/90 rounded-xl px-5 py-2 font-medium text-white transition"
          >
            Kembali ke Beranda
          </Link>

          <button
            onClick={() => window.location.reload()}
            className="rounded-xl border border-gray-300 px-5 py-2 font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Muat Ulang
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorDisplay;
