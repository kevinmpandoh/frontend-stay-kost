"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import {
  Users,
  ShieldCheck,
  BarChart2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const benefits = [
  {
    icon: <Users className="text-primary h-6 w-6" />,
    title: "Jangkau Lebih Banyak Penyewa",
  },
  {
    icon: <ShieldCheck className="text-primary h-6 w-6" />,
    title: "Kelola Kost Lebih Mudah & Aman",
  },
  {
    icon: <BarChart2 className="text-primary h-6 w-6" />,
    title: "Pantau Tagihan & Riwayat Sewa",
  },
];

const screenshots = [
  "/images/screenshot/dashboard-overview.png",
  "/images/screenshot/list-kost.png",
  "/images/screenshot/list-penyewa.png",
  "/images/screenshot/tagihan-kost.png",
];

const JoinAsOwnerSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1 },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  // Auto-play setiap 3 detik
  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 6000);
    return () => clearInterval(interval);
  }, [instanceRef]);

  return (
    <section className="bg-white px-4 py-12 md:px-16 lg:px-36">
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
        {/* LEFT */}
        <div>
          <h2 className="mb-4 text-3xl font-bold">
            Punya Kost? Gabung dan Pasarkan Sekarang!
          </h2>
          <p className="mb-4 text-lg text-gray-600">
            Gabung bersama StayKost dan nikmati kemudahan dalam memasarkan
            properti kost Anda secara online. Dapatkan akses ke ribuan calon
            penyewa, kelola kost dengan fitur digital, dan tingkatkan pendapatan
            Anda tanpa ribet.
          </p>

          <ul className="mb-6 space-y-3">
            {benefits.map((item, i) => (
              <li key={i} className="flex items-center">
                <div className="mr-3">{item.icon}</div>
                <span className="font-medium text-gray-700">{item.title}</span>
              </li>
            ))}
          </ul>
          <Button size={"lg"} asChild>
            <Link href="/register">Daftarkan Kost Sekarang</Link>
          </Button>
        </div>

        {/* RIGHT */}
        <div className="relative w-full">
          {/* Slider */}
          <div
            ref={sliderRef}
            className="keen-slider w-full overflow-hidden rounded-xl shadow-lg"
          >
            {screenshots.map((src, i) => (
              <div key={i} className="keen-slider__slide w-full">
                <Image
                  src={src}
                  alt={`Screenshot ${i + 1}`}
                  width={600}
                  height={400}
                  className="rounded-xl object-cover"
                />
              </div>
            ))}
          </div>

          {/* Panah Navigasi */}
          <div className="absolute top-1/2 z-10 hidden w-full -translate-y-1/2 justify-between px-4 md:flex">
            <button
              onClick={() => instanceRef.current?.prev()}
              className="rounded-full bg-white p-2 shadow hover:bg-gray-100"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <button
              onClick={() => instanceRef.current?.next()}
              className="rounded-full bg-white p-2 shadow hover:bg-gray-100"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          {/* Bullet Indicators */}
          <div className="mt-4 flex justify-center space-x-2">
            {screenshots.map((_, i) => (
              <button
                key={i}
                onClick={() => instanceRef.current?.moveToIdx(i)}
                className={`h-2 w-2 rounded-full ${
                  currentSlide === i ? "bg-primary" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinAsOwnerSection;
