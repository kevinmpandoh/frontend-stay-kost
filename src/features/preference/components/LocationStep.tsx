"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Landmark, MapPin } from "lucide-react";
// import LocationByMap from "./LocationByMap";
import LocationByAddress from "./LocationByAddress";

const LocationByMap = dynamic(() => import("./LocationByMap"), { ssr: false });

export default function LocationStep() {
  const [useMap, setUseMap] = useState(true);
  return (
    <>
      <div className="flex gap-2 justify-center ">
        <button
          onClick={() => setUseMap(true)}
          className={`border w-full text-md font-semibold rounded-xl p-4 flex flex-col items-center hover:bg-blue-50  ${
            useMap
              ? "bg-blue-50 text-blue-600 border-blue-500"
              : "text-gray-500 border-gray-200"
          }`}
        >
          <MapPin className="mr-2 h-6 w-6" /> Via Peta
        </button>
        <button
          // variant={!useMap ? "default" : "outline"}
          className={`border w-full rounded-xl text-md p-4 flex flex-col items-center hover:bg-blue-50  ${
            !useMap
              ? "bg-blue-50 text-blue-600 border-blue-500"
              : "text-gray-500 border-gray-200"
          }`}
          onClick={() => setUseMap(false)}
        >
          <Landmark className="mr-2 h-5 w-5" /> Via Alamat
        </button>
      </div>
      {!useMap ? (
        <div className="space-y-3 h-64 w-full">
          <LocationByAddress />
        </div>
      ) : (
        <div className="w-full h-[350px] flex-col  flex  text-gray-500 rounded-lg">
          {/* Replace this with Leaflet map */}
          <LocationByMap />
        </div>
      )}
    </>
  );
}
