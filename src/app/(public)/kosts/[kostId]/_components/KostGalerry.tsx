"use client";

import "keen-slider/keen-slider.min.css";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useSwipeable } from "react-swipeable";

interface Photo {
  _id: string;
  url: string;
  kategori: string;
}

interface KostImageGalleryProps {
  photos: Photo[];
}

export function KostImageGallery({ photos }: KostImageGalleryProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openPreview = (index: number) => {
    setActiveIndex(index);
    setIsModalOpen(true);
  };

  const closePreview = () => setIsModalOpen(false);

  const next = () => setActiveIndex((prev) => (prev + 1) % photos.length);
  const prev = () =>
    setActiveIndex((prev) => (prev - 1 + photos.length) % photos.length);

  // ✅ Swipe handler untuk mobile
  const swipeHandlers = useSwipeable({
    onSwipedLeft: next,
    onSwipedRight: prev,
    preventScrollOnSwipe: true,
    trackMouse: false, // kalau mau bisa drag di desktop, ubah ke true
  });

  return (
    <>
      {/* 🖥️ Desktop view */}
      <div className="hidden grid-cols-9 gap-2 overflow-hidden rounded-2xl sm:grid sm:h-[280px] lg:h-[380px]">
        <div className="relative col-span-5" onClick={() => openPreview(0)}>
          <Image
            src={photos[0].url}
            alt="Kost utama"
            fill
            className="rounded object-cover"
            loading="lazy"
          />
        </div>

        <div className="col-span-4 grid grid-cols-2 grid-rows-2 gap-2">
          {photos.slice(1, 5).map((photo, idx) => (
            <div
              key={photo._id}
              className="relative h-full w-full"
              onClick={() => openPreview(idx + 1)}
            >
              <Image
                src={photo.url}
                alt={`Kost ${photo.kategori}`}
                fill
                className="rounded object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 📱 Mobile view: swipeable gallery */}
      <div
        {...swipeHandlers}
        className="relative aspect-[4/3] overflow-hidden rounded-xl sm:hidden"
        onClick={() => openPreview(activeIndex)}
      >
        <div
          className="flex h-full w-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {photos.map((photo) => (
            <div key={photo._id} className="relative h-full min-w-full">
              <Image
                src={photo.url}
                alt={`Kost mobile ${photo.kategori}`}
                fill
                className="object-cover"
                loading="lazy" // ✅ lazy load
                priority={false}
              />
            </div>
          ))}
        </div>

        {/* Indicator (bottom right) */}
        <div className="absolute right-2 bottom-2 rounded bg-black/60 px-2 py-1 text-sm text-white">
          {activeIndex + 1} / {photos.length}
        </div>
      </div>

      {/* 🖼️ Modal preview */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          {/* Gambar preview */}
          <div className="relative h-[80vh] w-full max-w-5xl px-6">
            <Image
              src={photos[activeIndex].url}
              alt={`Preview ${activeIndex + 1}`}
              fill
              className="object-contain"
              loading="lazy"
            />
            <div className="absolute right-6 bottom-4 rounded bg-black/60 px-3 py-1 text-sm text-white">
              {activeIndex + 1} / {photos.length}
            </div>
          </div>

          {/* Tombol close */}
          <button
            onClick={closePreview}
            className="absolute top-6 right-6 cursor-pointer rounded-full bg-white/90 p-2 text-black shadow"
          >
            <X className="h-6 w-6 md:h-8 md:w-8" />
          </button>

          {/* Navigasi manual */}
          <button
            onClick={prev}
            className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white hover:bg-black/70"
          >
            <ChevronLeft className="h-6 w-6 md:h-12 md:w-12" />
          </button>
          <button
            onClick={next}
            className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white hover:bg-black/70"
          >
            <ChevronRight className="h-6 w-6 md:h-12 md:w-12" />
          </button>
        </div>
      )}
    </>
  );
}
