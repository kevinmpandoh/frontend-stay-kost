"use client";

import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Ayu P.",
    rating: 5,
    comment: "Aplikasi ini sangat membantu! Aku bisa cari kost sesuai budget.",
  },
  {
    name: "Rizky A.",
    rating: 4,
    comment: "Fitur chat sangat berguna. Pemiliknya responsif!",
  },
  {
    name: "Debby T.",
    rating: 5,
    comment: "Rekomendasinya bener-bener sesuai preferensiku. Mantap!",
  },
  {
    name: "Michael K.",
    rating: 5,
    comment: "Bayar kost jadi mudah dan cepat. UI-nya juga bersih banget.",
  },
  {
    name: "Tasya S.",
    rating: 4,
    comment: "Banyak kost dekat kampus yang cocok buat aku.",
  },
  {
    name: "Daniel J.",
    rating: 5,
    comment: "Suka banget fitur wishlist-nya. Gampang bandingin kost!",
  },
];

const chunkArray = (arr: any[], size: number) => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
};

const TestimonialSection = () => {
  const [index, setIndex] = useState(0);
  const [chunkSize, setChunkSize] = useState(3); // default desktop
  const [grouped, setGrouped] = useState(chunkArray(testimonials, chunkSize));

  useEffect(() => {
    const updateChunkSize = () => {
      if (window.innerWidth < 640) {
        setChunkSize(1); // mobile
      } else {
        setChunkSize(3); // tablet & desktop
      }
    };

    updateChunkSize();
    window.addEventListener("resize", updateChunkSize);
    return () => window.removeEventListener("resize", updateChunkSize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % grouped.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [grouped.length]);

  useEffect(() => {
    setGrouped(chunkArray(testimonials, chunkSize));
    setIndex(0); // reset ke awal saat ukuran berubah
  }, [chunkSize]);

  return (
    <section className="bg-white py-12 px-4 md:px-16 lg:px-36">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">
          Apa Kata Penyewa?
        </h2>

        <div className="relative min-h-[280px] sm:min-h-[300px] md:min-h-[350px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            >
              {grouped[index].map((t, i) => (
                <div
                  key={i}
                  className="bg-white border p-8 rounded-xl shadow text-left"
                >
                  <div className="flex items-center mb-3">
                    <div className="bg-primary/80 text-white rounded-full w-10 h-10 flex items-center justify-center font-semibold text-sm">
                      {t.name[0]}
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold">{t.name}</p>
                      <div className="flex text-yellow-500">
                        {Array.from({ length: t.rating }).map((_, j) => (
                          <Star key={j} className="w-4 h-4 fill-yellow-500" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">“{t.comment}”</p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {grouped.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2 h-2 rounded-full ${
                i === index ? "bg-primary" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
