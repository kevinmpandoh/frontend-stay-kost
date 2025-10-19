"use client";

import { useState } from "react";
import { ChevronDown, Users, Building2 } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

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
  {
    question: "Bisakah saya membatalkan sewa?",
    answer:
      "Ya, tapi pastikan untuk membaca kebijakan pembatalan yang berlaku pada kost tersebut.",
  },
  {
    question: "Apakah ada biaya tambahan?",
    answer:
      "Biaya tambahan tergantung pada kebijakan pemilik kost. Pastikan untuk menanyakannya sebelum menyewa.",
  },
];

const pemilikFaqs = [
  {
    question: "Bagaimana cara mendaftarkan kost saya?",
    answer:
      "Buat akun pemilik, lalu klik 'Daftarkan Kost' dan isi detail kost Anda.",
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
  {
    question: "Bagaimana jika penyewa telat membayar?",
    answer:
      "Sistem akan mengirimkan pengingat otomatis kepada penyewa. Anda juga dapat mengatur denda keterlambatan sesuai kebijakan Anda.",
  },
  {
    question: "Apakah saya bisa mengelola beberapa kost sekaligus?",
    answer:
      "Tentu. Anda dapat menambahkan dan mengelola beberapa properti kost dari satu akun pemilik.",
  },
];

const FAQSection = () => {
  const [activeRole, setActiveRole] = useState<"tenant" | "owner">("tenant");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = activeRole === "tenant" ? penyewaFaqs : pemilikFaqs;

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-4 md:grid-cols-2">
        {/* Kiri: ilustrasi & deskripsi */}
        <div className="flex flex-col items-center space-y-4 md:items-start">
          <h2 className="text-3xl font-bold text-gray-900">Pertanyaan Umum</h2>
          <p className="max-w-md text-gray-600">
            Temukan jawaban atas pertanyaan yang sering diajukan oleh pengguna
            kami. Pilih peranmu di bawah untuk melihat pertanyaan yang relevan.
          </p>
          <Image
            src="/faq-illustration.svg"
            alt="FAQ Illustration"
            width={300}
            height={300}
            className="mt-6 w-[300px] md:w-[400px]"
          />
        </div>

        {/* Kanan: FAQ */}
        <div className="rounded-2xl bg-white p-6 shadow-md">
          {/* Toggle kategori */}
          <div className="mb-8 flex justify-center">
            <div className="flex w-full max-w-md">
              <button
                onClick={() => {
                  setActiveRole("tenant");
                  setOpenIndex(null);
                }}
                className={cn(
                  "flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all",
                  activeRole === "tenant"
                    ? "bg-[#00a991] text-white shadow"
                    : "text-gray-700 hover:text-[#00a991]",
                )}
              >
                <Users className="h-4 w-4" />
                Penyewa
              </button>
              <button
                onClick={() => {
                  setActiveRole("owner");
                  setOpenIndex(null);
                }}
                className={cn(
                  "flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all",
                  activeRole === "owner"
                    ? "bg-[#f5b800] text-white shadow"
                    : "text-gray-700 hover:text-[#f5b800]",
                )}
              >
                <Building2 className="h-4 w-4" />
                Pemilik
              </button>
            </div>
          </div>

          {/* Accordion FAQ */}
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="flex w-full items-center justify-between px-5 py-4 text-left font-medium text-gray-800 transition hover:bg-gray-50"
                  >
                    {faq.question}
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 transform text-gray-500 transition-transform duration-300",
                        isOpen ? "rotate-180" : "rotate-0",
                      )}
                    />
                  </button>

                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0",
                    )}
                  >
                    <div className="px-5 pb-4 text-sm text-gray-600">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
