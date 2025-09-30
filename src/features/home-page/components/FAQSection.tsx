"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { Tabs, TabsList } from "@radix-ui/react-tabs";
import { TabsTrigger } from "@/components/ui/tabs";

const penyewaFaqs = [
  {
    question: "Bagaimana cara menyewa kost?",
    answer:
      'Cari kost sesuai preferensi, klik "Ajukan Sewa", isi data, lalu tunggu persetujuan dari pemilik.',
  },
  {
    question: "Apakah saya bisa menyimpan kost favorit?",
    answer:
      "Bisa. Klik ikon hati di kartu kost untuk menambah ke wishlist kamu.",
  },
  {
    question: "Bagaimana jika saya telat membayar?",
    answer:
      "Akan ada pengingat otomatis. Denda berlaku sesuai ketentuan pemilik kost.",
  },
];

const pemilikFaqs = [
  {
    question: "Bagaimana cara mendaftarkan kost saya?",
    answer:
      "Klik “Daftarkan Kost”, isi detail kost, fasilitas, harga, lalu publish.",
  },
  {
    question: "Apakah saya bisa melihat riwayat sewa penyewa?",
    answer:
      "Ya. Di dashboard tersedia informasi penyewa aktif dan riwayat tagihan mereka.",
  },
  {
    question: "Bagaimana saya menerima pembayaran dari penyewa?",
    answer:
      "Pembayaran dilakukan via sistem, dan dana akan ditransfer otomatis ke rekening Anda setelah penyewa check-in.",
  },
];

const FAQSection = () => {
  const [activeTab, setActiveTab] = useState<"tenant" | "owner">("tenant");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = activeTab === "tenant" ? penyewaFaqs : pemilikFaqs;

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-4 md:grid-cols-2">
        {/* Kiri: Judul + Deskripsi + Ilustrasi */}
        <div>
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Pertanyaan Umum
          </h2>
          <p className="mb-6 text-gray-600">
            Temukan jawaban atas pertanyaan yang sering diajukan oleh pengguna
            kami. Baik kamu seorang penyewa ataupun pemilik kost, kami bantu
            jelaskan semuanya.
          </p>
          <Image
            src="/faq-illustration.svg" // Ganti dengan ilustrasi yang kamu punya
            alt="FAQ Illustration"
            width={400}
            height={300}
            className="w-full max-w-sm"
          />
        </div>

        {/* Kanan: Tab & FAQ */}
        <div>
          {/* Tab */}
          <div className="bg-white">
            <Tabs
              defaultValue="tenant"
              onValueChange={(v) => {
                setActiveTab(v as "tenant" | "owner");
                setOpenIndex(null);
              }}
            >
              <TabsList className="mb-4 grid h-11 w-full grid-cols-2">
                <TabsTrigger value="tenant">Penyewa Kost</TabsTrigger>
                <TabsTrigger value="owner">Pemilik Kost</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-xl border bg-white shadow-sm transition-all"
              >
                <button
                  className="flex w-full items-center justify-between px-5 py-4 text-left font-medium text-gray-800"
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-5 pb-4 text-sm text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
