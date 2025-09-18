import { Search, Heart, MessageCircle, Home } from "lucide-react";

const steps = [
  {
    icon: <Search className="w-8 h-8 text-orange-500" />,
    title: "Temukan Kost",
    description:
      "Jelajahi kost sesuai lokasi, harga, dan fasilitas yang kamu inginkan.",
  },
  {
    icon: <Heart className="w-8 h-8 text-orange-500" />,
    title: "Simpan Favorit",
    description:
      "Simpan kost favoritmu agar mudah dibandingkan dan dilihat kembali.",
  },
  {
    icon: <MessageCircle className="w-8 h-8 text-orange-500" />,
    title: "Chat Pemilik",
    description:
      "Tanyakan langsung ke pemilik sebelum kamu memutuskan untuk sewa.",
  },
  {
    icon: <Home className="w-8 h-8 text-orange-500" />,
    title: "Sewa & Check-in",
    description:
      "Lakukan pembayaran dengan aman dan siap untuk tinggal di kost pilihanmu.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-10">
          Cara Kerja Aplikasi
        </h2>
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          {steps.map((step, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-all"
            >
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
