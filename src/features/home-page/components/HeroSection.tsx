import Image from "next/image";

import React, { useState } from "react";

interface HeroSectionProps {
  onSearch: (keyword: string) => void;
}

const HeroSection = ({ onSearch }: HeroSectionProps) => {
  const [search, setSearch] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(search);
  };
  return (
    <section className="bg-primary-100 mx-auto flex flex-col-reverse items-center justify-between px-4 py-16 text-slate-600 md:flex-row md:px-12 xl:px-36">
      {/* Left Side */}
      <div className="mt-10 w-full md:w-1/3">
        <h1 className="mb-4 text-center text-3xl leading-snug font-bold drop-shadow-2xl md:text-left md:text-5xl md:leading-[3.5rem]">
          Temukan <span className="text-primary font-bold">Kost Impianmu</span>{" "}
          dengan mudah dan cepat
        </h1>
        <p className="mb-6 text-center text-base font-semibold md:text-left md:text-lg">
          Cari kost berdasarkan lokasi, harga, dan fasilitas yang kamu inginkan.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 rounded-lg bg-white p-2 sm:flex-row"
        >
          <label
            htmlFor="default-search"
            className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Search
          </label>
          <div className="relative w-full">
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
              <svg
                className="h-4 w-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              id="default-search"
              className="focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              placeholder="Cari kost di mana?"
              required
            />
            <button
              type="submit"
              className="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 absolute end-2.5 bottom-2.5 rounded-lg px-4 py-2 text-sm font-medium text-white focus:ring-4 focus:outline-none"
            >
              Cari
            </button>
          </div>
        </form>
      </div>

      {/* Right Side */}
      <div className="flex w-full justify-center md:w-[28rem]">
        <Image
          src="/apartment-rent.svg"
          alt="Illustration"
          width={400}
          height={400}
          className="h-auto w-72 md:w-full"
        />
      </div>
    </section>
  );
};

export default HeroSection;
