"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

// Lazy load chart (no SSR)
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type PendapatanPerBulan = {
  _id: { tahun: number; bulan: number };
  total: number;
};

const monthLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

export default function Chart({ data }: { data: PendapatanPerBulan[] }) {
  // mapping data pendapatan ke bulan 1–12
  const seriesData = new Array(12).fill(0);

  data.forEach((item) => {
    const bulan = item._id.bulan; // ambil dari _id.bulan
    if (bulan >= 1 && bulan <= 12) {
      seriesData[bulan - 1] = item.total;
    }
  });

  const options: ApexOptions = {
    legend: { show: false },
    colors: ["#00a991"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "line",
      toolbar: { show: false },
    },
    stroke: { curve: "smooth", width: [2, 2] },
    fill: { type: "gradient", gradient: { opacityFrom: 0.55, opacityTo: 0 } },
    markers: {
      size: 0,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: { size: 6 },
    },
    grid: {
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    dataLabels: { enabled: false },
    tooltip: {
      enabled: true,
      y: {
        formatter: (value: number) => `Rp ${value.toLocaleString("id-ID")}`,
      },
      x: {
        formatter: (val: number, opts: any) => monthLabels[opts.dataPointIndex],
      },
    },
    xaxis: {
      type: "category",
      categories: monthLabels,
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { fontSize: "12px", colors: ["#6B7280"] },
        formatter: (value: number) => `Rp ${value.toLocaleString("id-ID")}`,
      },
    },
  };

  const series = [
    {
      name: "Pendapatan",
      data: seriesData,
    },
  ];

  const total = seriesData.reduce((acc, cur) => acc + cur, 0);

  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white px-5 pt-5 pb-5 sm:px-6 sm:pt-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mb-6 flex flex-col gap-5 sm:flex-row sm:justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Total Pendapatan
          </h3>
          <p className="text-theme-sm mt-1 text-gray-500 dark:text-gray-400">
            Rp {total.toLocaleString("id-ID")}
          </p>
        </div>
      </div>

      <div className="custom-scrollbar max-w-full overflow-x-auto">
        <div className="min-w-[1000px] xl:min-w-full">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={310}
          />
        </div>
      </div>
    </div>
  );
}
