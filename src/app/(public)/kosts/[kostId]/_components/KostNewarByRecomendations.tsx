import KostCard from "@/components/common/CardListKost";
import { SectionTitle } from "./SectionTitle";

export function NearbyKostRecommendations({ kosts }: { kosts: any[] }) {
  if (kosts.length === 0) return null;

  console.log(kosts, "KOST");

  return (
    <section className="mt-10 space-y-4">
      <SectionTitle title="Kost di Sekitar" />
      <div className="overflow-x-auto">
        <div className="flex w-max gap-4 pr-4">
          {kosts.map((kost) => (
            <KostCard
              key={kost.id}
              id={kost.id}
              title={kost.name}
              location={kost.address}
              type={kost.type}
              price={kost.price}
              images={kost.photo}
              facilities={kost.facilities}
              availableRooms={kost.rooms}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
