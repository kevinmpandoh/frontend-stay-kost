import Link from "next/link";

const CTASection = () => {
  return (
    <section className="bg-primary/90 text-white h-90 flex items-center py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Temukan & Kelola Kost Lebih Mudah Bersama Kostku!
        </h2>
        <p className="text-lg mb-6">
          Baik kamu penyewa atau pemilik, kami hadir untuk memudahkan segalanya.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="/kosts"
            className="bg-white cursor-pointer text-primary font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Mulai Cari Kost
          </Link>
          <Link
            href="/auth/owner/register"
            className="border-2 cursor-pointer border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/90 hover:text-primary transition"
          >
            Daftarkan Kost Anda
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
