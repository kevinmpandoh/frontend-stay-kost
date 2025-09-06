import { Bed, Building2, Home } from "lucide-react";
import { usePreferenceStore } from "../preference.store";

export default function JenisKostStep() {
  const jenisKost = usePreferenceStore((state) => state.jenisKost);
  const setJenisKost = usePreferenceStore((state) => state.setJenisKost);

  const handleClick = (value: string) => {
    setJenisKost(value);
  };

  const options = [
    { label: "Putra", value: "putra", icon: <Home /> },
    { label: "Putri", value: "putri", icon: <Building2 /> },
    { label: "Campur", value: "campur", icon: <Bed /> },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {options.map((item) => {
        const isSelected = jenisKost === item.value;

        return (
          <button
            key={item.value}
            onClick={() => handleClick(item.value)}
            className={`flex flex-col items-center rounded-xl border p-3 transition ${
              isSelected
                ? "border-blue-300 bg-blue-50"
                : "bg-white hover:bg-blue-50"
            } `}
          >
            {item.icon}
            <span className="mt-1 text-sm">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
