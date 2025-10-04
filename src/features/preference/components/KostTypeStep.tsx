import { Bed, Building2, Home } from "lucide-react";
import { usePreferenceStore } from "../preference.store";
import Image from "next/image";

export default function KostTypeStep() {
  const { kostType, setKostType } = usePreferenceStore();

  const handleClick = (value: "putra" | "putri" | "campur") => {
    setKostType(value);
  };

  const options = [
    { label: "Putra", value: "putra", icon: <Home /> },
    { label: "Putri", value: "putri", icon: <Building2 /> },
    { label: "Campur", value: "campur", icon: <Bed /> },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {options.map((item: any) => {
        const isSelected = kostType === item.value;

        return (
          <button
            key={item.value}
            onClick={() => handleClick(item.value)}
            className={`flex flex-col items-center rounded-xl border p-3 transition ${
              isSelected
                ? "border-primary-300 bg-primary-50"
                : "hover:bg-primary-50 bg-white"
            } `}
          >
            {/* {item.icon} */}
            <Image
              width={48}
              height={48}
              src={`/images/${item.value}.png`}
              alt="Jenis Kost"
            />
            <span className="mt-1 text-sm">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
