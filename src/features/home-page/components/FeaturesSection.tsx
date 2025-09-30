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
    icon: <Search className="w-6 h-6 text-white" />,
    title: "Cari Kost dengan Mudah",
    desc: "Filter kost berdasarkan lokasi, harga, dan fasilitas.",
  },
  {
    icon: <MessageCircle className="w-6 h-6 text-white" />,
    title: "Chat dengan Pemilik",
    desc: "Tanya langsung ke pemilik sebelum booking.",
  },
  {
    icon: <Sparkles className="w-6 h-6 text-white" />,
    title: "Rekomendasi Pintar",
    desc: "Kost direkomendasikan berdasarkan preferensimu.",
  },
  {
    icon: <CreditCard className="w-6 h-6 text-white" />,
    title: "Bayar Online",
    desc: "Booking dan pembayaran bisa langsung dari aplikasi.",
  },
  {
    icon: <Star className="w-6 h-6 text-white" />,
    title: "Ulasan Penyewa",
    desc: "Lihat review dari penyewa sebelum kamu sewa.",
  },
  {
    icon: <Home className="w-6 h-6 text-white" />,
    title: "Lihat Kamar & Fasilitas",
    desc: "Semua informasi kost ditampilkan lengkap dan jujur.",
  },
];
const FeaturesSection = () => {
  return (
    <section className=" bg-blue-50 mx-auto px-4 md:px-16 lg:px-36 py-16 rounded-lg">
      <div className="mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Kenapa Pakai Aplikasi Kami?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-xl shadow hover:shadow-md transition"
            >
              <div className="bg-primary w-10 h-10 flex items-center justify-center rounded-full mb-3">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
