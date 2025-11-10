import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kebijakan Privasi | Stay Kost",
  description:
    "Pelajari bagaimana Stay Kost mengumpulkan, menggunakan, dan melindungi data pribadi pengguna.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        Kebijakan Privasi Stay Kost
      </h1>
      <p className="mb-4 text-gray-600">
        Terakhir diperbarui: <strong>8 November 2025</strong>
      </p>

      <section className="space-y-6 leading-relaxed text-gray-700">
        <p>
          Stay Kost menghargai privasi Anda. Dokumen ini menjelaskan bagaimana
          kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda
          ketika menggunakan layanan kami.
        </p>

        <h2 className="text-xl font-semibold">
          1. Informasi yang Kami Kumpulkan
        </h2>
        <p>
          Kami dapat mengumpulkan informasi pribadi seperti nama, alamat email,
          nomor telepon, serta data lokasi kost yang Anda daftarkan atau sewa.
        </p>

        <h2 className="text-xl font-semibold">2. Penggunaan Informasi</h2>
        <p>
          Informasi yang dikumpulkan digunakan untuk memproses penyewaan kost,
          memberikan layanan pelanggan, serta meningkatkan kualitas platform
          kami.
        </p>

        <h2 className="text-xl font-semibold">3. Keamanan Data</h2>
        <p>
          Kami menggunakan langkah-langkah keamanan teknis dan administratif
          untuk melindungi data pengguna dari akses tidak sah atau
          penyalahgunaan.
        </p>

        <h2 className="text-xl font-semibold">4. Berbagi Data</h2>
        <p>
          Stay Kost tidak akan membagikan data pribadi Anda kepada pihak ketiga
          tanpa izin, kecuali diwajibkan oleh hukum atau untuk kepentingan
          layanan (seperti mitra pembayaran).
        </p>

        <h2 className="text-xl font-semibold">5. Hak Anda</h2>
        <p>
          Anda berhak untuk meminta akses, pembaruan, atau penghapusan data
          pribadi Anda dengan menghubungi kami melalui halaman bantuan.
        </p>

        <h2 className="text-xl font-semibold">6. Perubahan Kebijakan</h2>
        <p>
          Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu.
          Setiap perubahan akan diumumkan di halaman ini.
        </p>
      </section>
    </main>
  );
}
