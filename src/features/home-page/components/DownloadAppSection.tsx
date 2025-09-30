import Image from "next/image";
import Link from "next/link";

const DownloadAppSection = () => {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:grid-cols-2">
        {/* Gambar HP / Ilustrasi */}
        <div className="flex justify-center md:justify-start">
          <Image
            src="/images/screenshot/dashboard-overview.png" // Ganti dengan screenshot atau ilustrasi app kamu
            alt="Aplikasi Kostku"
            width={400}
            height={600}
            className="w-full max-w-xs"
          />
        </div>

        {/* Konten */}
        <div>
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Unduh Aplikasi STAY KOST Sekarang
          </h2>
          <p className="mb-6 text-gray-600">
            Dapatkan kemudahan mencari, menyewa, dan mengelola kost langsung
            dari smartphone kamu. Fitur lengkap dalam genggaman!
          </p>

          <div className="flex gap-4">
            {/* Tombol Google Play */}
            <Link
              href="#"
              // className="bg-black text-white rounded-lg px-4 py-3 flex items-center gap-3 shadow hover:bg-gray-800 transition"
            >
              <Image
                src="/logos/google-play.png"
                alt="Google Play"
                width={200}
                height={200}
                className="h-auto w-48"
              />
            </Link>

            {/* Tombol App Store */}
            <Link
              href="#"
              // className="bg-black text-white rounded-lg px-4 py-3 flex items-center gap-3 shadow hover:bg-gray-800 transition"
            >
              <Image
                src="/logos/app-store.svg"
                alt="App Store"
                width={200}
                height={100}
                className="h-auto w-48"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadAppSection;
