import Link from "next/link";

const CTASection = () => {
  return (
    <section className="bg-primary-600 flex h-90 items-center py-16 text-white">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          Temukan & Kelola Kost Lebih Mudah Bersama Kostku!
        </h2>
        <p className="mb-6 text-lg">
          Baik kamu penyewa atau pemilik, kami hadir untuk memudahkan segalanya.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/kosts"
            className="text-primary cursor-pointer rounded-lg bg-white px-6 py-3 font-semibold transition hover:bg-gray-100"
          >
            Mulai Cari Kost
          </Link>

          <Link
            href="/register/"
            className="cursor-pointer rounded-lg border-2 border-white px-6 py-3 font-semibold text-white transition"
          >
            Daftarkan Kost Anda
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
