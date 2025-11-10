import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan | Stay Kost",
  description:
    "Baca syarat dan ketentuan penggunaan layanan Stay Kost untuk penyewa dan pemilik kost.",
};

export default function TermsAndConditionsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        Syarat dan Ketentuan Stay Kost
      </h1>
      <p className="mb-4 text-gray-600">
        Terakhir diperbarui: <strong>8 November 2025</strong>
      </p>

      <section className="space-y-6 leading-relaxed text-gray-700">
        <p>
          Dengan menggunakan layanan Stay Kost, Anda menyetujui untuk terikat
          dengan syarat dan ketentuan berikut. Jika Anda tidak setuju, harap
          tidak menggunakan layanan kami.
        </p>

        <h2 className="text-xl font-semibold">1. Penggunaan Layanan</h2>
        <p>
          Pengguna wajib memberikan informasi yang benar, lengkap, dan terbaru
          saat melakukan pendaftaran atau pengajuan sewa kost.
        </p>

        <h2 className="text-xl font-semibold">2. Hak dan Kewajiban Penyewa</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Penyewa wajib mematuhi peraturan kost yang ditetapkan pemilik.
          </li>
          <li>
            Penyewa dilarang menggunakan kost untuk kegiatan ilegal atau yang
            melanggar norma sosial.
          </li>
          <li>
            Penyewa bertanggung jawab atas kerusakan fasilitas yang diakibatkan
            oleh kelalaian pribadi.
          </li>
        </ul>

        <h2 className="text-xl font-semibold">
          3. Hak dan Kewajiban Pemilik Kost
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Pemilik wajib menyediakan informasi kost yang akurat dan sesuai
            dengan kondisi sebenarnya.
          </li>
          <li>
            Pemilik berhak menolak penyewa yang melanggar peraturan atau
            menunjukkan perilaku tidak pantas.
          </li>
        </ul>

        <h2 className="text-xl font-semibold">
          4. Pembayaran dan Pengembalian
        </h2>
        <p>
          Semua transaksi pembayaran dilakukan melalui sistem resmi Stay Kost.
          Pengembalian dana hanya berlaku sesuai kebijakan yang berlaku pada
          setiap kost.
        </p>

        <h2 className="text-xl font-semibold">5. Pembatasan Tanggung Jawab</h2>
        <p>
          Stay Kost tidak bertanggung jawab atas perselisihan antara pemilik dan
          penyewa di luar sistem, namun kami berupaya memediasi sesuai
          kebijakan.
        </p>

        <h2 className="text-xl font-semibold">6. Perubahan Ketentuan</h2>
        <p>
          Stay Kost berhak mengubah syarat dan ketentuan ini kapan saja. Versi
          terbaru akan selalu tersedia di halaman ini.
        </p>
      </section>
    </main>
  );
}
