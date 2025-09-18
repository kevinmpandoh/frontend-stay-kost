import { Button } from "@/components/ui/button";
import { MapPin, Star } from "lucide-react";
import Image from "next/image";

export function KostCard({ kost }: { kost: any }) {
  return (
    <div className="flex border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition bg-white">
      <div className="relative w-32 h-32 sm:w-40 sm:h-40">
        <Image
          src={kost.thumbnailUrl}
          alt={kost.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col justify-between p-4 w-full">
        <div>
          <h3 className="text-sm font-semibold line-clamp-1">{kost.name}</h3>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
            <MapPin className="w-3 h-3" />
            {kost.city}, {kost.province}
          </p>
          <p className="text-sm font-bold mt-2">Rp{kost.price}/bulan</p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <Button size="sm" variant="outline">
            Lihat Detail
          </Button>
          <div className="text-yellow-500 text-sm flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400" />
            {kost.rating.toFixed(1)}
          </div>
        </div>
      </div>
    </div>
  );
}
