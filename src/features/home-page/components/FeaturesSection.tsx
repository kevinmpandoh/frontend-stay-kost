"use client";

import {
  Search,
  MessageCircle,
  Sparkles,
  CreditCard,
  Star,
  Home,
} from "lucide-react";

const features = [
  {
    icon: <Search className="text-primary-500 h-10 w-10" />,
    title: "Cari Kost dengan Mudah",
    desc: "Temukan kost berdasarkan lokasi, harga, dan fasilitas dengan cepat.",
  },
  {
    icon: <MessageCircle className="text-primary-500 h-10 w-10" />,
    title: "Chat dengan Pemilik",
    desc: "Hubungi pemilik langsung untuk menanyakan detail kost sebelum sewa.",
  },
  {
    icon: <Sparkles className="text-primary-500 h-10 w-10" />,
    title: "Rekomendasi Pintar",
    desc: "Dapatkan rekomendasi kost yang sesuai dengan preferensi kamu.",
  },
  {
    icon: <CreditCard className="text-primary-500 h-10 w-10" />,
    title: "Bayar Online",
    desc: "Nikmati kemudahan booking dan pembayaran langsung dari aplikasi.",
  },
  {
    icon: <Star className="text-primary-500 h-10 w-10" />,
    title: "Ulasan Penyewa",
    desc: "Lihat pengalaman penyewa lain sebelum kamu memutuskan.",
  },
  {
    icon: <Home className="text-primary-500 h-10 w-10" />,
    title: "Lihat Kamar & Fasilitas",
    desc: "Semua informasi kost ditampilkan lengkap dan transparan.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <span className="rounded-full bg-yellow-500 px-2 py-1.5 text-sm font-medium tracking-wide text-white uppercase">
          Fitur Unggulan Kami
        </span>
        <h2 className="mt-2 text-4xl font-bold text-gray-900 md:text-4xl">
          Temukan Kemudahan Mencari Kost
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-gray-600">
          Kami membuat proses mencari, memilih, dan menyewa kost menjadi lebih
          cepat, nyaman, dan menyenangkan.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="bg-primary-50 mb-4 flex h-14 w-14 items-center justify-center rounded-full">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
