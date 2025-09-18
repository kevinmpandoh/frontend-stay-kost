"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { SectionTitle } from "./SectionTitle";
import { DEFAULT_FACILITY_ICON, FACILITY_ICONS } from "@/constants/facilities";
import Link from "next/link";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useAuthStore } from "@/stores/auth.store";

type KostRoomVariant = {
  id: string;
  name: string;
  photos: string[];
  price: number;
  remaining: number;
  size: string;
  facilities: string[];
};

type Props = {
  variants: KostRoomVariant[];
  handleBookingClick: (tanggalMasuk: string) => void;
};

export default function KostRoomVariantCarousel({
  variants,
  handleBookingClick,
}: Props) {
  const { user } = useAuthStore();
  return (
    <div className="space-y-6">
      <SectionTitle title="Tipe Kamar Lainnya" />

      <ScrollArea>
        <div className="flex space-x-4 pb-4">
          {variants.map((variant) => (
            <div
              key={variant.id}
              className="w-60 flex-shrink-0 overflow-hidden rounded-xl border bg-white shadow-sm"
            >
              <div className="relative h-40 w-full">
                <Image
                  src={variant.photos[0]}
                  alt={variant.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-1 p-4">
                {variant.remaining === 0 ? (
                  <p className="text-error-600 text-sm font-medium">
                    Kamar penuh
                  </p>
                ) : (
                  <p className="text-warning-600 text-sm font-medium">
                    Sisa {variant.remaining} kamar
                  </p>
                )}

                <h3 className="mb-2 font-semibold">{variant.name}</h3>
                {/* <p className="text-sm text-muted-foreground">
                  {variant.facilities.join(" · ")}
                </p> */}

                <div className="mb-2 flex flex-wrap space-x-2.5 text-sm text-gray-600">
                  {variant.facilities.map((key, index) => {
                    const facility = FACILITY_ICONS[key];
                    const Icon = facility?.icon || DEFAULT_FACILITY_ICON;

                    return (
                      <div key={index} className="mb-1 flex items-center gap-1">
                        <Icon className="h-4 w-4" />
                      </div>
                    );
                  })}
                </div>

                <p className="text-primary mb-2 font-semibold">
                  Rp{variant.price.toLocaleString("id-ID")}/bulan
                </p>

                <div className="mt-2 flex w-full gap-2">
                  <Button
                    variant="outline"
                    size={"sm"}
                    className="text-sm"
                    asChild
                  >
                    <Link href={variant.id}>Lihat Detail</Link>
                  </Button>
                  {user?.role === "tenant" && variant.remaining === 0 && (
                    <Button
                      type="button"
                      className="text-sm"
                      size={"sm"}
                      onClick={() => {
                        handleBookingClick(
                          format(new Date(), "yyyy-MM-dd", { locale: id }),
                        );
                      }}
                    >
                      Ajukan sewa
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
