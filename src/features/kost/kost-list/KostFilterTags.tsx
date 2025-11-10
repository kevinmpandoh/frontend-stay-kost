"use client";

import { Button } from "@/components/ui/button";
import {
  SortAsc,
  Tags,
  BadgePercent,
  Building2,
  Star,
  XCircle,
} from "lucide-react";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { useKostFilterStore } from "../store/kostFilter.store";

const filterItems: {
  key: "sort" | "price" | "facilities" | "type" | "rating";
  label: string;
  icon: React.ElementType;
}[] = [
  { key: "sort", label: "Urutkan", icon: SortAsc },
  { key: "price", label: "Harga", icon: BadgePercent },
  { key: "facilities", label: "Fasilitas", icon: Tags },
  { key: "type", label: "Jenis Kost", icon: Building2 },
  // { key: "rules", label: "Aturan Kost", icon: Gavel },
  { key: "rating", label: "Rating", icon: Star },
];

export default function KostFilterTags() {
  const openModal = useKostFilterStore((state) => state.openModal);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const kostFacilities = searchParams.get("kostFacilities")?.split(",") || [];
  const roomFacilities = searchParams.get("roomFacilities")?.split(",") || [];
  const facilities = [...kostFacilities, ...roomFacilities]; // gabung keduanya
  const type = searchParams.get("kostType")?.split(",").filter(Boolean) || [];
  // const rules = searchParams.get("rules")?.split(",").filter(Boolean) || [];

  const activeFilters = {
    sort: !!searchParams.get("sort"),
    price: !!searchParams.get("minPrice") || !!searchParams.get("maxPrice"),
    facilities: facilities.length,
    type: type.length,
    // rules: rules.length,
    rating: !!searchParams.get("rating"),
  };

  const handleReset = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    [
      "sort",
      "minPrice",
      "maxPrice",
      "kostFacilities",
      "roomFacilities",
      "kostType",
      "rules",
      "rating",
    ].forEach((key) => newParams.delete(key));
    router.replace(`${pathname}?${newParams.toString()}`);
  };

  const isAnyFilterActive = Object.values(activeFilters).some(Boolean);

  const getBadgeCount = (key: string) => {
    switch (key) {
      case "facilities":
        return facilities.length;
      case "type":
        return type.length;
      // case "rules":
      //   return rules.length;
      default:
        return 0;
    }
  };

  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {filterItems.map(({ key, label, icon: Icon }) => {
        const isActive = !!activeFilters[key];
        const badgeCount = getBadgeCount(key);

        return (
          <Button
            key={key}
            variant={isActive ? "outline" : "outline"}
            size={"lg"}
            className={`text-md relative flex items-center gap-1 ${
              isActive ? "text-primary-600" : "text-slate-600"
            } `}
            onClick={() => openModal(key as any)}
          >
            <Icon
              className={`h-4 w-4 ${
                isActive ? "text-primary-500" : "text-slate-600"
              } `}
            />
            {label}
            {badgeCount > 0 && (
              <Badge
                variant="default"
                className="bg-primary-500 absolute -top-1 -right-2 px-1 py-0 text-xs text-white"
              >
                {badgeCount}
              </Badge>
            )}
          </Button>
        );
      })}
      {isAnyFilterActive && (
        <Button
          variant="ghost"
          size="lg"
          onClick={handleReset}
          className="text-muted-foreground hover:text-red-600"
        >
          <XCircle className="mr-1 h-4 w-4" />
          Reset Filter
        </Button>
      )}
    </div>
  );
}

// // components/kost/KostFilterTags.tsx
// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   SortAsc,
//   Tags,
//   BadgePercent,
//   Building2,
//   Gavel,
//   Star,
//   XCircle,
// } from "lucide-react";
// import { useKostFilterStore } from "@/stores/kostFilter.store";
// import { useSearchParams, useRouter, usePathname } from "next/navigation";
// import { Badge } from "@/components/ui/badge";

// const filterItems: {
//   key: "sort" | "price" | "facilities" | "type" | "rules" | "rating";
//   label: string;
//   icon: React.ElementType;
// }[] = [
//   { key: "sort", label: "Urutkan", icon: SortAsc },
//   { key: "price", label: "Harga", icon: BadgePercent },
//   { key: "facilities", label: "Fasilitas", icon: Tags },
//   { key: "type", label: "Jenis Kost", icon: Building2 },
//   { key: "rules", label: "Aturan Kost", icon: Gavel },
//   { key: "rating", label: "Rating", icon: Star },
// ];

// export default function KostFilterTags() {
//   const openModal = useKostFilterStore((state) => state.openModal);
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const pathname = usePathname();
//   const facilities = searchParams.get("facilities")?.split(",") || [];
//   const type = searchParams.get("kostType")?.split(",").filter(Boolean) || [];
//   const rules = searchParams.get("rules")?.split(",").filter(Boolean) || [];
//   const activeFilters = {
//     sort: !!searchParams.get("sort"),
//     price: !!searchParams.get("minPrice") || !!searchParams.get("maxPrice"),
//     facilities: facilities.length,
//     type: type.length,
//     rules: rules.length,
//     rating: !!searchParams.get("rating"),
//   };

//   const handleReset = () => {
//     const newParams = new URLSearchParams(searchParams.toString());
//     [
//       "sort",
//       "minPrice",
//       "maxPrice",
//       "facilities",
//       "kostType",
//       "rules",
//       "rating",
//     ].forEach((key) => newParams.delete(key));
//     router.replace(`${pathname}?${newParams.toString()}`);
//   };

//   const isAnyFilterActive = Object.values(activeFilters).some(Boolean);
//   return (
//     <div className="flex flex-wrap gap-2 mt-5">
//       {filterItems.map(({ key, label, icon: Icon }) => {
//         const isActive = !!activeFilters[key];
//         const badgeCount =
//           key === "facilities"
//             ? facilities.length
//             : key === "type"
//             ? type.length
//             : key === "rules"
//             ? rules.length
//             : 0;

//         return (
//           <Button
//             key={key}
//             variant={isActive ? "active" : "outline"}
//             size={"lg"}
//             className={`text-md flex items-center gap-1 relative ${
//               isActive ? "text-primary" : "text-slate-600"
//             } `}
//             onClick={() => openModal(key as any)}
//           >
//             <Icon
//               className={`h-4 w-4 ${
//                 isActive ? "text-primary" : "text-slate-600"
//               } `}
//             />
//             {label}
//             {badgeCount > 0 && (
//               <Badge
//                 variant="default"
//                 className="absolute -top-1 -right-2 text-xs px-1 py-0 bg-primary text-white"
//               >
//                 {facilities.length}
//               </Badge>
//             )}
//           </Button>
//         );
//       })}
//       {isAnyFilterActive && (
//         <Button
//           variant="ghost"
//           size="lg"
//           onClick={handleReset}
//           className="text-muted-foreground hover:text-red-600"
//         >
//           <XCircle className="w-4 h-4 mr-1" />
//           Reset Filter
//         </Button>
//       )}
//     </div>
//   );
// }
