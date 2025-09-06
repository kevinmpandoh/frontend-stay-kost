"use client";

import dynamic from "next/dynamic";

const LocationByMap = dynamic(() => import("./LocationByMap"), { ssr: false });

export default function LocationStep() {
  return (
    <>
      <div className="flex h-[350px] w-full flex-col rounded-lg text-gray-500">
        {/* Replace this with Leaflet map */}
        <LocationByMap />
      </div>
    </>
  );
}
