import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";

interface BookingSidebarProps {
  kost: {
    name: string;
    type: string;
    address: string;
    image: string;
    price: number;
  };
}

const BookingSidebar = ({ kost }: BookingSidebarProps) => {
  const total = kost.price;
  return (
    <div className="sticky top-30 rounded-2xl border bg-white p-6 shadow select-none">
      <div className="mb-4 flex space-x-4">
        <Image
          src={kost.image}
          alt="Room interior with a bed, white linens, purple pillows, yellow curtains, and a brown wardrobe"
          className="h-[80px] w-[100px] rounded-md object-cover"
          width={100}
          height={80}
        />
        <div className="flex flex-col justify-center">
          <Badge variant={"outline"} className="capitalize">
            {kost.type}
          </Badge>

          <h3 className="text-md leading-tight font-semibold">{kost.name}</h3>
          <p className="mt-1 flex items-center gap-1 text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-gray-400" />
            {kost.address}
          </p>
        </div>
      </div>

      <hr className="mb-4 border-gray-200" />

      <h4 className="mb-3 font-semibold">Rincian Pembayaran</h4>
      <div className="text-md mb-2 flex justify-between">
        <span>Biaya sewa per bulan</span>
        <span>Rp {kost.price.toLocaleString("id-ID")}</span>
      </div>

      <div className="text-md mb-4 flex justify-between">
        <span>Biaya Layanan</span>
        <span>Rp 2000</span>
      </div>
      <hr className="mb-4 border-gray-200" />
      <div className="flex justify-between text-lg font-semibold">
        <span>Total Pembayaran</span>
        <span>Rp{(kost.price + 2000).toLocaleString("id-ID")}</span>
      </div>
    </div>
  );
};

export default BookingSidebar;
