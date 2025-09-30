"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface StatusOption {
  key: string;
  label: string;
}

interface StatusFilterProps {
  statusList: StatusOption[];
  paramKey?: string; // default "status"
}

const StatusFilter: React.FC<StatusFilterProps> = ({
  statusList,
  paramKey = "status",
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentValue = searchParams.get(paramKey) || "all";

  const handleFilter = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (key === "all") {
      params.delete(paramKey);
    } else {
      params.set(paramKey, key);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-start sm:items-center">
      <div className="flex w-full flex-wrap items-center gap-2">
        {statusList.map((item) => (
          <button
            key={item.key}
            onClick={() => handleFilter(item.key)}
            className={`rounded border-2 px-2.5 py-1 font-semibold ${
              currentValue === item.key ||
              (item.key === "all" && !searchParams.get(paramKey))
                ? "bg-primary border-primary text-white"
                : "border-gray-300 text-[#5e6c84]"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StatusFilter;
