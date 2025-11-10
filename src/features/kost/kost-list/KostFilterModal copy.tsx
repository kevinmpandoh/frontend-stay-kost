"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import SortFilter from "./SortFilter";
import PriceFilter from "./PriceFilter";
import FacilitiesFilter from "./FacilitiesFilter";
import KostTypeFilter from "./KostTypeFilter";
import RulesFilter from "./RulesFilter";
import RatingFilter from "./RatingFilter";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useKostFilterStore } from "../store/kostFilter.store";
import { useFacility } from "@/features/facility/useFacility";
import { Facility } from "@/features/facility/facility.type";

export default function KostFilterModal() {
  const { openFilter, activeKey, closeModal } = useKostFilterStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { facilities } = useFacility();

  const kostFacilities = facilities?.data?.filter(
    (f: Facility) => f.category === "kost",
  );
  const roomFacilities = facilities?.data?.filter(
    (f: Facility) => f.category === "room",
  );

  // local state
  const [sortValue, setSortValue] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedKostFacilities, setSelectedKostFacilities] = useState<
    string[]
  >([]);
  const [selectedRoomFacilities, setSelectedRoomFacilities] = useState<
    string[]
  >([]);

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedRules, setSelectedRules] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number | null>(null);

  useEffect(() => {
    if (!openFilter) return;

    setSortValue(searchParams.get("sort") || "");
    setMinPrice(searchParams.get("minPrice") || "");
    setMaxPrice(searchParams.get("maxPrice") || "");

    const kostFacilitiesParam = searchParams.get("kostFacilities");
    setSelectedKostFacilities(
      kostFacilitiesParam ? kostFacilitiesParam.split(",") : [],
    );

    const roomFacilitiesParam = searchParams.get("roomFacilities");
    setSelectedRoomFacilities(
      roomFacilitiesParam ? roomFacilitiesParam.split(",") : [],
    );

    const typesParam = searchParams.get("kostType");
    setSelectedTypes(typesParam ? typesParam.split(",") : []);

    const rulesParam = searchParams.get("rules");
    setSelectedRules(rulesParam ? rulesParam.split(",") : []);

    const ratingParam = searchParams.get("rating");
    setMinRating(ratingParam ? parseFloat(ratingParam) : null);
  }, [openFilter, searchParams]);

  const handleToggleKostFacility = (facility: string) => {
    setSelectedKostFacilities((prev) =>
      prev.includes(facility)
        ? prev.filter((f) => f !== facility)
        : [...prev, facility],
    );
  };

  const handleToggleRoomFacility = (facility: string) => {
    setSelectedRoomFacilities((prev) =>
      prev.includes(facility)
        ? prev.filter((f) => f !== facility)
        : [...prev, facility],
    );
  };

  // Handler
  const handleToggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const handleToggleRule = (rule: string) => {
    setSelectedRules((prev) =>
      prev.includes(rule) ? prev.filter((r) => r !== rule) : [...prev, rule],
    );
  };

  const handleChangeRating = (rating: number | null) => {
    setMinRating(rating);
  };

  const filterConfig = {
    sort: {
      title: "Urutkan Berdasarkan",
      content: <SortFilter value={sortValue} onChange={setSortValue} />,
    },
    price: {
      title: "Harga Kost",
      content: (
        <PriceFilter
          min={minPrice}
          max={maxPrice}
          onChange={(key, value) => {
            if (key === "min") setMinPrice(value);
            else setMaxPrice(value);
          }}
        />
      ),
    },
    facilities: {
      title: "Fasilitas",
      content: (
        <FacilitiesFilter
          kostFacilities={kostFacilities}
          roomFacilities={roomFacilities}
          selectedKost={selectedKostFacilities}
          selectedRoom={selectedRoomFacilities}
          onToggleKost={setSelectedKostFacilities}
          onToggleRoom={setSelectedRoomFacilities}
        />
      ),
    },

    type: {
      title: "Jenis Kost",
      content: (
        <KostTypeFilter selected={selectedTypes} onToggle={handleToggleType} />
      ),
    },

    rules: {
      title: "Peraturan Kost",
      content: (
        <RulesFilter selected={selectedRules} onToggle={handleToggleRule} />
      ),
    },
    rating: {
      title: "Rating Kost",
      content: (
        <RatingFilter selected={minRating} onChange={handleChangeRating} />
      ),
    },
  };

  const handleApply = () => {
    const query = new URLSearchParams();

    if (sortValue) query.set("sort", sortValue);
    if (minPrice) query.set("minPrice", minPrice);
    if (maxPrice) query.set("maxPrice", maxPrice);

    if (selectedKostFacilities.length > 0)
      query.set("kostFacilities", selectedKostFacilities.join(","));
    if (selectedRoomFacilities.length > 0)
      query.set("roomFacilities", selectedRoomFacilities.join(","));
    if (selectedTypes.length > 0)
      query.set("kostType", selectedTypes.join(","));
    if (selectedRules.length > 0) query.set("rules", selectedRules.join(","));
    if (minRating !== null) query.set("rating", minRating.toString());

    const queryString = query.toString();
    router.push(`/kosts?${queryString}`);
    closeModal();
  };

  return (
    <Dialog open={openFilter} onOpenChange={closeModal}>
      <DialogContent className="max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            {(activeKey && filterConfig[activeKey]?.title) || "Filter Kost"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {activeKey && filterConfig[activeKey]?.content}

          <Button className="mt-4 w-full" onClick={handleApply}>
            Terapkan Filter
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
