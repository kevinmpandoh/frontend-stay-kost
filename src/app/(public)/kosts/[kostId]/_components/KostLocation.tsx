"use client";
import dynamic from "next/dynamic";
import { SectionTitle } from "./SectionTitle";

const KostMap = dynamic(() => import("./KostMap"), {
  ssr: false,
});

interface KostLocationProps {
  kostName: string;
  addressDetail: string;
  latitude: number;
  longitude: number;
}

export function KostLocation({
  kostName,
  addressDetail,
  latitude,
  longitude,
}: KostLocationProps) {
  return (
    <div className="mt-8 space-y-4">
      <SectionTitle title="Alamat Kost" />
      <p className="text-muted-foreground text-sm">{addressDetail}</p>

      <KostMap latitude={latitude} longitude={longitude} kostName={kostName} />
    </div>
  );
}
