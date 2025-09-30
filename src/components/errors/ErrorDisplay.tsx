// components/errors/ErrorDisplay.tsx
import { FC } from "react";

type ErrorDisplayProps = {
  status: number;
  message?: string;
};

const ErrorDisplay: FC<ErrorDisplayProps> = ({ status, message }) => {
  let title = "Terjadi Kesalahan";
  let description = message || "Silakan coba beberapa saat lagi.";

  switch (status) {
    case 404:
      title = "404 - Tidak Ditemukan";
      description = message || "Halaman atau data tidak ditemukan.";
      break;
    case 403:
      title = "403 - Tidak Diizinkan";
      description = message || "Anda tidak memiliki akses ke resource ini.";
      break;
    case 401:
      title = "401 - Belum Login";
      description = message || "Silakan login terlebih dahulu.";
      break;
    case 500:
      title = "500 - Kesalahan Server";
      description = message || "Terjadi kesalahan di server.";
      break;
    // tambahkan case lain jika dibutuhkan
    default:
      break;
  }

  return (
    <div className="flex flex-col items-center justify-center text-center mt-20 px-4">
      <h2 className="text-3xl font-bold text-red-600 mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default ErrorDisplay;
