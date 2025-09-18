import { useQuery } from "@tanstack/react-query";
import { facilityService } from "../services/facility.service";

export const useFacilities = () => {
  return useQuery({
    queryKey: ["facilities"],
    queryFn: facilityService.getAll,
  });
};
