import { SectionTitle } from "./SectionTitle";
import { FACILITY_ICONS } from "@/constants/facilities";

interface KostFacilitiesProps {
  roomFacilities: string[];
  sharedFacilities: string[];
}

export function KostFacilities({
  roomFacilities,
  sharedFacilities,
}: KostFacilitiesProps) {
  const renderFacilities = (list: string[]) => (
    <div className="my-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
      {list.map((key, index) => {
        const facility = FACILITY_ICONS[key];
        const Icon = facility?.icon;
        const label = facility?.label || key;
        return (
          <div
            key={index}
            className="text-md flex items-center gap-2 font-semibold text-slate-600"
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className=" ">
      <div className="">
        <SectionTitle title="Fasilitas Kamar" />

        {renderFacilities(roomFacilities)}
      </div>

      <div>
        <SectionTitle title="Fasilitas Bersama" />
        {renderFacilities(sharedFacilities)}
      </div>
    </div>
  );
}
