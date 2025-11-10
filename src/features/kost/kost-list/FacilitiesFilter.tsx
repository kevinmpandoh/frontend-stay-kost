"use client";

import { FacilityGrid } from "@/features/preference/components/FacilityGrid";
import { Facility } from "@/features/facility/facility.type";

interface Props {
  kostFacilities: Facility[];
  roomFacilities: Facility[];
  selectedKost: string[];
  selectedRoom: string[];
  onToggleKost: (ids: string[]) => void;
  onToggleRoom: (ids: string[]) => void;
}

export default function FacilitiesFilter({
  kostFacilities = [],
  roomFacilities = [],
  selectedKost,
  selectedRoom,
  onToggleKost,
  onToggleRoom,
}: Props) {
  return (
    <div className="space-y-4">
      <FacilityGrid
        title="Fasilitas Kost"
        className="md:grid-cols-3"
        data={kostFacilities}
        selected={selectedKost}
        setSelected={onToggleKost}
        valueKey="name"
      />

      <FacilityGrid
        title="Fasilitas Kamar"
        data={roomFacilities}
        className="md:grid-cols-3"
        selected={selectedRoom}
        setSelected={onToggleRoom}
        valueKey="name"
      />
    </div>
  );
}
