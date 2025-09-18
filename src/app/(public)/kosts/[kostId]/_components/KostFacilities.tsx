import { SectionTitle } from "./SectionTitle";
import { FACILITY_ICONS, DEFAULT_FACILITY_ICON } from "@/constants/facilities";

interface KostFacilitiesProps {
  roomFacilities: string[];
  sharedFacilities: string[];
}

export function KostFacilities({
  roomFacilities,
  sharedFacilities,
}: KostFacilitiesProps) {
  const renderFacilities = (list: string[]) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-4">
      {list.map((key, index) => {
        const facility = FACILITY_ICONS[key];
        const Icon = facility?.icon || DEFAULT_FACILITY_ICON;
        const label = facility?.label || key;
        return (
          <div
            key={index}
            className="flex items-center gap-2 text-md font-semibold text-slate-600"
          >
            <Icon className="w-5 h-5 text-primary" />
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
